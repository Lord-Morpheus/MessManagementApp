import 'package:flutter/material.dart';
import 'package:mess/register_login/login.dart';

class Registration extends StatefulWidget {
  const Registration({super.key});

  @override
  State<Registration> createState() => _RegistrationState();
}

class _RegistrationState extends State<Registration> {
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
                const SizedBox(height:125),
                const Center(
                  child: Text(
                    'REGISTER',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 30),
                TextField(
                  style:Theme.of(context).textTheme.titleMedium,
                  decoration: InputDecoration(
                    contentPadding:const EdgeInsets.symmetric(vertical:10,horizontal:10),
                    labelText: 'Roll Number',
                    hintText: 'Ex: B2XXXX',
                    labelStyle:Theme.of(context).textTheme.titleMedium,
                    border:border,
                    enabledBorder: border,
                    focusedBorder: border,
                  ),
                ),
                const SizedBox(height: 25),
                TextField(
                  style:Theme.of(context).textTheme.titleMedium,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(vertical:10,horizontal:10),
                    labelText: 'Enter Password',
                    prefixIcon: const Icon(Icons.lock_outline,color: Color.fromARGB(255, 36, 27, 173),),
                    labelStyle:Theme.of(context).textTheme.titleMedium,
                    border:border,
                    enabledBorder: border,
                    focusedBorder: border,
                  ),
                  obscureText: true,
                ),
                const SizedBox(height: 25),
                TextField(
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
                const SizedBox(height: 25),
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
                    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context){
                    return const Homepg();
                    }));
                  },
                  child: const Text('Register',
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
    );
  }
}