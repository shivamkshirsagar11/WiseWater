// Importing modules
import PDFDocument from 'pdfkit-table'
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