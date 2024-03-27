import 'package:flutter/material.dart';
class thankyou extends StatelessWidget {
  const thankyou({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:Center(
        child:Text("Your response has been recorded.", textAlign: TextAlign.center,style: TextStyle(fontSize: 40,fontWeight: FontWeight.w700),),
      )
    );

  }
}
