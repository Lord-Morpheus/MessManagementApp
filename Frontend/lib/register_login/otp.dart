import 'package:flutter/material.dart';
import 'package:mess/register_login/globalvariables.dart';
import 'package:mess/register_login/register.dart';

class OTP extends StatefulWidget {
  const OTP({super.key});

  @override
  State<OTP> createState() => _OTPState();
}

class _OTPState extends State<OTP> {

  late String otp;

  final TextEditingController textEditingController1=TextEditingController();

  assign5(){
    otp=textEditingController1.text;
    cred["OTP"]=otp;
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
        child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children:[
                const SizedBox(height:150),
                const Center(
                  child: Text(
                    'ENTER OTP',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 30),
                Text(
                  'A verification code has been sent to your email address',
                  style:Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: 20),
                TextField(
                  style:Theme.of(context).textTheme.titleMedium,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(vertical:10,horizontal:10),
                    labelText: 'Verification Code',
                    hintText: 'Ex: abc123',
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
                    //Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
                     // return const Registration();
                   // }));
                  },
                  child: const Text('Create Account',
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
    );
  }
}