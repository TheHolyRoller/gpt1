
const PDFParse = require('pdf-parse');

function extractTextFromPDF(pdfBuffer) {
  return PDFParse(pdfBuffer).then(data => {
    console.log("this is the extracted text in module", data.text); 
    return data.text; // Contains the text extracted from the PDF
  });
}

module.exports = extractTextFromPDF;
