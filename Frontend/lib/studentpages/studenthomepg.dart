import 'package:flutter/material.dart';
import 'package:mess/register_login/login.dart';
import 'package:mess/studentForm.dart';
import 'package:mess/studentpages/global_vari.dart';
import 'package:mess/studentpages/options.dart';

class Studenthomepage extends StatefulWidget {
  const Studenthomepage({super.key});

  @override
  State<Studenthomepage> createState() => _StudenthomepageState();
}

class _StudenthomepageState extends State<Studenthomepage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            IconButton(
              color: Colors.white,
              icon: const Icon(Icons.density_medium_rounded),
              onPressed: () {
                // Handle icon button action here
              },
            ),
            const SizedBox(width:1),
            const SizedBox(
              height: 40,
              child: VerticalDivider(
                color: Colors.white,
                thickness: 2,
              ),
            ),
            const SizedBox(width: 2),
            const Text('Welcome \n user',
              style: TextStyle(color:Colors.white),
            ),
          ],
        ),
        actions: [
          IconButton(
            color: Colors.white,
            icon: const Icon(Icons.logout_outlined),
            onPressed: () {
              Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
              return const Homepg();
              }));
              // Handle logout action here
            },
          ),
          const Padding(
            padding:EdgeInsets.only(right:20),
            child: Text(
              'LOGOUT',
              style:TextStyle(
                color:Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      body: Container(
        decoration:const  BoxDecoration(
          image: DecorationImage(
            image:  AssetImage("assets/images/background.png"),
            fit: BoxFit.cover,
          ),
        ),
      child:ListView.builder(
        itemCount: options.length,
        itemBuilder: (BuildContext context, int index) {
          final opt=options[index];
          return GestureDetector(
            onTap: (){
              Navigator.push(context,
                          MaterialPageRoute(builder: (context){
                            return StudentForm() ;
                          }));
            },
            child: Maker(
              title:opt['title'] as String,
              image:opt['image'] as String
            ),
          );
        },
        
      ),
      ),
    );
  }
}