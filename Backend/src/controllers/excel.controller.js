import excelJS from "exceljs";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";
import csv from "csvtojson"

export const exportUser = asyncHandler(async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
        { header: "Username", key: "id", width: 10 },
        { header: "Name", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Hostel", key: "hostel", width: 10 },
        // { header: "Mess", key: "mess", width: 10 },
        // { header: "Batch", key: "batch", width: 10 },
    ];

    console.log(req.data);

    worksheet.addRows(req.data);

    console.log('Done Add rows');

    const buffer = await workbook.xlsx.writeBuffer();

    // const filePath = 'users.xlsx'; // Specify the file path where you want to save the file
    // fs.writeFileSync(filePath, buffer);

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "users.xlsx"
    );

    return res.status(200).json(buffer);
}
);

export const importUser = asyncHandler(async (req, res) => {
    console.log(req.file.path);
    const jsonArray = await csv().fromFile(req.file.path);
    // console.log(jsonArray);
    // const workbook = new excelJS.Workbook();
    // const data = await workbook.xlsx.readFile(req.file.path);
    // console.log(data);
}
);