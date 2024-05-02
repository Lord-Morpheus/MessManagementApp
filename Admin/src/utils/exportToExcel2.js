import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel2 = (data, mess) => {
  const transformedData = data.map((item) => transformData(item, mess.mess));

  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  
  worksheet["A1"] = { v: "MESS", t: "s", s: { bold: true } };
  worksheet["B1"] = { v: "DESCRIPTION", t: "s", s: { bold: true } };
  worksheet["C1"] = { v: "NUMBER OF STUDENTS", t: "s", s: { bold: true } };
  worksheet["D1"] = { v: "DAYS", t: "s", s: { bold: true } };
  worksheet["E1"] = { v: "QUANTITY", t: "s", s: { bold: true } };
  worksheet["F1"] = { v: "RATE PER DAY", t: "s", s: { bold: true } };
  worksheet["G1"] = { v: "AMOUNT(Rs.)", t: "s", s: { bold: true } };

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "revenue.xlsx");
};

const transformData = (originalData, messName) => {
  const { count, daysPresent } = originalData;
  const description = `${count} students for ${daysPresent}`;
  const quantity = count * daysPresent;
  const rate = 125;
  const amount = count * daysPresent * rate;

  return {
    MESS: messName,
    DESCRIPTION: description,
    "NUMBER OF STUDENTS": count,
    DAYS: daysPresent,
    QUANTITY: quantity,
    "RATE PER DAY": rate,
    "AMOUNT(Rs.)": amount,
  };
};
