import 'package:flutter/material.dart';
import 'package:mess/Homepg.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mess Management',
      theme: ThemeData(
        fontFamily: 'Lato',
        colorScheme: ColorScheme.fromSeed(
          seedColor:const Color.fromARGB(255, 62, 20, 167),
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
          prefixIconColor: Color.fromRGBO(119, 119,119,1),
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
          titleSmall:  TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color:Color.fromARGB(255, 36, 27, 173),
            decoration: TextDecoration.underline,
          ),
        ),
        useMaterial3: true,
      ),
      home:const Homepage(),
    );
  }
}