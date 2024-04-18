import 'package:flutter/material.dart';
import 'package:mess/register_login/login.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Registration extends StatefulWidget {
  final String roll;
  final String name;
  const Registration({super.key, required this.roll, required this.name});

  @override
  State<Registration> createState() => _RegistrationState();
}

class _RegistrationState extends State<Registration> {
  late String hostel;
  late String otp;
  late String pass;
  late String confirmpass;
  late String roll2;
  late String name2;

  final TextEditingController textEditingController1 = TextEditingController();
  final TextEditingController textEditingController2 = TextEditingController();
  final TextEditingController textEditingController3 = TextEditingController();
  final TextEditingController textEditingController4 = TextEditingController();

  assign2() {
    hostel = textEditingController1.text;
    otp = textEditingController2.text;
    pass = textEditingController3.text;
    confirmpass = textEditingController4.text;
    roll2 = widget.roll;
    name2 = widget.name;

    if (pass == confirmpass) {
      Navigator.of(context)
          .pushReplacement(MaterialPageRoute(builder: (context) {
        return const Homepg();
      }));
    } else {
      showDialog(
          barrierDismissible: true,
          context: context,
          builder: (context) {
            return AlertDialog(
              title: Text("passwords are not matching",
                  style: Theme.of(context).textTheme.titleMedium),
              content: Text(
                "Fill the Details again",
                style: Theme.of(context).textTheme.titleMedium,
              ),
              actions: [
                TextButton(
                    onPressed: () {
                      Navigator.of(context).pushReplacement(
                          MaterialPageRoute(builder: (context) {
                        return Registration(roll: roll2, name: name2);
                      }));
                    },
                    child: const Text(
                      "OK",
                      style: TextStyle(
                        color: Colors.blue,
                        fontWeight: FontWeight.bold,
                      ),
                    )),
              ],
            );
          });
    }
  }

  // Future<void> sendRollNumberEmail() async {
  //   final url = Uri.parse('http://192.168.135.166:3000/api/test');
  //   final headers = {'Content-Type': 'Application/json'};
  //   final body = jsonEncode({
  //     'username': roll2,
  //     'name': name2,
  //     'hostel': hostel,
  //     'otp': otp,
  //     'password': pass,
  //     'email': roll2.toLowerCase() + '@students.iitmandi.ac.in'
  //   });

  //   try {
  //     final response = await http.post(url, headers: headers, body: body);
  //     if (response.statusCode == 200) {
  //       Navigator.of(context)
  //           .pushReplacement(MaterialPageRoute(builder: (context) {
  //         return const Homepg();
  //       }));
  //     } else {
  //       print('Login failed: ${response.body}');
  //     }
  //   } catch (e) {
  //     print('Network error: $e');
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    const border = OutlineInputBorder(
      borderSide: BorderSide(
        color: Color.fromRGBO(0, 0, 0, 1),
      ),
      borderRadius: BorderRadius.all(Radius.circular(10.0)),
    );

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/background.png"),
            fit: BoxFit.cover,
          ),
        ),
        padding: const EdgeInsets.only(left: 20, right: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 100),
            const Center(
              child: Text(
                'REGISTER',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: textEditingController1,
              style: Theme.of(context).textTheme.titleMedium,
              decoration: InputDecoration(
                contentPadding:
                    const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                labelText: 'Current Hostel',
                hintText: 'Ex:B-18',
                labelStyle: Theme.of(context).textTheme.titleMedium,
                border: border,
                enabledBorder: border,
                focusedBorder: border,
              ),
            ),
            const SizedBox(height: 15),
            TextField(
              controller: textEditingController2,
              style: Theme.of(context).textTheme.titleMedium,
              decoration: InputDecoration(
                contentPadding:
                    const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                labelText: 'OTP',
                labelStyle: Theme.of(context).textTheme.titleMedium,
                border: border,
                enabledBorder: border,
                focusedBorder: border,
              ),
            ),
            const SizedBox(height: 15),
            TextField(
              controller: textEditingController3,
              style: Theme.of(context).textTheme.titleMedium,
              decoration: InputDecoration(
                contentPadding:
                    const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                labelText: 'Enter Password',
                prefixIcon: const Icon(
                  Icons.lock_outline,
                  color: Color.fromARGB(255, 36, 27, 173),
                ),
                labelStyle: Theme.of(context).textTheme.titleMedium,
                border: border,
                enabledBorder: border,
                focusedBorder: border,
              ),
              obscureText: true,
            ),
            const SizedBox(height: 15),
            TextField(
              controller: textEditingController4,
              style: Theme.of(context).textTheme.titleMedium,
              decoration: InputDecoration(
                contentPadding:
                    const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                labelText: 'Confirm Password',
                prefixIcon: const Icon(
                  Icons.lock_outline,
                  color: Color.fromARGB(255, 36, 27, 173),
                ),
                labelStyle: Theme.of(context).textTheme.titleMedium,
                border: border,
                enabledBorder: border,
                focusedBorder: border,
              ),
              obscureText: true,
            ),
            const SizedBox(height: 15),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(15.0)),
                ),
                elevation: 20,
                backgroundColor: const Color.fromARGB(255, 44, 7, 251),
                minimumSize: const Size(double.infinity, 50),
              ),
              onPressed: () {
                // sendRollNumberEmail();
                assign2();
              },
              child: const Text(
                'Register',
                style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  'Already have an account?',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context)
                        .pushReplacement(MaterialPageRoute(builder: (context) {
                      return const Homepg();
                    }));
                  },
                  child: Text(
                    'Login',
                    style: Theme.of(context).textTheme.titleSmall,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
