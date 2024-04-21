import 'package:flutter/material.dart';
import 'package:mess/register_login/login.dart';
import 'package:mess/studentpages/dashboard.dart';
import 'package:mess/studentpages/newhome.dart';
import 'package:mess/studentpages/student_feedback.dart';

class Studenthomepage extends StatefulWidget {
  const Studenthomepage({super.key});

  @override
  State<Studenthomepage> createState() => _StudenthomepageState();
}

class _StudenthomepageState extends State<Studenthomepage> {

  int currpage=0;

  final PageController _pageController=PageController();

  List<Widget> pages=[
    const Newhome(),
    FeedbackForm(),
    const Dash(),
  ];

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
      body: PageView(
        controller: _pageController,
        onPageChanged: (index){
          setState(() {
            currpage=index;
          });
        },
        children:pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        iconSize: 27,
        onTap: (index){
          setState(() {
            currpage=index;
          });
          _pageController.animateToPage(index, duration: const Duration(milliseconds: 10), curve: Curves.easeOut);
        },
        selectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
        unselectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
        currentIndex: currpage,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white,
        items:const [
          BottomNavigationBarItem(
            label:"Home",
            icon:Icon(Icons.home_outlined,),
            activeIcon: Icon(Icons.home,)
          ),
          BottomNavigationBarItem(
            label:"Feedback",
            icon:Icon(Icons.sms_outlined,),
            activeIcon: Icon(Icons.sms,),
          ),
          BottomNavigationBarItem(
            label:"Profile",
            icon:Icon(Icons.person_2_outlined,),
            activeIcon: Icon(Icons.person,),
          ),
        ],
      ),
    ); 
  }
}