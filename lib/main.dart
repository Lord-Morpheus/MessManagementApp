import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dashboard',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Dashboard'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black87,
        title: Row(
          children: <Widget>[
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Welcome',
                  style: TextStyle(color: Colors.white),
                ),
                Text(
                  'User',
                  style: TextStyle(color: Colors.white),
                ),
              ],
            ),
            VerticalDivider(color: Colors.white), // Vertical line
          ],
        ),
        leading: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 20, // Adjust the width of the lines as needed
              height: 2,
              color: Colors.white,
            ),
            SizedBox(height: 5), // Add some space between the lines
            Container(
              width: 20, // Adjust the width of the lines as needed
              height: 2,
              color: Colors.white,
            ),
            SizedBox(height: 5), // Add some space between the lines
            Container(
              width: 20, // Adjust the width of the lines as needed
              height: 2,
              color: Colors.white,
            ),
          ],
        ),
        actions: [
          Row(
            children: [
              IconButton(
                icon: Icon(Icons.logout, color: Colors.white),
                onPressed: () {},
              ),
              Text(
                'Logout',
                style: TextStyle(color: Colors.white),
              ),
            ],
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                'assets/images/background.png'), // Adjust the path to your background image
            fit: BoxFit.fill,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Center(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: <Widget>[
                    Icon(Icons.arrow_back), // Arrow icon
                    SizedBox(width: 8), // Spacer between icon and text
                    Expanded(
                      child: Text(
                        'Dashboard',
                        textAlign: TextAlign.center, // Center the text
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: 20), // Add padding on both sides
              child: Divider(), // Horizontal line with gap on sides
            ),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 300, vertical: 10),
              height: 400,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.black12, width: 2),
              ),
              child: Stack(
                children: [
                  Positioned(
                    top: 0,
                    left: 0,
                    right: 0,
                    child: Container(
                      height: 400 / 4, // 1/4th of container height
                      decoration: BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(15),
                          topRight: Radius.circular(15),
                        ),
                      ),
                    ),
                  ),
                  Positioned.fill(
                    top: 400 / 4,
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          bottomLeft: Radius.circular(15),
                          bottomRight: Radius.circular(15),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(
                          16.0,
                        ), // Add padding to create space
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(
                              height: 40,
                            ), // Add space between black part and text
                            Text(
                              'Student Name', // Replace with actual student name
                              style: TextStyle(fontSize: 20),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Student Roll Number', // Replace with actual roll number
                              style: TextStyle(fontSize: 20),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Allotted Mess', // Replace with actual mess information
                              style: TextStyle(fontSize: 20),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Hostel', // Replace with actual hostel information
                              style: TextStyle(fontSize: 20),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 245, // Adjust the bottom position of the image
                    left: 0,
                    right: 0,
                    child: Center(
                      child: ClipOval(
                        child: Container(
                          width:
                              100, // Adjust size of the circular image as needed
                          height:
                              100, // Adjust size of the circular image as needed
                          child: Image.network(
                            'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png', // Sample image URL
                            fit: BoxFit.cover, // Cover the entire circular area
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
