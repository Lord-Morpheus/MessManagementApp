import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mess/register_login/login.dart';
import 'package:mess/studentpages/campus.dart';
import 'package:mess/studentpages/northform.dart';
import 'package:mess/studentpages/studenthomepg.dart';

final storage = new FlutterSecureStorage();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  String? token = await storage.read(key: 'token');
  runApp(MyApp(token: token));
}

class MyApp extends StatelessWidget {
  final String? token;

  const MyApp({Key? key, this.token}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mess Management',
      theme: ThemeData(
        fontFamily: 'Lato',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 62, 20, 167),
          primary: const Color.fromARGB(255, 91, 65, 143),
        ),
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          titleTextStyle: TextStyle(
            fontSize: 20,
            color: Colors.black,
          ),
        ),
        inputDecorationTheme: const InputDecorationTheme(
          hintStyle: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
          prefixIconColor: Color.fromRGBO(119, 119, 119, 1),
        ),
        textTheme: const TextTheme(
          titleLarge: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 35,
          ),
          titleMedium: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
          bodySmall: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
          titleSmall: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: Color.fromARGB(255, 36, 27, 173),
            decoration: TextDecoration.underline,
          ),
        ),
        useMaterial3: true,
      ),
      home: token != null ? Studenthomepage() : Homepg(),
    );
  }
}
