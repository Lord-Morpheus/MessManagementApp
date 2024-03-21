import 'package:flutter/material.dart';
import 'package:mess/otp.dart';

class Emailid extends StatefulWidget {
  const Emailid({super.key});

  @override
  State<Emailid> createState() => _EmailidState();
}

class _EmailidState extends State<Emailid> {
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
            image:  AssetImage("assets/images/rect.png"),
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
                    'ENTER EMAIL ID',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 30),
                Text(
                  '*Enter institute email id',
                  style:Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: 20),
                TextField(
                  style:Theme.of(context).textTheme.titleMedium,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(vertical:10,horizontal:10),
                    labelText: 'Email id',
                    hintText: 'Ex:example@iitmandi.ac.in',
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
                    Navigator.of(context).push(MaterialPageRoute(builder: (context){
                      return const OTP();
                    }));
                  },
                  child: const Text('Send OTP',
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