import 'package:flutter/material.dart';
import 'package:mess/register_login/login.dart';

class Reset extends StatefulWidget {
  final String roll;

  const Reset({super.key, 
    required this.roll,
  });

  @override
  State<Reset> createState() => _ResetState();
}

class _ResetState extends State<Reset> {

  late String otp;
  late String pass;
  late String confirmpass;
  late String roll2;

  final TextEditingController textEditingController2=TextEditingController();
  final TextEditingController textEditingController3=TextEditingController();
  final TextEditingController textEditingController4=TextEditingController();

  assign2(){
      otp=textEditingController2.text;
      pass=textEditingController3.text;
      confirmpass=textEditingController4.text;
      roll2=widget.roll;

      if(pass==confirmpass){
        Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
                    return const Homepg();
                    }));
      }
      else{
        showDialog(
          barrierDismissible:true,
          context: context,
         builder: (context){
          return AlertDialog(
            title:Text(
              "passwords are not matching",
              style:Theme.of(context).textTheme.titleMedium
            ),
            content:Text("Fill the Details again",
              style:Theme.of(context).textTheme.titleMedium,
            ),
            actions: [
              TextButton(onPressed:(){
                Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
                  return Reset(roll: roll2);
                }));
              },
               child: 
                const Text(
                  "OK",
                  style:TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
                )
               ),
            ],
          );
         }
        );
      }
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
                        'Reset Password',
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextField(
                      controller: textEditingController2,
                      style:Theme.of(context).textTheme.titleMedium,
                      decoration: InputDecoration(
                        contentPadding:const EdgeInsets.symmetric(vertical:10,horizontal:10),
                        labelText: 'OTP',
                        labelStyle:Theme.of(context).textTheme.titleMedium,
                        border:border,
                        enabledBorder: border,
                        focusedBorder: border,
                      ),
                    ),
                    const SizedBox(height: 15),
                    TextField(
                      controller: textEditingController3,
                      style:Theme.of(context).textTheme.titleMedium,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(vertical:10,horizontal:10),
                        labelText: 'Enter New Password',
                        prefixIcon: const Icon(Icons.lock_outline,color: Color.fromARGB(255, 36, 27, 173),),
                        labelStyle:Theme.of(context).textTheme.titleMedium,
                        border:border,
                        enabledBorder: border,
                        focusedBorder: border,
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 15),
                    TextField(
                      controller: textEditingController4,
                      style:Theme.of(context).textTheme.titleMedium,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(vertical:10,horizontal:10),
                        labelText: 'Confirm Password',
                        prefixIcon: const Icon(Icons.lock_outline,color: Color.fromARGB(255, 36, 27, 173),),
                        labelStyle:Theme.of(context).textTheme.titleMedium,
                        border:border,
                        enabledBorder: border,
                        focusedBorder: border,
                      ),
                      obscureText: true,
                    ),
                    const SizedBox(height: 15),
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
                        assign2();
                      },
                      child: const Text('Submit',
                        style:TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text('Already have an account?',
                          style:Theme.of(context).textTheme.bodySmall,
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
                            return const Homepg();
                          }));
                          },
                          child: Text('Login', style:Theme.of(context).textTheme.titleSmall,),
                        ),
                      ],
                    ),
                  ],
                ),
          ),
        ),
      ),
    );
  }
}