import 'package:flutter/material.dart';
import 'dart:ui';
import 'package:intl/intl.dart';


class Dash extends StatefulWidget {
  const Dash({super.key});

  @override
  State<Dash> createState() => _DashState();
}

class _DashState extends State<Dash> {
  String name="USER NAME";
  String roll="USER ROLL";
  String mess="USER MESS";
  String hostel="USER HOSTEL";
  @override
  Widget build(BuildContext context) {

    var time=DateTime.now();
    return Scaffold(
      body: Container(
        decoration:const  BoxDecoration(
          image: DecorationImage(
            image:  AssetImage("assets/images/background.png"),
            fit: BoxFit.cover,
            ),
        ),
        padding: const EdgeInsets.only(left:20,right: 20),
        child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children:[
                const SizedBox(height:60),
                const Center(
                  child: Text(
                    'DASHBOARD',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 50),
                const Divider(
                  color: Colors.black,
                  thickness: 2,
                ),
                const SizedBox(height: 20),
                Container(
                  padding: const EdgeInsets.all(15),
                  //height: double.infinity,
                  width:double.infinity,
                  child: Card(
                    elevation: 30,
                    shadowColor: Colors.black,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(40),
                      side: const BorderSide(
                        color: Colors.black,
                        width:0.5,
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
                                const SizedBox(height: 20),
                                Row(
                                  children: [
                                    Text(
                                      "Date: ${DateFormat('dd MMMM yyyy').format(time)}",
                                      style:const TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(width: 30),
                                    Text(
                                      "Time: ${DateFormat('hh:mm a').format(time)}",
                                      style:const TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height:30),
                                Text(
                                  "NAME: $name",
                                  style:const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  "ROLL NO. : $roll",
                                  style:const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  "MESS: $mess",
                                  style:const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  "HOSTEL: $hostel",
                                  style:const TextStyle(
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
    );
  }
}