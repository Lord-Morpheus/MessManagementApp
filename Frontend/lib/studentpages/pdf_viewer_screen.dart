import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import 'dart:typed_data';
import 'package:http/http.dart' as http;

class PdfViewerScreen extends StatefulWidget {
  @override
  State<PdfViewerScreen> createState() => _PdfViewerScreenState();
}

class _PdfViewerScreenState extends State<PdfViewerScreen> {
  Future<Uint8List> fetchPDFData() async {
    final response = await http
        .get(Uri.parse('http://192.168.135.166:3001/api/v1/users/menu'));
    return response.bodyBytes;
  }

  Future<void> displayPDF() async {
    final bytes = await fetchPDFData();

    await Navigator.of(context).push(
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
        title: Text('PDF Viewer'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: displayPDF,
          child: Text('View PDF'),
        ),
      ),
    );
  }
}
// @override
// Widget build(BuildContext context) {
// return Scaffold(
// appBar: AppBar(
// title: Text('PDF Viewer'),
// ),
// body: SfPdfViewer.asset("assets/menu_pdfs/Mess_Menu_north_campus.pdf")
// );
// }
// }