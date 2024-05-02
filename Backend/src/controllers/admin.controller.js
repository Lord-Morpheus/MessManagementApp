import { adminSignUpSchema } from "../../packages/zod.js";
import asyncHandler from "../utils/asyncHandler.js";
import client from "../../db/index.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { deleteOtp } from "./common.controller.js";
import {
  formData,
  formData2,
  formData4,
  formData5,
  hostelData,
  messData,
  studentsData,
} from "../../prisma/data.js";
import sendEmail from "../utils/email/index.js";
import { messMap } from "../utils/messId.js";
import { FileEmbedder } from "pdf-lib";


// Admin Signup using OTP and Admin Secret
export const signUp = asyncHandler(async (req, res) => {
  const { name, username, email, password, adminSecret, OTP } = req.body;
  const { success } = adminSignUpSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  if (adminSecret !== process.env.ADMIN_SECRET) {
    console.log(adminSecret, process.env.ADMIN_SECRET);
    return res.status(401).json({ message: "Forbidden" });
  }

  try {
    const matched = await client.otp.findFirst({
      where: {
        email,
        key: OTP,
      },
    });

    if (!matched) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    const currentTime = new Date().getTime();
    const otpExpiry = new Date(matched.expiry).getTime();

    await deleteOtp(email);

    if (currentTime - otpExpiry > 15 * 60 * 1000) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const user = await client.admin.create({
      data: {
        name,
        username,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        adminSecret: adminSecret
          ? await bcrypt.hash(adminSecret, 10)
          : undefined,
      },
      select: {
        name: true,
        username: true,
        email: true,
        adminSecret: true,
      },
    });

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, {
      expiresIn: 3600,
    });

    return res
      .status(200)
      .json({ token, message: "Admin registered successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

// Admin Signin
export const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const { success } = z
    .object({
      username: z.string().length(6),
      password: z.string().min(6),
    })
    .safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  try {
    const user = await client.admin.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, {
      expiresIn: 3600,
    });

    return res
      .status(200)
      .json({ token, message: "Admin logged in successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

// Get all students
export const getAllStudents = asyncHandler(async (req, res, next) => {
  try {
    const users = await client.student.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        daysPresent: true,
        hostel: {
          select: {
            name: true,
          },
        },
        messId: true,
      },
    });
    const messes = await client.mess.findMany({
      select: {
        id: true,
        name: true,
        // students: true,
      },
    });

    for (const user of users) {
      // console.log(user.hostel)
      user.mess_off = 31 - user.daysPresent;
      if (!user.hostel) {
        user.hostel = "Not Assigned"
      } else {
        user.hostel = user.hostel.name.toUpperCase();
      }
      if (user.messId && messes.find((mess) => mess.id === user.messId))
        user.mess = messes
          .find((mess) => mess.id === user.messId)
          .name.toUpperCase();
      else user.mess = "Not Assigned";
    }

    req.users = users;

    // console.log(users);

    next(res.status(200).json({ data: users }));
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

// Get a student by id
export const getStudent = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await client.student.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        hostel: true,
        // mess: {
        //     select: {
        //         id: true,
        //         name: true,
        //         location: true,
        //     }
        // }
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(403).json(err);
  }
});

// Filter students by various fields
export const filterStudents = asyncHandler(async (req, res) => {
  const data = req.data;

  return res.status(200).json({ data });
});

// Delete a student from database
export const deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.body;

  try {
    const existinguser = await client.student.findFirst({
      where: {
        id: studentId,
      }
    })

    if (!existinguser) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log('User Found', existinguser);

    await client.messForm.deleteMany({
      where: {
        studentId
      }
    })

    await client.student.delete({
      where: {
        id: studentId
      },
    });

    console.log('deleted');
    return res
      .status(201)
      .json({ user: existinguser, msg: "User deleted successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

// Update a student in database
export const updateStudent = asyncHandler(async (req, res) => {
  const { name, username, studentId, email, hostelId, messId, offDays } = req.body;
  console.log(studentId);
  console.log(req.body)

  // Create an object to hold the data to be updated
  const dataToUpdate = {};

  // Check if each field is not null, and if not, add it to the dataToUpdate object
  if (offDays !== null && offDays !== undefined && offDays !== 0) {
    dataToUpdate.daysPresent = {
      increment: -offDays,
    };
  }

  if (name !== null && name !== undefined) {
    dataToUpdate.name = name;
  }
  if (username !== null && username !== undefined) {
    dataToUpdate.username = username;
  }
  if (email !== null && email !== undefined) {
    dataToUpdate.email = email;
  }
  if (hostelId !== null && hostelId !== undefined && hostelId !== "") {
    dataToUpdate.hostel = {
      connect: {
        id: hostelId
      }
    };
  }
  if (messId !== null && messId !== undefined) {
    dataToUpdate.messId = messId;
  }

  // Check if there are any fields to update
  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ msg: "No valid fields to update" });
  }

  // Update the student details with the non-null fields
  try {
    const user = await client.student.update({
      where: {
        id: studentId,
      },
      data: dataToUpdate,
      select: {
        name: true,
        username: true,
        email: true,
        hostel: true,
      },
    });

    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(201)
      .json({ data: user, msg: "User updated successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const addMess = asyncHandler(async (req, res) => {
  const { mess } = req.body;

  try {
    const messData = await client.mess.create({
      data: {
        name: mess.toLowerCase(),
      },
      select: {
        id: true,
        name: true,
      },
    });

    return res
      .status(200)
      .json({ data: messData, msg: "Mess added successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const seedMess = asyncHandler(async (req, res) => {
  try {
    const messes = await client.mess.createMany({
      data: messData,
    });

    return res.status(200).json(messes);
  }
  catch (err) {
    return res.status(403).json(err);
  }
});

export const seedHostel = asyncHandler(async (req, res) => {
  try {
    const hostels = await client.hostel.createMany({
      data: hostelData,
    });

    return res.status(200).json(hostels);
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const seedData = asyncHandler(async (req, res) => {
  for (const student of studentsData) {
    const { name, username, email, password, hostelId } = student;
    const existingUser = await client.student.findFirst({
      where: {
        username,
      },
    });
    if (existingUser) {
      await client.student.delete({
        where: {
          username,
        },
      });
    }
    await client.student.create({
      data: {
        name,
        username,
        email,
        password,
        hostel: {
          connect: {
            id: hostelId,
          },
        },
        // mess: {
        //     connect: {
        //         id: messId
        //     }
        // }
      },
    });
    console.log(`Student ${name} added`);
  }
  return res.status(200).json({ message: "Data seeded successfully" });
});

export const studentID = asyncHandler(async (req, res) => {
  const users = await client.student.findMany({
    select: {
      id: true,
    },
  });
  console.log(users);
  return res.status(200).json(users);
});

export const addHostel = asyncHandler(async (req, res) => {
  const { hostel, messId } = req.body;

  try {
    const hostelData = await client.hostel.create({
      data: {
        name: hostel.toLowerCase(),
        Mess: {
          connect: {
            id: messId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return res
      .status(200)
      .json({ data: hostelData, msg: "Mess added successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const addVendor = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;

  try {
    const vendor = await client.vendor.create({
      data: {
        name,
        username,
        email,
        phone,
        password: password ? await bcrypt.hash(password, 10) : undefined,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
      },
    });

    return res
      .status(201)
      .json({ data: vendor, msg: "Vendor added successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const getFeedbacks = asyncHandler(async (req, res) => {
  // try {
  const feedbacks = await client.feedback.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      attachmenet: true,
      createdAt: true,
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      mess: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
  console.log(feedbacks)

  return res.status(200).json({ data: feedbacks });
  // } catch (err) {
  //   return res.status(403).json(err);
  // }
});

export const messAllocation = asyncHandler(async (req, res) => {
  // const { startDate, endDate, ratio } = req.body;

  try {
    const ratio = 0.75;
    const messOptions = await client.mess.findMany({
      select: {
        id: true,
        name: true,
        capacity: true,
      },
    });

    const capacities = messOptions.map((mess) => {
      if (!mess.capacity) {
        return 1000;
      } else {
        return mess.capacity * ratio;
      }
    });
    const allocatedForms = [0, 0, 0, 0, 0, 0, 0, 0];

    let messForms = await client.messForm.findMany({
      // where: {
      //     createdAt: {
      //         gte: startDate,
      //         lte: endDate
      //     }
      // },
      select: {
        id: true,
        createdAt: true,
        preferences: true,
        studentId: true,
        alloted: true,
        student: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // console.log('messOPtions', messOptions);
    // console.log('messForms', messForms);

    // for (let i = 0; i < messForms.length; i++) {
    //     // console.log(messForms[i])
    //     console.log(messForms[i].student.name)
    //     // console.log(messForms[i].preferences[0]);
    //     console.log(messForms[i].preferences);

    // }

    // Allocated first come first serve basis store not assigned forms
    for (let i = 0; i < 5; i++) {
      let idx = 0;
      for (const mess of messOptions) {
        // console.log(mess.name)
        // const filteredForms = messForms.filter(form => form.preferences[i] === mess.id);

        // filteredForms.sort((a, b) => {
        //     return new Date(a.createdAt) - new Date(b.createdAt);
        // });

        let fcfsRatio = capacities[idx];
        // idx++;
        // console.log(fcfsRatio);

        for (const form of messForms) {
          if (
            fcfsRatio > 0 &&
            form.preferences[i] === mess.id &&
            !form.alloted
          ) {
            const updatedUser = await client.student.update({
              where: {
                id: form.studentId,
              },
              data: {
                messId: mess.id,
              },
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: true,
                messId: true,
              },
            });
            await client.messForm.update({
              where: {
                id: form.id,
              },
              data: {
                alloted: true,
              },
            });
            // console.log(updatedUser);
            await sendEmail({
              mail: updatedUser.email,
              subject: "Alert!! (this is a 🍽️ Test Message)",
              text: `Hi there! you have been succesfully alloted : ${messMap[updatedUser.messId]}
          
      
          If you have any questions or need assistance, feel free to reach out to our support team.
          
          We can't wait to serve you!
          
          Best regards,
          IIT Mandi Mess Service Team`,
            });

            form.alloted = true;
            fcfsRatio--;
          }
        }

        allocatedForms[idx] += capacities[idx] - fcfsRatio;

        capacities[idx] = fcfsRatio;
        idx++;
        // console.log(mess.name, messForms.length);
      }
    }

    for (const form of messForms) {
      if (!form.alloted) {
        const student = await client.student.findFirst({
          where: {
            id: form.studentId,
          },
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            hostel: true,
            messId: true,
          },
        });
        // console.log(student)
        const user = await client.student.update({
          where: {
            id: form.studentId,
          },
          data: {
            messId: student.hostel.preferredMessId,
          },
        });
        await client.messForm.update({
          where: {
            id: form.id,
          },
          data: {
            alloted: true,
          },
        });
        await sendEmail({
          mail: student.email,
          subject: "Alert!! (this is a 🍽️ Test Message) ",
          text: `Hi there! you have been succesfully alloted : ${messMap[user.messId]}
      
  
      If you have any questions or need assistance, feel free to reach out to our support team.
      
      We can't wait to serve you!
      
      Best regards,
      IIT Mandi Mess Service Team`,
        });
        form.alloted = true;
      }
    }

    // Allocated remaining forms to the mess according to proximity
    console.log(allocatedForms);

    return res.status(201).json({ msg: "Mess allocated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(403).json(err);
  }
});

export const getMess = asyncHandler(async (req, res) => {
  const mess = await client.mess.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  // console.log(mess);
  return res.status(200).json(mess);
});

export const getHostel = asyncHandler(async (req, res) => {
  const hostels = await client.hostel.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  // console.log(hostels);
  return res.status(200).json(hostels);
});

export const seedForms = asyncHandler(async (req, res) => {
  for (const form of formData5) {
    const { studentId, preferences } = form;
    // console.log(studentId, preferences)
    const form1 = await client.messForm.create({
      data: {
        student: {
          connect: {
            id: studentId,
          },
        },
        preferences: preferences,
      },
    });
    console.log(`Form for ${studentId} added`);
    console.log(form1);
  }
  return res.status(200).json({ message: "Forms seeded successfully" });
});

export const getFormData = asyncHandler(async (req, res) => {
  try {
    const forms = await client.messForm.findMany({
      select: {
        id: true,
        preferences: true,
        studentId: true,
        alloted: true,
        student: {
          select: {
            id: true,
            name: true,
            username: true,
            messId: true,
          },
        },
      },
    });

    forms.map((form) => {
      form.allotedMess = form.student.messId;
    });

    console.log(forms);
    return res.status(200).json(forms);
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const getStudentsCountByMess = asyncHandler(async (req, res, next) => {
  try {
    const messes = await client.mess.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const counts = [];
    for (const mess of messes) {
      const students = await client.student.findMany({
        where: {
          messId: mess.id,
        },
      });
      counts.push({
        name: mess.name.toUpperCase(),
        strength: students.length,
      });
    }

    const chartConfig = {
      type: "bar",
      height: 240,
      width: 420,
      series: [
        {
          name: "Strength",
          data: counts.map((mess) => mess.strength),
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#012169"],
        plotOptions: {
          bar: {
            columnWidth: "60%",
            borderRadius: 2,
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: counts.map(mess => mess.name),
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: false,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };

    res.status(200).json({ data: chartConfig });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const getRevenueOfMess = asyncHandler(async (req, res, next) => {
  try {
    const messes = await client.mess.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const counts = [];
    for (const mess of messes) {
      const students = await client.student.findMany({
        where: {
          messId: mess.id,
        },
      });
      counts.push({
        name: mess.name.toUpperCase(),
        strength: students.length,
      });
    }

    const chartConfig = {
      type: "bar",
      height: 240,
      width: 420,
      series: [
        {
          name: "Revenue(in INR) ",
          data: counts.map((mess) => mess.strength * 125 * 30),
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#012169"],
        plotOptions: {
          bar: {
            columnWidth: "60%",
            borderRadius: 2,
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: counts.map(mess => mess.name),
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: false,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };

    res.status(200).json({ data: chartConfig });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const getFeedbackCountByMess = async (req, res) => {
  try {
    const messes = await client.mess.findMany({
      select: {
        id: true,
        name: true,
        Feedback: {
          select: {
            id: true,
          }
        }
      },
    });

    const feedbackCounts = messes.map((mess) => ({
      name: mess.name.toUpperCase(),
      count: mess.Feedback.length,
    }));


    const chartConfig3 = {
      type: "bar",
      height: 240,
      width: 420,
      series: [
        {
          name: "Feedback Count",
          data: feedbackCounts.map((mess) => mess.count),
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#012169"],
        plotOptions: {
          bar: {
            columnWidth: "60%",
            borderRadius: 2,
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: feedbackCounts.map(mess => mess.name),
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: false,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };

    res.status(200).json({ data: chartConfig3 });
  } catch (error) {
    console.error('Error fetching feedback counts:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendNotification = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    console.log(startDate, endDate);
    await client.notification.create({
      data: {
        isOpened: true,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    const students = await client.student.findMany({});

    // for (const student of students) {
    //   const email = student.email;
    //   const subject = "🍽️ Mess Forms Are Out";
    //   const message = `Hi ${student.name}!\n\nThe mess form is now open. Please fill the form before the deadline. Deadline to fill the form is ${endDate}.\n\nIIT Mandi Mess Service Team`;

    //   await sendEmail({ mail: email, subject, text: message });

    //   console.log(`Notification email sent to ${email}`);
    // }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });

    return res.status(200).json({ message: "Notifications sent successfully" });
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const Profile = asyncHandler(async (req, res) => {
  try {
    const user = await client.admin.findFirst({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(403).json(err);
  }
});

export const messOff = asyncHandler(async (req, res) => {
  const { studentId, days } = req.body;
  try {
    const student = await client.student.update({
      where: {
        id: studentId,
      },
      data: {
        daysPresent: {
          increment: -days,
        },
      },
    });

    return res.status(200).json({ data: student });
  } catch (err) {
    return res.status(403).json(err);
  }
});
