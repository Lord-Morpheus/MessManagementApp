import 'package:flutter/material.dart';
import 'package:mess/register_login/forget.dart';
import 'package:mess/register_login/roll.dart';
import 'package:mess/studentpages/studenthomepg.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:tiny_alert/tiny_alert.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

final storage = new FlutterSecureStorage();

class Homepg extends StatefulWidget {
  const Homepg({super.key});

  @override
  State<Homepg> createState() => _HomepgState();
}

class _HomepgState extends State<Homepg> {
  late String roll;
  late String pass;
  bool isLoading = false;

  final TextEditingController textEditingController1 = TextEditingController();
  final TextEditingController textEditingController2 = TextEditingController();

  assign() {
    setState(() {
      roll = textEditingController1.text;
      pass = textEditingController2.text;
    });
  }

  Future<void> sendLoginRequest() async {
    final url = Uri.parse('http://192.168.135.166:3001/api/v1/users/login');
    final headers = {'Content-Type': 'Application/json'};
    final body = jsonEncode({'username': roll, 'password': pass});

    try {
      setState(() {
        isLoading = true;
      });

      final response = await http.post(url, headers: headers, body: body);
      String token = jsonDecode(response.body)['token'];
      token = "Bearer " + token;
      await storage.write(key: 'token', value: token);
      if (response.statusCode == 200) {
        Navigator.of(context)
            .pushReplacement(MaterialPageRoute(builder: (context) {
          return const Studenthomepage();
        }));
      } else {
        TinyAlert.error(
          context,
          title: "Error!",
          message: "Incorrect Credentials, try again!",
        );
        print('Login failed: ${response.body}');
      }
    } catch (e) {
      TinyAlert.error(
        context,
        title: "Error!",
        message: "Incorrect Credentials, try again!",
      );
      print('Network error: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
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
                        'LOGIN',
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      'Login with your credentials',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: textEditingController1,
                      style: Theme.of(context).textTheme.titleMedium,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(
                            vertical: 10, horizontal: 10),
                        labelText: 'Roll Number',
                        hintText: 'Ex: B2XXXX',
                        labelStyle: Theme.of(context).textTheme.titleMedium,
                        border: OutlineInputBorder(
                          borderSide: BorderSide(
                            color: Color.fromRGBO(0, 0, 0, 1),
                          ),
                          borderRadius: BorderRadius.all(Radius.circular(10.0)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: textEditingController2,
                      style: Theme.of(context).textTheme.titleMedium,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(
                            vertical: 10, horizontal: 10),
                        labelText: 'Password',
                        prefixIcon: const Icon(
                          Icons.lock_outline,
                          color: Color.fromARGB(255, 36, 27, 173),
                        ),
                        labelStyle: Theme.of(context).textTheme.titleMedium,
                        border: OutlineInputBorder(
                          borderSide: BorderSide(
                            color: Color.fromRGBO(0, 0, 0, 1),
                          ),
                          borderRadius: BorderRadius.all(Radius.circular(10.0)),
                        ),
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 20),
                    TextButton(
                      onPressed: () {
                        Navigator.of(context).pushReplacement(
                            MaterialPageRoute(builder: (context) {
                          return const Forget();
                        }));
                      },
                      child: Text(
                        'Forgot Password?',
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(15.0)),
                        ),
                        elevation: 20,
                        backgroundColor: const Color.fromARGB(255, 44, 7, 251),
                        minimumSize: const Size(double.infinity, 50),
                      ),
                      onPressed: isLoading
                          ? null
                          : () async {
                              assign();
                              setState(() {
                                isLoading = true;
                              });
                              await sendLoginRequest();
                              setState(() {
                                isLoading = false;
                              });
                            },
                      child: isLoading
                          ? LoadingAnimationWidget.staggeredDotsWave(
                              color: Colors.white,
                              size: 24,
                            )
                          : const Text(
                              'Login',
                              style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white),
                            ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          'Don’t have an account?',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pushReplacement(
                                MaterialPageRoute(builder: (context) {
                              return const Roll();
                            }));
                          },
                          child: Text(
                            'Register',
                            style: Theme.of(context).textTheme.titleSmall,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
