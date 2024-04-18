import 'package:flutter/material.dart';

class Maker extends StatelessWidget {
  final String title;
  final String image;
  const Maker({
    super.key,
    required this.title,
    required this.image,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(20),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color.fromRGBO(221,221,221,0.75),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height:5),
          Center(
            child:Image.asset(
              image,
              height: 200,
            ),
          ),
          const SizedBox(height: 20,),
          Text(title,
            style:Theme.of(context).textTheme.titleMedium,
          ),
        ],
      ),
    );
  }
}