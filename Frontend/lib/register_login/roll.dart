import 'package:flutter/material.dart';
import 'package:mess/register_login/globalip.dart';
import 'package:mess/register_login/register.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:tiny_alert/tiny_alert.dart';

class Roll extends StatefulWidget {
  const Roll({super.key});
  @override
  State<Roll> createState() => _RollState();
}

class _RollState extends State<Roll> {
  late String name;
  late String roll;
  late String email;
  bool isLoading = false;

  final TextEditingController textEditingController1 = TextEditingController();
  final TextEditingController textEditingController2 = TextEditingController();

  assign3() {
    name = textEditingController1.text;
    roll = textEditingController2.text;
    email = "$roll@students.iitmandi.ac.in";
  }

  Future<void> sendRollNumberEmail() async {
    setState(() {
      isLoading = true;
    });
    final url = Uri.parse('https://mess-api.vercel.app/api/v1/users/send/otp');
    // final url = Uri.parse('http://192.168.135.166:3000/api/test');
    final headers = {'Content-Type': 'Application/json'};
    final body = jsonEncode(
        {'email': email.toLowerCase(), 'username': roll.toLowerCase()});

    try {
      final response = await http.post(url, headers: headers, body: body);
      if (response.statusCode == 200) {
        Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) {
          return Registration(roll: roll, name: name);
        }));
      } else {
        TinyAlert.error(
          context,
          title: "Error!",
          message: 'User already Exists, please try again!',
        );
        print('Login failed: ${response.body}');
      }
    } catch (e) {
      print('Network error: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

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
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Center(
                  child: Text(
                    'Details for verification',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 30),
                Text(
                  '*Enter Your Name',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                SizedBox(
                  height: 10,
                ),
                TextField(
                  controller: textEditingController1,
                  style: Theme.of(context).textTheme.titleMedium,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(
                        vertical: 10, horizontal: 10),
                    labelText: 'Name',
                    labelStyle: Theme.of(context).textTheme.titleMedium,
                    border: border,
                    enabledBorder: border,
                    focusedBorder: border,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  '*Enter Your Institute Roll no.',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: textEditingController2,
                  style: Theme.of(context).textTheme.titleMedium,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(
                        vertical: 10, horizontal: 10),
                    labelText: 'Roll number',
                    hintText: 'B2xxxx',
                    labelStyle: Theme.of(context).textTheme.titleMedium,
                    border: border,
                    enabledBorder: border,
                    focusedBorder: border,
                  ),
                ),
                const SizedBox(height: 30),
                ElevatedButton(
                  onPressed: isLoading
                      ? null
                      : () async {
                          assign3();
                          await sendRollNumberEmail();
                        },
                  child: isLoading
                      ? LoadingAnimationWidget.staggeredDotsWave(
                          color: Colors.white,
                          size: 24,
                        )
                      : const Text(
                          'Send OTP',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                    elevation: 0,
                    minimumSize: Size(double.infinity, 50),
                    backgroundColor: isLoading
                        ? const Color.fromARGB(255, 44, 7, 251)
                        : const Color.fromARGB(255, 44, 7, 251),
                  ),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
