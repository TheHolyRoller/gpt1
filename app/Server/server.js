

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const cors = require('cors'); // Require the CORS library
const port = 3000;
const extractTextFromPDF = require('./ExtractTextFromPDF'); 


// Set up storage for incoming files using multer
const storage = multer.memoryStorage(); // Use memory storage to access file data

const upload = multer({ storage: storage });

app.use(cors());


// Endpoint to handle POST requests of PDF files
app.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const pdfUpload = req.file.buffer; 
  
  // Log the PDF file buffer to the console
  console.log( 'this is the pdf file sent through',  req.file.buffer);

  extractTextFromPDF(pdfUpload)
  .then(extractedText => {
    // Now that we have the extracted text, we can pass it to another function
    // Call the generate response function here
    // const gptResponse = someOtherFunction(extractedText);
    // Send the generated response back to the client here
    console.log('this is the extracted text', extractedText); 
    // res.send(extractedText); // Send the extracted text back to the client
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Error processing PDF');
  });




});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
