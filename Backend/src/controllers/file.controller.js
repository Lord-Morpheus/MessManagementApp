import { PrismaClient } from '@prisma/client';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

const prisma = new PrismaClient();

export const menuUplaoder = async (req, res) => {
    try {
        // const { filename, mimetype, path } = req.file;
        // console.log(req.file);
        // const fileData = {
        //     filename,
        //     mimeType: mimetype,
        //     data: { create: { file: { create: { path } } } }
        // };
        // const uploadedFile = await prisma.menu.create({ data: fileData });
        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getMenu = async (req, res) => {
    try {
        const menu = await prisma.menu.findFirst();

        return menu;
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function generatePdfFromBytes(fileData) {
    const pdfDoc = await PDFDocument.load(fileData);
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

export async function getMenuPDF(req, res) {
    try {
        const filePath = './public/temp/menu.pdf';

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Stream the PDF file to the response
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}