

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const cors = require('cors'); // Require the CORS library
const port = 3000;
const extractTextFromPDF = require('./ExtractTextFromPDF'); 
const generateResponse = require('./GenerateResponse'); 
const { ClassNames } = require('@emotion/react');

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Support encoded bodies

// Set up storage for incoming files using multer
const storage = multer.memoryStorage(); // Use memory storage to access file data

const upload = multer({ storage: storage });



// Endpoint to handle POST requests of PDF files
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  
  // Add in a check here to see what type of content is in the request. 
  
  // Extract the text from the request body here 
  console.log('this is the JSON Request', req.body); 

  const contentType = req.headers['content-type']; 
  console.log('this is the content type', contentType);
  const textInput = req.body; 
  console.log('this is the content from the req body', textInput); 


  // Check for application form url encoded 
  if(contentType === 'application/x-www-form-urlencoded'){

    // Add in the code here to send the content straight to api 
    console.log("we have a URL ENCODED POST request");
    const decodedText = decodeURIComponent(Object.keys(textInput)[0]); 

    console.log('this is the decoded text that has been extracted', decodedText);
  
  
    const formattedText = decodedText.replace(/"/g, ''); 
  
    console.log('this is the final formatted text that will be sent to the Server', formattedText); 

    const gptResponse = await generateResponse(formattedText); 

    console.log('this is the extracted RESPONSE FROM GPT ON THE SERVER', gptResponse); 

    res.end(gptResponse); 

  }
  else if(contentType === 'application/pdf') {

  
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
  }


});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
