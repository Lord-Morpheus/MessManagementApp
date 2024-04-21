import 'package:flutter/material.dart';
import 'student_feedback.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

final _formkey = GlobalKey<FormState>();

class StudentForm extends StatefulWidget {
  @override
  _StudentFormState createState() => _StudentFormState();
}

class _StudentFormState extends State<StudentForm> {
  final List<String> _preferences = [
    '--None--',
    'Tulsi Mess(North Campus)',
    'Pine Mess',
    'Alder Mess(S11)',
    'Oak Mess',
    'Peepal Mess(North Campus)'
  ];
  String _name = '';
  String _rollNumber = '';
  String _selectedPreference1 = '';
  String _selectedPreference2 = '';
  String _selectedPreference3 = '';
  String _selectedPreference4 = '';
  String _selectedPreference5 = '';
  _StudentFormState() {
    _selectedPreference1 = _preferences[0];
    _selectedPreference2 = _preferences[0];
    _selectedPreference3 = _preferences[0];
    _selectedPreference4 = _preferences[0];
    _selectedPreference5 = _preferences[0];
  }

  Future<void> submitPreferences() async {
    // final url = Uri.parse('http://172.16.12.88:3000/api/v1/users/');
    final url = Uri.parse('http://192.168.11.166:3000/api/test');

    final body = {
      'preference1': _selectedPreference1,
      'preference2': _selectedPreference2,
      'preference3': _selectedPreference3,
      'preference4': _selectedPreference4,
      'preference5': _selectedPreference5,
    };

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(body),
      );

      if (response.statusCode == 200) {
        // Request successful
        print('Preferences submitted successfully');
      } else {
        // Request failed
        print('Failed to submit preferences. Error: ${response.statusCode}');
      }
    } catch (e) {
      // Handle exceptions
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Student Preferences Form'),
        backgroundColor: Colors.grey,
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                'assets/images/background.png'), // Adjust the path to your background image
            fit: BoxFit.fill,
          ),
        ),
        child: Padding(
            padding: EdgeInsets.all(16.0),
            // child:  Row(
            //   children: [
            //     Text("Fill Out The Mess Preferences"),
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text("Fill the Mess Form",
                      textAlign: TextAlign.center,
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
                  Form(
                    // key: _formkey;
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        TextFormField(
                          decoration: InputDecoration(labelText: 'Name'),
                          onChanged: (value) {
                            setState(() {
                              _name = value;
                            });
                          },
                        ),
                        TextFormField(
                          decoration: InputDecoration(labelText: 'Roll Number'),
                          onChanged: (value) {
                            setState(() {
                              _rollNumber = value;
                            });
                          },
                        ),
                        SizedBox(height: 10),
                        Text('Preference 1:'),
                        DropdownButton(
                            value: _selectedPreference1,
                            items: _preferences
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                            onChanged: (val) {
                              setState(() {
                                _selectedPreference1 = val as String;
                                print(_selectedPreference1);
                              });
                            }),
                        SizedBox(height: 5),
                        Text('Preference 2:'),
                        DropdownButton(
                            value: _selectedPreference2,
                            items: _preferences
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                            onChanged: (val) {
                              setState(() {
                                _selectedPreference2 = val as String;
                                print(_selectedPreference2);
                              });
                            }),
                        SizedBox(height: 5),
                        Text('Preference 3:'),
                        DropdownButton(
                            value: _selectedPreference3,
                            items: _preferences
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                            onChanged: (val) {
                              setState(() {
                                _selectedPreference3 = val as String;
                                print(_selectedPreference3);
                              });
                            }),
                        SizedBox(height: 5),
                        Text('Preference 4:'),
                        DropdownButton(
                            value: _selectedPreference4,
                            items: _preferences
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                            onChanged: (val) {
                              setState(() {
                                _selectedPreference4 = val as String;
                                print(_selectedPreference4);
                              });
                            }),
                        SizedBox(height: 5),
                        Text('Preference 5:'),
                        DropdownButton(
                          value: _selectedPreference5,
                          items: _preferences
                              .map((e) => DropdownMenuItem(
                                    child: Text(e),
                                    value: e,
                                  ))
                              .toList(),
                          onChanged: (val) {
                            setState(() {
                              _selectedPreference5 = val as String;
                              print(_selectedPreference5);
                            });
                          },
                        ),
                        SizedBox(height: 20),
                        ElevatedButton(
                          onPressed: () {
                            print('Submitted');
                            submitPreferences();
                            Navigator.push(context,
                                MaterialPageRoute(builder: (context) {
                              return FeedbackForm();
                            }));
                          },
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
                              )),
                        )
                      ],
                    ),
                  ),
                ])

            // ],
            // ),
            ),
      ),
    );
  }
}
