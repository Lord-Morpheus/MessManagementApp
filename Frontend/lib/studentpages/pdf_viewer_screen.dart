import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class PdfViewerScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('PDF Viewer'),
      ),
      body: SfPdfViewer.asset(
        'assets/menu_pdfs/Mess_Menu_north_campus.pdf', // Path to your PDF file in the assets folder
        // key: _pdfViewerKey,
      ),
    );
  }
}
