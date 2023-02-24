import { BillMailer } from "../../utility/billMailer.js";
import { PDF_Creater } from "../../utility/pdfkit.js";

export const sendRecipt = async (req, res) =>{
try{
    PDF_Creater("8200971628", "Shivam Kshirsagar", "2, shree ramvihar society", "santram deri road", "nadiad", "387002");
    await BillMailer("8200971628");
    res.status(200).json({
        message:"pdf sent",
        status:"all ok"
    })
}catch(e){
    console.log(e);
    res.status(500).json({
        error: {
            errorMessage: ['Interanl Server Error']
        }
    })
}
}