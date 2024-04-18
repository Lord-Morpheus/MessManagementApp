import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data) => {

    data = data.map(obj => {
        // eslint-disable-next-line no-unused-vars
        const { id, ...rest } = obj;
        return rest;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet['A1'] = { v: 'Name', t: 's', s: { bold: true } };
    worksheet['B1'] = { v: 'Hostel', t: 's', s: { bold: true } };
    worksheet['C1'] = { v: 'Roll No', t: 's', s: { bold: true } };
    worksheet['D1'] = { v: 'Team', t: 's', s: { bold: true } };
    worksheet['E1'] = { v: 'Status', t: 's', s: { bold: true } };
    worksheet['F1'] = { v: 'Mess', t: 's', s: { bold: true } };
    worksheet['G1'] = { v: 'Email', t: 's', s: { bold: true } };
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(blob, "studentData.xlsx");
};
