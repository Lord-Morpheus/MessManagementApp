import 'package:flutter/material.dart';
import 'dart:ui';
import 'package:intl/intl.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

class User {
  final String id;
  final String name;
  final String username;
  final String email;
  final String hostel; // Change this to String
  final String messId;

  User({
    required this.id,
    required this.name,
    required this.username,
    required this.email,
    required this.hostel,
    required this.messId,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['user']['id'],
      name: json['user']['name'],
      username: json['user']['username'],
      email: json['user']['email'],
      hostel: json['user']['hostel'],
      messId: json['user']['messId'],
    );
  }
}

class Hostel {
  final int id;
  final String name;

  Hostel({
    required this.id,
    required this.name,
  });

  factory Hostel.fromJson(Map<String, dynamic> json) {
    return Hostel(
      id: json['id'],
      name: json['name'],
    );
  }
}

class Dash extends StatefulWidget {
  const Dash({super.key});

  @override
  State<Dash> createState() => _DashState();
}

class _DashState extends State<Dash> {
  var _token;
  String name = "USER NAME";
  String roll = "USER ROLL";
  String mess = "USER MESS";
  String hostel = "USER HOSTEL";

  @override
  void initState() {
    super.initState();
    _getTokenAndFetchData();
  }

  Future<void> _getTokenAndFetchData() async {
    await getToken();
    await _fetchUserData();
  }

  Future<void> getToken() async {
    String? token = await storage.read(key: 'token');
    setState(() {
      _token = token;
    });
    print('token before was $_token');
  }

  Future<User> fetchUserData() async {
    final token = _token; // Replace with the actual token value
    print('token is $token');
    final headers = {'Authorization': '$token'};
    final response = await http.get(
        Uri.parse('http://192.168.233.166:3001/api/v1/users/get'),
        headers: headers);
    print(response.body);
    if (response.statusCode == 200) {
      final userData = jsonDecode(response.body);
      return User.fromJson(userData);
    } else {
      throw Exception('Failed to fetch user data');
    }
  }

  Future<void> _fetchUserData() async {
    try {
      final user = await fetchUserData();
      setState(() {
        name = user.name;
        roll = user.username; // Assuming username represents the roll number
        mess = user.messId.toString();
        hostel = user.hostel;
      });
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    var time = DateTime.now();
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
                    'DASHBOARD',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Divider(
                  color: Colors.black,
                  thickness: 2,
                ),
                const SizedBox(height: 10),
                Text(
                  "Date: ${DateFormat('dd MMMM yyyy').format(time)}",
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(15),
                  width: double.infinity,
                  child: Card(
                    elevation: 30,
                    shadowColor: Colors.black,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(40),
                      side: const BorderSide(
                        color: Colors.black,
                        width: 0.5,
                      ),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(
                          sigmaX: 2,
                          sigmaY: 2,
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Center(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const SizedBox(height: 30),
                                Text(
                                  "NAME: $name",
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  "ROLL NO. : $roll",
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  "MESS: $mess",
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  "HOSTEL: $hostel",
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 40),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
