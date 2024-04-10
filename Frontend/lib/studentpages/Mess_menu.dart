import 'package:flutter/material.dart';

class Menu extends StatelessWidget {
  const Menu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mess Menu',style:TextStyle(fontWeight:FontWeight.w800)),
        backgroundColor: Colors.grey,
      ),
      body: SingleChildScrollView(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/background.png'),
              fit: BoxFit.fill,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Center(
              child: Table(
                border: TableBorder.all(color: Colors.black),
                defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                children: [
                  const TableRow(children: [
                    Text(''),
                    Text(
                      'Breakfast',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    Text(
                      'Lunch',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    Text(
                      'Snacks',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    Text(
                      'Dinner',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Monday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Uttapam, Sambhar/Chutney, Fruits/2 Eggs, Daliya, Milk(200ml), Bread(4 slices), Butter, Jam, Bournvita, Coffee Powder/Tea Bags, Sprouts(Black chana + Moong)'),
                    _buildCell(
                        'Paneer Bhurji/Egg Bhurji, Chana Dal, Roti, Rice, Pickle, Green Salad, Lemon'),
                    _buildCell('Veg Sandwich, Tea'),
                    _buildCell(
                        'Rajma, Mix Veg (gajar+paneer or mushroom+bean+gobhi+matar, Gulab Jamun, Roti, Rice, Pickle, Green Salad, Lemon'),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Tuesday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Puri, Chana Masala, Halwa, Cornflakes, Milk(200ml), Bread(4 slices), Butter, Jam, Bournvita, Coffee Powder/Tea Bags, Sprouts(Black Chana+Moong)'),
                    _buildCell(
                        'Mah Ki Dal, Sepu Badi, Roti, Rice, Green Salad, Lemon+Pickle'),
                    _buildCell('Fried Idli(2 pieces), Coffee'),
                    _buildCell(
                        'Loki Chana, Yellow Moong, Kheer, Roti, Rice, Pickle, Green Salad, Lemon'),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Wednesday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Gobhi Prantha, Dhaniya Chutney, Curd, Fruits/2 Eggs, Daliya, Milk(200 ml), Bread(4 slices), Butter, Jam, Bournvita, Coffee Powder, Tea Bags, Sprouts(Black Chana+ Moong)'),
                    _buildCell(
                        'Kadhi Pakora, Kaddu Only, Gobhi Masala, Masala Papadj, Roti, Jeera Rice, Green Salad, Lemon+ Pickle'),
                    _buildCell('Pav Bhaji+ Tea'),
                    _buildCell(
                        'Kadhai Paneer/Mushroom Masala And Chicken Curry, Red Masoor Dal, Besan Ladoo, Roti, Rice, Green Salad, Lemon'),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Thursday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Methi Prantha, Aalo Tamatar Sabji, Daliya,Milk(200 ml), Bread, Butter, Jam, Bournvita, Coffee Powder/Tea Bags, Sprouts(Black Chana+ Moong)'),
                    _buildCell(
                        'White Chole, Aaloo Behan Bharta, Poori, Namkeen Chaanch, Rice, Green Salad, Lemon+ Pickle'),
                    _buildCell('Bread Pakoda, Coffee'),
                    _buildCell(
                        'Sarson Ka Saag, Dal Fry, Rasgulla, Roti, Rice , Pickle, Green Salad, Lemon'),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Friday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Idli, Sambhar, Peanut Chutney, 2 Bananas/2 Eggs, Cornflakes, Milk, Bread, Butter, Jam, Bournvita, Coffee Powder, Sprouts(Black Channa+Moong)'),
                    _buildCell(
                        'Moong Dal, Bhindi/Gajar Matar, Rice, Roti, Mix Raita, Green Salad, Lemon+Pickle'),
                    _buildCell('Channa Peanut Chat, Tea'),
                    _buildCell(
                        'Matar Paneer/. Mushroom & Egg Curry, Mix Dal, Gajar Ka Halwa, Roti Rice, Pickle, Green Salad, Lemon'),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Saturday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Mix Prantha, Dhaniya, Chutney, Curd, Fruits/ 2 Eggs, Daliya, Milk(200ml),Bread, Butter, Jam, Bournvita, Coffee Powder, Sprouts(Black Channa+Moong)'),
                    _buildCell(
                        'Bhature Chole, Green Chutney, Fried Masala Chili, Rice, Lassi, Green Salad, Lemon+Pickle'),
                    _buildCell('Samosa+ Imly Chutney, Tea'),
                    _buildCell(
                        'Aalo matar, Black Urad Dal, Jalebi, Roti, Rice, Pickle, Green Salad, Lemon'),
                  ]),
                  TableRow(children: [
                    const Text(
                      'Sunday',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    _buildCell(
                        'Masala Onion Dosa, Sambar, Coconut Chutney, Daliya, Milk(200ml), Bread(4 slices), Butter, Jam, Bournvita, Coffee Powder/ Tea Bags, Sprouts(Black Chana+ Moong)'),
                    _buildCell(
                        'Rajma, Aalu Tamatar Full Gobhi, Jeera Rice, Roti, Curd, Green Salad, Lemon+Pickle'),
                    _buildCell('Matari, Tea'),
                    _buildCell(
                        'Paneer And Chicken Biryani, Aaloo Soyabean, Raita, Barfi, Roti, Rice, Green Salad, Lemon+Pickle'),
                  ]),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCell(String text) {
    return Container(
      padding: const EdgeInsets.all(8.0),
      decoration: const BoxDecoration(

      ),
      child: Text(
        text,
        textAlign: TextAlign.center,
      ),
    );
  }
}
