import 'dart:math';

import 'package:flutter/material.dart';

// This widget is the root of your application.


class MyForm extends StatelessWidget {
const MyForm({super.key});

// This widget is the root of your application.
@override
Widget build(BuildContext context) {
return Scaffold(
   body:Container(
   decoration: BoxDecoration(
   image: DecorationImage(
   image: AssetImage('assets/background.png'), // Adjust the path to your background image
   fit: BoxFit.cover,
   ),
   ),
     child:
     Center(
     child:Column(
       mainAxisAlignment: MainAxisAlignment.center,
       children: [
         Text.rich(
           TextSpan(
             text: 'My ',
             children: [
               TextSpan(
                 text: "Flutter",
                 style: TextStyle(color: Colors.pink, fontSize: 50),
               ),
               TextSpan(text: " Random Value is: ${getNumber()}"),
             ],
           ),
         ),
         SizedBox(height: 20), // Add some spacing
         MyHomePg(), // Include MyHomePg widget
       ],
     ),
     ),
   )

  );

}
}
int getNumber(){
  Random random=new Random();
  var number=random.nextInt(100);
  return number;

}
class MyHomePg extends StatefulWidget {
  const MyHomePg({super.key});

  @override
  State<MyHomePg> createState() => _MyHomePgState();
}

class _MyHomePgState extends State<MyHomePg> {
  @override
  bool liked=false;
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ListTile(
          title: Text('Preference1'),
          trailing: IconButton(
            icon: liked ? Icon(Icons.favorite) : Icon(Icons.favorite_border),
            onPressed: () {
              setState(() => liked = !liked);
            },
          ),
        ),
      ],
    );
  }
}


