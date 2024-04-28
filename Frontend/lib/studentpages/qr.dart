import 'dart:convert';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:tiny_alert/tiny_alert.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = new FlutterSecureStorage();

class ScanQrPage extends StatefulWidget {
  const ScanQrPage({super.key});
  @override
  State<ScanQrPage> createState() => _ScanQrPageState();
}

class _ScanQrPageState extends State<ScanQrPage> {
  var _token;
  void initState() {
    super.initState();
    getToken();
  }

  Future<void> getToken() async {
    String? token = await storage.read(key: 'token');
    setState(() {
      _token = token;
    });
    print(_token);
  }

  final player = AudioPlayer();
  String? scannedData;
  bool dataSent = false;

  Future<void> playSound(bool flag) async {
    if (flag) {
      String audiopath = 'audio/success.mpeg';
      await player.play(AssetSource(audiopath));
    } else {
      String audiopath = 'audio/failure.mp3';
      await player.play(AssetSource(audiopath));
    }
  }

  Future<void> sendQRData(String data) async {
    // final url = Uri.parse('http://10.8.90.133:3000/api/verify');
    final url = Uri.parse('http://10.8.90.133:3001/api/v1/users/verifyQR');
    final body = jsonEncode({'qrMessId': data});
    print('trying to send data');
    try {
      final response = await http.post(url,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': _token
          },
          body: body);
      if (!mounted) return;
      if (response.statusCode == 200) {
        playSound(true);
        TinyAlert.success(
          context,
          title: "Success!",
          message: "Your mess has been verified successfully!",
        );
        print('data sent successfully');
      } else {
        playSound(false);
        TinyAlert.error(
          context,
          title: "Failure!",
          message: "Your mess verification has failed!",
        );
        print('Failed to send data: ${response.body}');
      }
    } catch (e) {
      print('Network error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan QR Code'),
      ),
      body: MobileScanner(
        controller: MobileScannerController(
          detectionSpeed: DetectionSpeed.noDuplicates,
        ),
        onDetect: (capture) {
          if (!dataSent) {
            final List<Barcode> barcodes = capture.barcodes;
            for (final barcode in barcodes) {
              setState(() {
                scannedData = barcode.rawValue;
              });
              print('QR Code scanned: $scannedData');
              if (scannedData != null) {
                sendQRData(scannedData!);
                setState(() {
                  dataSent = true;
                });
                print('data sent successfully');
                break;
              }
            }
          }
        },
      ),
    );
  }
}
