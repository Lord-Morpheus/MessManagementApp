import 'package:flutter/material.dart';
import 'package:mess/register_login/resetpass.dart';

class Forget extends StatefulWidget {
  const Forget({super.key});

  @override
  State<Forget> createState() => _ForgetState();
}

class _ForgetState extends State<Forget> {

  late String roll;
  late String email;

  final TextEditingController textEditingController1=TextEditingController();

  assign5(){
    roll=textEditingController1.text;
    email="$roll@students.iitmandi.ac.in";
    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
                      return Reset(roll : roll);
                    }));
  }
  @override
  Widget build(BuildContext context) {
    const border=OutlineInputBorder(
      borderSide: BorderSide(
        color: Color.fromRGBO(0, 0, 0, 1),
      ),
      borderRadius: BorderRadius.all(Radius.circular(10.0)),
    );
    
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image:  AssetImage("assets/images/background.png"),
            fit: BoxFit.cover,
            ),
        ),
        padding: const EdgeInsets.only(left:20,right: 20),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children:[
                    const Center(
                      child: Text(
                        'Verification',
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                    const SizedBox(height: 30),
                    Text(
                      'Enter your Institute Roll No.',
                      style:Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 20),
                    TextField(
                      controller: textEditingController1,
                      style:Theme.of(context).textTheme.titleMedium,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(vertical:10,horizontal:10),
                        labelText: 'Roll no.',
                        hintText: 'Ex: B2XXXX',
                        labelStyle:Theme.of(context).textTheme.titleMedium,
                        border:border,
                        enabledBorder: border,
                        focusedBorder: border,
                      ),
                    ),
                    const SizedBox(height: 40),
                    ElevatedButton(
                      style:ElevatedButton.styleFrom(
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(15.0)),
                        ),
                        elevation: 20,
                        backgroundColor:const Color.fromARGB(255, 44, 7, 251),
                        minimumSize: const Size(double.infinity, 50),
                      ),
                      onPressed: () {
                        assign5();
                      },
                      child: const Text('Reset Password',
                        style:TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],
                ),
          ),
        ),
      ),
    );
  }
}