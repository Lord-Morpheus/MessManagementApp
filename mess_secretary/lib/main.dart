import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mess secretary',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class Mess {
  final String name;
  final String imageUrl;

  Mess({required this.name, required this.imageUrl});
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  // List of messes with their names and image URLs
  final List<Map<String, String>> messes = [
    {'name': 'Pine Mess', 'imageUrl': 'pine.jpg'},
    {'name': 'Oak Mess', 'imageUrl': 'oak.jpg'},
    {'name': 'Alder Mess', 'imageUrl': 'alder.jpg'},
    {'name': 'Tulsi Mess', 'imageUrl': 'tulsi.jpg'},
    {'name': 'Cedar Mess', 'imageUrl': 'cedar.jpg'},
    {'name': 'Maple Mess', 'imageUrl': 'maple.jpg'},
    {'name': 'Gulmohar Mess', 'imageUrl': 'gulmohar.jpg'},
    {'name': 'Peepal Mess (North Campus)', 'imageUrl': 'peepaln.jpg'},
    {'name': 'Peepal Mess (South Campus)', 'imageUrl': 'peepals.jpg'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black87,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
            Spacer(),
            Column(
              children: [
                Icon(
                  Icons.access_time,
                  color: Colors.blue,
                ),
                Text(
                  'Mess Menu',
                  style: TextStyle(color: Colors.blue),
                ),
              ],
            ),
            Spacer(),
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
                'LOGOUT',
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
                    Expanded(
                      child: Text(
                        'CHECK THE FEEDBACK AND NUMBER OF STUDENTS FOR EACH MESS',
                        textAlign: TextAlign.center, // Center the text
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              child: GridView.count(
                crossAxisCount: 3,
                mainAxisSpacing: 8, // Adjust the space between rows
                crossAxisSpacing: 8, // Adjust the space between columns
                children: List.generate(messes.length, (index) {
                  return GridTile(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(
                              10), // Adjust the radius for rounded corners
                          child: Image.asset(
                            'assets/images/${messes[index]['imageUrl']}',
                            width: 100,
                            height: 100,
                            fit: BoxFit
                                .cover, // Adjust the fit to cover the rounded corners
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          messes[index]['name']!,
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  );
                }),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
