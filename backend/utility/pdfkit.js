// Importing modules
import PDFDocument from 'pdfkit-table'
import fs from 'fs';

export function PDF_Creater(companyName, companyContact, phone, name, address, payment) {
  const { line1, line2, city, pincode } = address;
  try {
    const doc = new PDFDocument({ size: 'A5' });

    doc.pipe(fs.createWriteStream(`PDF/${phone}.pdf`));
    const table = {
      title: "INVOICE",
      subtitle: `Billing for ${name}\n\nCompany name ${companyName}\n\nCompany contact ${companyContact}\n\nCompany Address\n-------------------------------\n${line1}\n${line2}\n${city} ${pincode}\n-------------------------------\n`,
      headers: [
        { label: "ITEM", property: 'item', width: 60 },
        { label: "Description", property: 'des', width: 150 },
        { label: "Amount", property: 'amount', width: 100 },
      ],
      // complex data
      datas: [
        {
          item: 'Hot Water',
          des: `Quantity is ${payment.hotWater.water_quantity} par litter cost is ${payment.hotWater.cost}`,
          amount: payment.hotWater.water_quantity * payment.hotWater.cost
        },
        {
          item: 'Normal Water',
          des: `Quantity is ${payment.normalWater.water_quantity} par litter cost is ${payment.normalWater.cost}`,
          amount: payment.normalWater.water_quantity * payment.normalWater.cost
        },
        {
          item: 'Cold Water',
          des: `Quantity is ${payment.coldWater.water_quantity} par litter cost is ${payment.coldWater.cost}`,
          amount: payment.coldWater.water_quantity * payment.coldWater.cost
        }
      ],
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