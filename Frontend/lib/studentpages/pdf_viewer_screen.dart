import 'package:flutter/material.dart';
import 'package:mess/register_login/globalip.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import 'dart:typed_data';
import 'package:http/http.dart' as http;

class PdfViewerScreen extends StatefulWidget {
  @override
  State<PdfViewerScreen> createState() => _PdfViewerScreenState();
}

class _PdfViewerScreenState extends State<PdfViewerScreen> {
  @override
  void initState() {
    super.initState();
    displayPDF();
  }

  Future<Uint8List> fetchPDFData() async {
    final response = await http
        .get(Uri.parse('http://$ip:3001/api/v1/users/menu'));
    return response.bodyBytes;
  }

  Future<void> displayPDF() async {
    final bytes = await fetchPDFData();

    await Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) => Scaffold(
          appBar: AppBar(
            title: Text('PDF Viewer'),
          ),
          body: SfPdfViewer.memory(bytes),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mess Menu'),
      ),
    );
  }
}
