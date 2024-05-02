import 'dart:math';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mess/register_login/globalip.dart';
import 'newhome.dart';
import 'studenthomepg.dart';
import '../register_login/login.dart';
import 'student_feedback.dart';
import 'thankyou.dart';
import 'package:tiny_alert/tiny_alert.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

class StudentForm extends StatefulWidget {
  const StudentForm({Key? key});

  @override
  State<StudentForm> createState() => _StudentFormState();
}

class _StudentFormState extends State<StudentForm> {
  bool isLoading = false;
  bool LoadingData = true;
  var _formAvailable = false;
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
    checkFormAvailability();
  }

  Future<void> checkFormAvailability() async {
    final url = Uri.parse('http://$ip:3001/api/v1/users/status');
    //final url = Uri.parse('http://$ip:3000/api/form');

    try {
      final response = await http.get(
        url,
        // headers: {'Authorization': _token},
      );

      if (response.statusCode == 200) {
        setState(() {
          _formAvailable = true;
        });
      } else {
        setState(() {
          _formAvailable = false;
        });
      }
    } catch (e) {
      print('Error: $e');
    } finally {
      setState(() {
        LoadingData = false;
      });
    }
  }

  void logout() async {
    await storage.delete(key: 'token');

    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) {
      return Homepg();
    }));
  }

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

  List<String> getSelectedPreferenceIds() {
    setState(() {
      isLoading = true;
    });
    final List<String> selectedPreferenceIds = [];

    final Map<String, String> messIdMap = {
      "Pine Mess": "18e766cd-58ec-46b6-b658-f683b0519165",
      "Oak Mess": "79287884-7794-4f5b-ac3c-7a6109f0d028",
      "Peepal Mess(North Campus)": "c7bc1615-5208-46dc-bb7e-0b2d8765866a",
      "Tulsi Mess(North Campus)": "89b53ed9-23e0-4156-a7c2-fc21310ef3a4",
      "Alder Mess(S11)": "abbccc55-e1d4-40db-b41b-d4ed9ad0b23a",
      "D1 mess": "9402c23e-f077-41c3-bc32-472286d8ac55",
      "D2 mess": "e9caf747-6c02-4cc4-b45b-fe0873c73e0b",
      "D3 mess": "5b31984b-c5b7-4ee5-a97b-1e6ad7d095f9",
    };

    if (_selectedPreference1 != '--None--') {
      selectedPreferenceIds.add(messIdMap[_selectedPreference1]!);
    }
    if (_selectedPreference2 != '--None--') {
      selectedPreferenceIds.add(messIdMap[_selectedPreference2]!);
    }
    if (_selectedPreference3 != '--None--') {
      selectedPreferenceIds.add(messIdMap[_selectedPreference3]!);
    }
    if (_selectedPreference4 != '--None--') {
      selectedPreferenceIds.add(messIdMap[_selectedPreference4]!);
    }
    if (_selectedPreference5 != '--None--') {
      selectedPreferenceIds.add(messIdMap[_selectedPreference5]!);
    }

    return selectedPreferenceIds;
  }

  Future<void> submitPreferences() async {
    final url = Uri.parse('http://$ip:3001/api/v1/users/submit');

    // final url = Uri.parse('http://192.168.135.166:3001/api/v1/users/submit');
    // final url = Uri.parse('http://10.8.90.133:3000/api/test');
    final body = getSelectedPreferenceIds();
    // final body = {
    // 'preference1': _selectedPreference1,
    // 'preference2': _selectedPreference2,
    // 'preference3': _selectedPreference3,
    // 'preference4': _selectedPreference4,
    // 'preference5': _selectedPreference5,
    // };

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json', 'Authorization': _token},
        body: jsonEncode({'preferences': (body)}),
      );

      if (response.statusCode == 200) {
        // Request successful
        print('Preferences submitted successfully');
        TinyAlert.success(
          onConfirm: () => {
            Navigator.of(context)
                .pushReplacement(MaterialPageRoute(builder: (context) {
              return const Studenthomepage();
            }))
          },
          context,
          title: "Success!",
          message: "Preferences Submitted successfully!",
        );
      } else if (response.statusCode == 401) {
        logout();
        TinyAlert.error(
          onConfirm: () => {
            Navigator.of(context)
                .pushReplacement(MaterialPageRoute(builder: (context) {
              return const Studenthomepage();
            }))
          },
          context,
          title: "Error!",
          message: "User unauthorized, please login again",
        );
      } else {
        // Request failed
        print('Failed to submit preferences. Error: ${response.statusCode}');
        TinyAlert.error(
          context,
          title: "Error!",
          message: "Unable to submit Preferences, try again",
        );
      }
    } catch (e) {
      // Handle exceptions
      print('Error: $e');
    }
    setState(() {
      isLoading = true;
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
                  label + " *",
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
    if (LoadingData) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Student Form'),
        ),
        body: Center(
          child: LoadingAnimationWidget.inkDrop(
            size: 30,
            color: Colors.blue, // Customize the color if needed
          ),
        ),
      );
    }
    if (_formAvailable) {
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
        body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/background.png'),
              fit: BoxFit.fill,
            ),
          ),
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Center(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "SELECT YOUR MESS",
                      textAlign: TextAlign.center,
                      style:
                          TextStyle(fontSize: 40, fontWeight: FontWeight.w900),
                    ),
                    // Center(
                    //     child: ElevatedButton(
                    //   onPressed: _resetDropdowns,
                    //   style: ElevatedButton.styleFrom(
                    //     backgroundColor: const Color.fromARGB(255, 44, 7, 251),
                    //   ),
                    //   child: Text(
                    //     'Reset',
                    //     style: TextStyle(
                    //       fontSize: 16,
                    //       fontWeight: FontWeight.w600,
                    //       color: Colors.white, // Adjust text color as needed
                    //     ),
                    //   ),
                    // )),
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
                            buildDropdownBox(
                                'Preference 2:', _selectedPreference2, (val) {
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
                            Center(
                                child: ElevatedButton(
                              onPressed: _resetDropdowns,
                              style: ElevatedButton.styleFrom(
                                minimumSize: Size(150, 40),
                                backgroundColor:
                                    const Color.fromARGB(255, 44, 7, 251),
                              ),
                              child: Text(
                                'Reset',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                  color: Colors
                                      .white, // Adjust text color as needed
                                ),
                              ),
                            )),
                            SizedBox(height: 20),
                            ElevatedButton(
                              onPressed: isLoading
                                  ? null
                                  : () {
                                      if (_selectedPreference1 != null &&
                                          _selectedPreference2 != null &&
                                          _selectedPreference3 != null &&
                                          _selectedPreference4 != null &&
                                          _selectedPreference5 != null) {
                                        submitPreferences();
                                        print('Submitted');
                                      } else {
                                        // Show a message widget when preferences are not filled
                                        showDialog(
                                          context: context,
                                          builder: (BuildContext context) {
                                            return AlertDialog(
                                              title: Text("Error"),
                                              content: Text(
                                                  "Please fill all the preferences."),
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
                              child: isLoading
                                  ? LoadingAnimationWidget.staggeredDotsWave(
                                      color: Colors.white,
                                      size: 24,
                                    )
                                  : Text(
                                      "Submit",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.w600,
                                        fontSize: 16,
                                      ),
                                    ),
                              style: ButtonStyle(
                                minimumSize:
                                    MaterialStateProperty.all(Size(150, 40)),
                                backgroundColor:
                                    MaterialStateProperty.resolveWith<Color>(
                                        (states) {
                                  if (states.contains(MaterialState.disabled)) {
                                    return Color.fromARGB(255, 44, 7, 251)
                                        .withOpacity(0.5); // Disabled color
                                  }
                                  return Color.fromARGB(
                                      255, 44, 7, 251); // Enabled color
                                }),
                                padding: MaterialStateProperty.all(
                                    EdgeInsets.symmetric(
                                        horizontal: 20, vertical: 10)),
                                textStyle: MaterialStateProperty.all(TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w800,
                                  color: Colors.black,
                                )),
                              ),
                            )
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    } else {
      return Scaffold(
        appBar: AppBar(
          title: Text('Student Form'),
        ),
        body: Center(
          child: Text('Form is not yet available.'),
        ),
      );
    }
    // return SizedBox();
  }
}
