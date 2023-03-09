// Importing modules
import PDFDocument from 'pdfkit-table'
import fs from 'fs';

export function PDF_Creater(companyName, companyContact, phone, name, address, payment) {
  const { line1, line2, city, pincode } = address;
  try {
    const doc = new PDFDocument({ size: 'A5' });

    doc.pipe(fs.createWriteStream(`PDF/${phone}.pdf`));
    const data = [];
    let total_amount = 0
    for (const key in payment) {
      data.push(
        {
          item: payment[key].name,
          des: `Quantity is ${payment[key].water_quantity} par litter cost is ${payment[key].cost}`,
          amount: payment[key].water_quantity * payment[key].cost
        }
      )
      total_amount += payment[key].water_quantity * payment[key].cost
    }
    data.push({
      item: '',
          des: `Payment Status`,
          amount:`${total_amount} PAID in cash`
    })
    const table = {
      title: "INVOICE",
      subtitle: `Billing for ${name}\n\nCompany name ${companyName}\n\nCompany contact ${companyContact}\n\nCompany Address\n-------------------------------\n${line1}\n${line2}\n${city} ${pincode}\n-------------------------------\n`,
      headers: [
        { label: "ITEM", property: 'item', width: 60 },
        { label: "Description", property: 'des', width: 150 },
        { label: "Amount", property: 'amount', width: 100 },
      ],
      // complex data
      datas:data,
    };
    doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 && doc.addBackground(rectRow, 'yellow', 0.15);
      },
    });
    doc.end();
  } catch (e) {
    console.log(e);
    throw Error("PDF ERROR")
  }

}