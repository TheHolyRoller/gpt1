

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const cors = require('cors'); // Require the CORS library
const port = 3000;
const extractTextFromPDF = require('./ExtractTextFromPDF'); 
const generateResponse = require('./GenerateResponse'); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Set up storage for incoming files using multer
const storage = multer.memoryStorage(); // Use memory storage to access file data

const upload = multer({ storage: storage });

// Endpoint to handle POST requests of PDF files
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  
  const contentType = req.headers['content-type']; 
  console.log('this is the content type of the POST request', contentType); 

  if(contentType === 'application/x-www-form-urlencoded'){
  

    // Extract the text from the request body 
    console.log('this is the request body', req.body); 
    const encodedContent = req.body; 
    const decodedKey = decodeURIComponent(Object.keys(encodedContent)[0]);
    console.log('this is the decoded key', decodedKey); 

    // Now turn the decoded key into a json object 
    const textInput = JSON.stringify(decodedKey); 

    console.log('this is the text Input', textInput); 


    // Send the text to the api here 
    const gptResponse = await generateResponse(textInput); 

  console.log('this is the extracted RESPONSE FROM GPT ON THE SERVER', gptResponse); 

  res.end(gptResponse); 



  }


  else{

console.log('this is the else statement'); 


 if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }


try{
  
  const pdfUpload = req.file.buffer; 
      // Log the PDF file buffer to the console
  console.log( 'this is the pdf file sent through',  req.file.buffer);

  const extractedText = await extractTextFromPDF(pdfUpload); 

  console.log('this is the extracted text from the SERVER'); 
  const gptResponse = await generateResponse(extractedText); 

  console.log('this is the extracted RESPONSE FROM GPT ON THE SERVER', gptResponse); 

  res.end(gptResponse); 
    //  
  }

  catch(error){

    console.error('encountered an error uploading pdf', error); 


  }





  }
  
  
  
  
  
  
  
  
 


});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
