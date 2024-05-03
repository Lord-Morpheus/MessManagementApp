import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mess/register_login/login.dart';
import 'package:mess/studentpages/northform.dart';
import 'package:mess/studentpages/southform.dart';
import 'package:mess/studentpages/studenthomepg.dart';

final storage = new FlutterSecureStorage();

class campus extends StatefulWidget {
  @override
  _campusState createState() => _campusState();
}

class _campusState extends State<campus> {
  String? _selectedCampus;

  void logout() async {
    await storage.delete(key: 'token');

    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) {
      return Homepg();
    }));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 80,
        iconTheme: IconThemeData(color: Colors.white),
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
      body: Stack(children: [
        Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/background.png"),
              fit: BoxFit.cover,
            ),
          ),
        ),
        Center(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              //mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const SizedBox(
                  height: 50,
                ),
                Text(
                  'Select Your Campus',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 20),
                Container(
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black,
                      width: 2.0,
                    ),
                  ),
                  child: SizedBox(
                    width: 200, // Set the desired width here
                    child: DropdownButton<String>(
                      hint: Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text('Select Campus'),
                      ),
                      value: _selectedCampus,
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedCampus = newValue;
                        });
                      },
                      items: <String>['North Campus', 'South Campus']
                          .map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Text(value),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    minimumSize: Size(150, 40),
                    backgroundColor: const Color.fromARGB(255, 44, 7, 251),
                  ),
                  onPressed: () {
                    if (_selectedCampus != null) {
                      // Navigate to next screen or perform any action based on selected campus
                      print('Selected campus: $_selectedCampus');
                      if (_selectedCampus == 'North Campus') {
                        Navigator.of(context)
                            .push(MaterialPageRoute(builder: (context) {
                          return const NorthForm();
                        }));
                      } else {
                        Navigator.of(context)
                            .push(MaterialPageRoute(builder: (context) {
                          return const SouthForm();
                        }));
                      }
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Please select a campus.'),
                        ),
                      );
                    }
                  },
                  child: Text(
                    'Next',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white, // Adjust text color as needed
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ]),
    );
  }
}
