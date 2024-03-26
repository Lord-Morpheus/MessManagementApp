import 'package:flutter/material.dart';
class menu extends StatelessWidget {
  const menu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(

      ),
      body:Container(
          height: double.infinity,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/background.png',), // Adjust the path to your background image
              fit: BoxFit.fill,
            ),
          ),
        child:Padding(
          padding: const EdgeInsets.all(10.0),
          child: Center(
            // color: Colors.white,
            // child: padding: EdgeInsets.all(16.0),
            child: Table(
              border: TableBorder.all(color: Colors.black),
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              children: [
                TableRow(children: [
                  Text(''),
                  Text('Breakfast',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('Lunch',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('Snacks',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('Dinner',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                ]),
                TableRow(children: [
                  Text('Monday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),
                TableRow(children: [
                  Text('Tuesday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),
                TableRow(children: [
                  Text('Wednesday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),
                TableRow(children: [
                  Text('Thursday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),
                TableRow(children: [
                  Text('Friday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),
                TableRow(children: [
                  Text('Saturday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),
                TableRow(children: [
                  Text('Sunday',style: TextStyle(fontWeight: FontWeight.w800,backgroundColor: Colors.red),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                  Text('',style: TextStyle(backgroundColor: Colors.grey),),
                ]),

              ],
            ),
          ),
        )
        )

    );
  }
}
