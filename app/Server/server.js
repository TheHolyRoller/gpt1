

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const cors = require('cors'); // Require the CORS library
const port = 3000;
const extractTextFromPDF = require('./ExtractTextFromPDF'); 
const generateResponse = require('./GenerateResponse'); 

// Set up storage for incoming files using multer
const storage = multer.memoryStorage(); // Use memory storage to access file data

const upload = multer({ storage: storage });

app.use(cors());


// Endpoint to handle POST requests of PDF files
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const pdfUpload = req.file.buffer; 
  
  // Log the PDF file buffer to the console
  console.log( 'this is the pdf file sent through',  req.file.buffer);

    const extractedText = await extractTextFromPDF(pdfUpload); 

    console.log('this is the extracted text from the SERVER'); 
    const gptResponse = await generateResponse(extractedText); 

    console.log('this is the extracted RESPONSE FROM GPT ON THE SERVER', gptResponse); 

    res.end(gptResponse); 
  

});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
