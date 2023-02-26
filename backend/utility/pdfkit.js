// Importing modules
import PDFDocument from 'pdfkit-table'
<<<<<<< HEAD
import fs from 'fs';

export function PDF_Creater(phone, name, line1, line2, city, pincode){
  try{
      const doc = new PDFDocument({size: 'A5'});
      
      doc.pipe(fs.createWriteStream(`PDF/${phone}.pdf`));
      const table = {
          title: "INVOICE",
          subtitle: `Billing for ${name}\n\nAddress\n-------------------------------\n${line1}\n${line2}\n${city} ${pincode}\n-------------------------------\n`,
          headers: [
            { label: "ITEM", property: 'item', width: 60},
            { label: "Description", property: 'des', width: 150}, 
            { label: "Amount", property: 'amount', width: 100}, 
          ],
          // complex data
          datas: [
            { 
              item: 'Name 1', 
              des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', 
              amount:"44"
            },
            { 
              des: 'Total', 
              amount:"44"
            },
            {
              des: "Payment status",
              amount:"PAID"
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
    }catch(e){
      console.log(e);
      throw Error("PDF ERROR")
    }

}
=======
import fs from 'fs'

// Create a document
export async function PDF_Creater(phone, name, line1, line2, city, pincode) {
  const doc = new PDFDocument({ margin: 30, size: 'A5' });

  // Saving the pdf file in root directory.

  doc.pipe(fs.createWriteStream(`../../PDF/${phone}.pdf`));
  const table = {
    title: "INVOICE",
    subtitle: `Billing for ${name}\n\nAddress\n-------------------------------\n${line1}\n${line2}\n${city} ${pincode}\n-------------------------------\n`,
    headers: [
      { label: "ITEM", property: 'item', width: 60 },
      { label: "Description", property: 'des', width: 150 },
      { label: "Amount", property: 'amount', width: 100 },
    ],
    // complex data
    datas: [
      {
        item: 'Name 1',
        des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
        amount: "44"
      },
      {
        des: 'Total',
        amount: "44"
      },
      {
        des: "Payment status",
        amount: "PAID"
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
}
// await PDF_Creater("8200971628", "Shivam Kshirsagar", "2, shree ramvihar society", "santram deri road", "nadiad", "387002");
>>>>>>> 9e042aa5c04475af0a7fc08bdf0b647e4fffefc1
