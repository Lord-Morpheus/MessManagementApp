import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'newhome.dart';
import 'studenthomepg.dart';
import '../register_login/login.dart';
import 'student_feedback.dart';
import 'thankyou.dart';
class StudentForm extends StatefulWidget {
  const StudentForm({Key? key});

  @override
  State<StudentForm> createState() => _StudentFormState();
}

class _StudentFormState extends State<StudentForm> {
  final List<String> _preferences = [
    'Tulsi Mess(North Campus)',
    'Pine Mess',
    'Alder Mess(S11)',
    'Oak Mess',
    'Peepal Mess(North Campus)'
  ];

  String? _selectedPreference1;
  String? _selectedPreference2;
  String? _selectedPreference3;
  String? _selectedPreference4;
  String? _selectedPreference5;

  void _resetDropdowns() {
    setState(() {
      _selectedPreference1 = null;
      _selectedPreference2 = null;
      _selectedPreference3 = null;
      _selectedPreference4 = null;
      _selectedPreference5 = null;
    });
  }

  Widget buildDropdownBox(
      String label, String? value, void Function(String?) onChanged) {
    final List<String?> _remain = [
      _selectedPreference1,
      _selectedPreference2,
      _selectedPreference3,
      _selectedPreference4,
      _selectedPreference5
    ];
    _remain.remove(value);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
            padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
            child: Center(
              child: Center(
                child: Text(
                  label + "  *",
                  style: TextStyle(
                      color: Colors.black, fontWeight: FontWeight.w800),
                ),
              ),
            )),
        Center(
          child: Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.black, width: 3),
              borderRadius: BorderRadius.circular(5),
              color: Colors.white,
            ),
            child: DropdownButton(
              value: value,
              items: _preferences.map((e) {
                return DropdownMenuItem(
                  child: Text(e),
                  value: e,
                );
              }).toList(),
              onChanged: onChanged,
            ),
          ),
        )
      ],
    );
  }




  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
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
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/background.png'),
            fit: BoxFit.fill,
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "SELECT YOUR MESS",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 40, fontWeight: FontWeight.w900),

              ),
              Center(
                child: IconButton(
                  onPressed: _resetDropdowns,
                  icon: Icon(Icons.refresh),
                  tooltip: 'Refresh',
                  color: Colors.green

                ),
              ),
              Center(
                child: Form(
                  child: Column(
                    children: [
                      SizedBox(height: 20),
                      buildDropdownBox(
                        'Preference 1:',
                        _selectedPreference1,
                        (val) {
                          if (val != _selectedPreference5 &&
                              val != _selectedPreference4 &&
                              val != _selectedPreference2 &&
                              val != _selectedPreference3) {
                            setState(() {
                              _selectedPreference1 = val;
                            });
                          }
                        },
                      ),
                      SizedBox(height: 5),
                      buildDropdownBox('Preference 2:', _selectedPreference2,
                          (val) {
                        if (val != _selectedPreference5 &&
                            val != _selectedPreference4 &&
                            val != _selectedPreference3 &&
                            val != _selectedPreference1) {
                          setState(() {
                            _selectedPreference2 = val;
                          });
                        }
                      }),
                      SizedBox(height: 5),
                      buildDropdownBox(
                        'Preference 3:',
                        _selectedPreference3,
                        (val) {
                          if (val != _selectedPreference5 &&
                              val != _selectedPreference4 &&
                              val != _selectedPreference2 &&
                              val != _selectedPreference1) {
                            setState(() {
                              _selectedPreference3 = val;
                            });
                          }
                        },
                      ),
                      SizedBox(height: 5),
                      buildDropdownBox(
                        'Preference 4:',
                        _selectedPreference4,
                        (val) {
                          if (val != _selectedPreference5 &&
                              val != _selectedPreference1 &&
                              val != _selectedPreference2 &&
                              val != _selectedPreference3) {
                            setState(() {
                              _selectedPreference4 = val;
                            });
                          }
                        },
                      ),
                      SizedBox(height: 5),
                      buildDropdownBox(
                        'Preference 5:',
                        _selectedPreference5,
                        (val) {
                          if (val != _selectedPreference1 &&
                              val != _selectedPreference4 &&
                              val != _selectedPreference2 &&
                              val != _selectedPreference3) {
                            setState(() {
                              _selectedPreference5 = val;
                            });
                          }
                        },
                      ),
                      SizedBox(height: 20),
                      ElevatedButton(
                        child: Text(
                          "Submit",
                          style: TextStyle(color: Colors.black),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 10),
                          textStyle: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w800,
                              color: Colors.black),
                        ),
                        onPressed: () {
                          if (_selectedPreference1 != null &&
                              _selectedPreference2 != null &&
                              _selectedPreference3 != null &&
                              _selectedPreference4 != null &&
                              _selectedPreference5 != null) {
                            print('Submitted');
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) {
                                return thankyou ();
                              }),
                            );
                          } else {
                            // Show a message widget when preferences are not filled
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: Text("Error"),
                                  content:
                                      Text("Please fill all the preferences."),
                                  actions: [
                                    TextButton(
                                      onPressed: () {
                                        Navigator.of(context).pop();
                                      },
                                      child: Text("OK"),
                                    ),
                                  ],
                                );
                              },
                            );
                          }
                        },
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
