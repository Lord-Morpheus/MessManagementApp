import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:mess/studentpages/studenthomepg.dart';
import 'package:tiny_alert/tiny_alert.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

final storage = new FlutterSecureStorage();

class MessOff extends StatefulWidget {
  @override
  _MessOffState createState() => _MessOffState();
}

class _MessOffState extends State<MessOff> {
  bool _isLoading = false;
  var _token;
  File? _image;
  DateTime? _startDate;
  DateTime? _endDate;
  final _picker = ImagePicker();
  void initState() {
    super.initState();
    getToken();
  }

  Future<void> getToken() async {
    String? token = await storage.read(key: 'token');
    setState(() {
      _token = token;
    });
    print('token is ssidsif$_token');
  }

  Future<void> getImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        _image = File(pickedFile.path);
      } else {
        print('No image selected.');
      }
    });
  }

  Future<void> uploadImage() async {
    setState(() {
      _isLoading = true;
    });
    if (_image == null || _startDate == null || _endDate == null) {
      setState(() {
        _isLoading = false;
      });
      TinyAlert.warning(context,
          title: 'all options not selected',
          message: 'please select image, start date and end date');
      return;
    }
    if (_startDate!.isAfter(_endDate!)) {
      setState(() {
        _isLoading = false;
      });
      TinyAlert.warning(context,
          title: 'Invalid Dates',
          message: 'Start date cannot be after end date');
      return;
    }
    final cloudinaryUrl =
        Uri.parse('https://api.cloudinary.com/v1_1/dve3n9ftf/image/upload');

    var request = http.MultipartRequest('POST', cloudinaryUrl)
      ..files.add(await http.MultipartFile.fromPath('file', _image!.path))
      ..fields.addAll({
        'upload_preset': 'i0loisdv',
      });

    var response = await request.send();

    if (response.statusCode == 200) {
      final responseBody = await response.stream.bytesToString();
      final jsonResponse = json.decode(responseBody);
      final imageUrl = jsonResponse['secure_url'];
      print('Image uploaded to Cloudinary! URL: $imageUrl');

      await postToServer(imageUrl, _startDate, _endDate);
    } else {
      print('Failed to upload image: ${response.reasonPhrase}');
    }
  }

  Future<void> postToServer(
      String imageUrl, DateTime? startDate, DateTime? endDate) async {
    final Map<String, dynamic> requestBody = {
      'imgUrl': imageUrl,
      'startDate': startDate.toString().split(' ')[0],
      'endDate': endDate.toString().split(' ')[0],
    };

    final response = await http.post(
      // Uri.parse('http://192.168.89.166:3001/api/v1/users/messoff'),
      Uri.parse('https://mess-api.vercel.app/api/v1/users/messoff'),
      headers: {'Content-Type': 'application/json', 'Authorization': _token},
      body: jsonEncode(requestBody),
    );
    print(response.statusCode);
    if (response.statusCode == 200) {
      print('POST request successful!');
      TinyAlert.success(context,
          title: 'successfully submitted',
          onConfirm: () => {
                Navigator.of(context)
                    .pushReplacement(MaterialPageRoute(builder: (context) {
                  return const Studenthomepage();
                }))
              },
          message: 'Mess Off request successfully submitted');
    } else {
      TinyAlert.error(context,
          title: 'error', message: 'unable to apply for mess off, try again');
      print('Failed to make POST request: ${response.reasonPhrase}');
    }
    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _selectStartDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _startDate ?? DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != _startDate) {
      setState(() {
        _startDate = picked;
      });
    }
  }

  Future<void> _selectEndDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _endDate ?? DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != _endDate) {
      setState(() {
        _endDate = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mess off'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(height: 10),
              ElevatedButton(
                onPressed: getImage,
                child: Text('Select Image'),
              ),
              SizedBox(height: 10),
              _image == null
                  ? Text('No image selected.')
                  : ConstrainedBox(
                      constraints: BoxConstraints(
                        maxWidth: 700,
                        maxHeight: 400,
                      ),
                      child: Image.file(_image!),
                    ),
              _image == null
                  ? Text('upload a screenshot with approval from warden')
                  : SizedBox(
                      height: 5,
                    ),
              const SizedBox(height: 20),
              InkWell(
                onTap: () => _selectStartDate(context),
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.black, width: 2),
                  ),
                  child: Text(
                    _startDate != null
                        ? '${_startDate!.day}/${_startDate!.month}/${_startDate!.year}'
                        : 'Select Start Date',
                    style: const TextStyle(fontSize: 20),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              InkWell(
                onTap: () => _selectEndDate(context),
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.black, width: 2),
                  ),
                  child: Text(
                    _endDate != null
                        ? '${_endDate!.day}/${_endDate!.month}/${_endDate!.year}'
                        : 'Select End Date',
                    style: const TextStyle(fontSize: 20),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  elevation: 20,
                  backgroundColor: const Color.fromARGB(156, 44, 7, 251),
                  fixedSize: const Size(150, 50),
                ),
                onPressed: _isLoading ? null : uploadImage,
                child: _isLoading
                    ? LoadingAnimationWidget.staggeredDotsWave(
                        color: Colors.white,
                        size: 24,
                      )
                    : const Text(
                        'SUBMIT',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
