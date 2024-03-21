import 'package:flutter/material.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _LoginedState();
}

class _LoginedState extends State<Homepage> {
  String dropdownvalue='One';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            IconButton(
              color: Colors.white,
              icon: const Icon(Icons.density_medium_rounded),
              onPressed: () {
                // Handle icon button action here
              },
            ),
            const SizedBox(width:1),
            const SizedBox(
              height: 50,
              child: VerticalDivider(
                color: Colors.white,
                thickness: 2,
              ),
            ),
            const SizedBox(width: 2),
            const Text("Welcome \n user",
              style: TextStyle(color:Colors.white),
            ),
          ],
        ),
        actions: [
          IconButton(
            color: Colors.white,
            icon: const Icon(Icons.logout_outlined),
            onPressed: () {
              // Handle logout action here
            },
          ),
          const Padding(
            padding:EdgeInsets.only(right:20),
            child: Text(
              'LOGOUT',
              style:TextStyle(
                color:Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      body: Container(
        decoration:const  BoxDecoration(
          image: DecorationImage(
            image:  AssetImage("assets/images/rect.png"),
            fit: BoxFit.cover,
          ),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height:40),
            const Center(
              child: Text(
                'MESS SELECT',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Enter your preference order for mess \n selection',
              style:Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height:10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal:10),
              width:double.infinity,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color:Colors.black,width:2)
              ),
              child: DropdownButton<String>(
                isExpanded: true,
                value: dropdownvalue,
                icon: const Icon(Icons.arrow_drop_down),
                style: Theme.of(context).textTheme.titleMedium,
                onChanged: (String? newValue){
                  setState(() {
                    dropdownvalue=newValue!;
                  });
                },
                items:const [
                  DropdownMenuItem(
                    value: 'One',
                    child: Text('One'),
                  ),
                  DropdownMenuItem(
                    value: 'Two',
                    child: Text('Two'),
                  ),
                  DropdownMenuItem(
                    value: 'Three',
                    child: Text('Three'),
                  ),
                ]
              ),
            ),
          ],
        ),
      ),
    );
  }
}
