import 'package:flutter/material.dart';
import 'package:mess/register_login/login.dart';
import 'package:mess/studentpages/dashboard.dart';
import 'package:mess/studentpages/newhome.dart';
import 'package:mess/studentpages/student_feedback.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

class Studenthomepage extends StatefulWidget {
  const Studenthomepage({super.key});

  @override
  State<Studenthomepage> createState() => _StudenthomepageState();
}

class _StudenthomepageState extends State<Studenthomepage> {
  var _token;
  void initState() {
    super.initState();
    getToken();
  }

  Future<void> getToken() async {
    String? token = await storage.read(key: 'token');
    setState(() {
      _token = token;
    });
    print(_token);
  }

  void logout() async {
    // Delete token from secure storage
    await storage.delete(key: 'token');

    // Navigate back to the login page
    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) {
      return Homepg();
    }));
  }

  int currpage = 0;

  final PageController _pageController = PageController();

  List<Widget> pages = [
    const Newhome(),
    FeedbackForm(),
    const Dash(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.black,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.asset(
              'assets/images/main_logo.png',
              width: 95, // Adjust width as needed
              height: 70, // Adjust height as needed
              // You can specify other properties like fit, alignment, etc. as needed
            ),
          ],
        ),
        actions: [
          Material(
            color: Colors.black,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10)), // Rectangle shape
            child: InkWell(
              splashColor: const Color.fromARGB(255, 58, 53, 53),
              onTap: () {
                logout();
                // Handle logout action here
              },
              child: const Padding(
                padding: EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Icon(
                      Icons.logout_outlined,
                      color: Colors.white,
                    ),
                    SizedBox(width: 8),
                    Text(
                      'LOGOUT',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            width: 10,
          ),
        ],
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            currpage = index;
          });
        },
        children: pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        iconSize: 27,
        onTap: (index) {
          setState(() {
            currpage = index;
          });
          _pageController.animateToPage(index,
              duration: const Duration(milliseconds: 10),
              curve: Curves.easeOut);
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
        items: const [
          BottomNavigationBarItem(
              label: "Home",
              icon: Icon(
                Icons.home_outlined,
              ),
              activeIcon: Icon(
                Icons.home,
              )),
          BottomNavigationBarItem(
            label: "Feedback",
            icon: Icon(
              Icons.sms_outlined,
            ),
            activeIcon: Icon(
              Icons.sms,
            ),
          ),
          BottomNavigationBarItem(
            label: "Profile",
            icon: Icon(
              Icons.person_2_outlined,
            ),
            activeIcon: Icon(
              Icons.person,
            ),
          ),
        ],
      ),
    );
  }
}
