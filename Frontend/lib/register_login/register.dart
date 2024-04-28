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
  late List<Map<String, dynamic>> hostelList;

  final TextEditingController textEditingController1 = TextEditingController();
  final TextEditingController textEditingController2 = TextEditingController();
  final TextEditingController textEditingController3 = TextEditingController();
  final TextEditingController textEditingController4 = TextEditingController();

  @override
  void initState() {
    super.initState();
    final jsonArrayString =
        '''[{"id":"981faa72-7c38-4fd4-986f-34882806644b","name":"b13"},{"id":"e54aaa64-9e64-4d80-a11d-8d7e08845424","name":"b14"},{"id":"a7ecb2a1-4d9d-46f1-9862-fd5b512fd81e","name":"b23"},{"id":"172ddf87-1735-4d9d-8df9-daabd51491fb","name":"b15"},{"id":"ef21d395-6189-47f5-90d8-b08a467a78d2","name":"b22"},{"id":"4ee394a9-63f7-4457-bf98-184098735ab1","name":"b21"},{"id":"847802e6-2ab1-4a36-a21a-5a8aa29e41b1","name":"b19"},{"id":"4b5fd327-09fe-4dae-a52c-1bf62f894a24","name":"b20"},{"id":"e0baa884-8110-48f4-973f-fa14970307ff","name":"b8"},{"id":"b65a5eac-5ffa-4ab6-90f5-57f17057e9eb","name":"b9"},{"id":"384cb7a9-77b1-453e-ba00-61a10d1cf7cf","name":"b11"},{"id":"202d03c5-5e9a-451f-b6eb-8cf03ca2c6ee","name":"b17"},{"id":"a16e94e7-a730-4fb0-bc20-6beae0ad140f","name":"b16"},{"id":"38b9a6ad-2fe5-49db-a252-7049763b459e","name":"b10"},{"id":"62ed400c-475f-4dd7-91b8-142b5879b7e2","name":"b12"},{"id":"0ccd7a0d-2a60-4edd-81f5-54781a4eca95","name":"b26"},{"id":"ef659a8b-7e67-4d4a-8d91-e05fd7a2b5ee","name":"b18"},{"id":"bb12d466-8096-4d04-817f-a8d6e6577dd7","name":"b4"},{"id":"de76a019-0e5b-4bdd-92ea-68d1188654ac","name":"b2"},{"id":"9724fd0c-48e7-4954-bf6c-468046403e85","name":"g3"},{"id":"3d8c2100-97ca-4e0d-8622-83b732049545","name":"g2"},{"id":"0b396601-621b-4f3d-bc26-8e4752f0fe29","name":"b6"},{"id":"3e741066-d79b-46a8-a77a-149d59b88381","name":"b5"},{"id":"19acf23e-401e-4ea3-8427-13dcbc43ddcb","name":"b7"},{"id":"42cea84d-3cc2-438e-b5dd-ede58107ed12","name":"g4"},{"id":"40ef9763-3102-4d0d-b8b3-983690791113","name":"b8"},{"id":"83d3ef12-2905-4056-9827-8f1e6356464c","name":"b9"}]''';
    hostelList = List<Map<String, dynamic>>.from(jsonDecode(jsonArrayString));
  }

  assign2() {
    hostel = textEditingController1.text;
    otp = textEditingController2.text;
    pass = textEditingController3.text;
    confirmpass = textEditingController4.text;
    roll2 = widget.roll;
    name2 = widget.name;
    print('roll no is ' + roll2 + ' name is ' + name2);
    // if (pass == confirmpass) {
    //   Navigator.of(context)
    //       .pushReplacement(MaterialPageRoute(builder: (context) {
    //     return const Homepg();
    //   }));
    // } else {
    //   showDialog(
    //       barrierDismissible: true,
    //       context: context,
    //       builder: (context) {
    //         return AlertDialog(
    //           title: Text("passwords are not matching",
    //               style: Theme.of(context).textTheme.titleMedium),
    //           content: Text(
    //             "Fill the Details again",
    //             style: Theme.of(context).textTheme.titleMedium,
    //           ),
    //           actions: [
    //             TextButton(
    //                 onPressed: () {
    //                   Navigator.of(context).pushReplacement(
    //                       MaterialPageRoute(builder: (context) {
    //                     return Registration(roll: roll2, name: name2);
    //                   }));
    //                 },
    //                 child: const Text(
    //                   "OK",
    //                   style: TextStyle(
    //                     color: Colors.blue,
    //                     fontWeight: FontWeight.bold,
    //                   ),
    //                 )),
    //           ],
    //         );
    //       });
    // }
  }

  String? getHostelIdFromName(String hostelName) {
    for (var hostel in hostelList) {
      if (hostel['name'] == hostelName) {
        return hostel['id'];
      }
    }
    return null; // If not found, return null
  }

  Future<void> sendRollNumberEmail() async {
    final url = Uri.parse('http://192.168.135.166:3001/api/v1/users/signup');
    // final url = Uri.parse('http://192.168.135.166:3000/api/test');
    final headers = {'Content-Type': 'Application/json'};
    final hostelId = getHostelIdFromName(hostel.toLowerCase());
    final body = jsonEncode({
      'username': roll2,
      'name': name2,
      'hostel': hostelId,
      'OTP': otp,
      'password': pass,
      'email': roll2.toLowerCase() + '@students.iitmandi.ac.in'
    });

    try {
      final response = await http.post(url, headers: headers, body: body);
      if (response.statusCode == 200) {
        Navigator.of(context)
            .pushReplacement(MaterialPageRoute(builder: (context) {
          return const Homepg();
        }));
      } else {
        print('Login failed: ${response.body}');
      }
    } catch (e) {
      print('Network error: $e');
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
                hintText: 'Ex:B18',
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
                sendRollNumberEmail();
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
