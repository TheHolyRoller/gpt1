'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/FileUpload.css'; 


function FileUpload() {
//Add in the state setup here
const [selectedFile, setSelectedFile] = useState(null);
const [extractedText, setExtractedText] = useState('');

//Add in the handle file change function here 
const handleFileChange = (e) => {

    setSelectedFile(e.target.files[0]); 
    console.log("file has just been submitted"); 
    console.log("this is the current selected file", selectedFile); 
    
}

//Add in the upload file to server function here 

const uploadFile = async () => {

    console.log('upload button just clicked')
    console.log('this is the upload file function'); 

    if(selectedFile){

        console.log('there is a selected file'); 
        console.log('this is the current selected file', selectedFile); 

    //Create a new instance of format data here 
    const formatData = new FormData(); 
    console.log('this is the form data', formatData); 
    
    //Now append the current selected file to the new instance of format Data 
    formatData.append('pdfFile', selectedFile); 
    console.log('this is the form data with the appended file', formatData); 
    console.log('this is the type of form data', typeof formatData); 

    

    // Find out why this is not running now
    //Now setup the axios post request to send this file over to the server 
    try {

        console.log('WHY IS THIS NOT RUNNING!@##@'); 
        // There is an error originating here 
        const response = await axios.post('http://localhost:3000/upload', formatData);
        console.log(response.data.message);
        console.log('IS THIS CODE RUNNING'); 
        console.log('this is the type of response from the server', typeof response);
        console.log('this is the message part of the response', response.data.message);
        console.log('this is the data part of the response from the server', response.data);
        
        console.log("-----TRYING TO GET TO THE TEXT------", response.data.choices[0].message.content);
        const renderedText = response.data.choices[0].message.content; 
        console.log('this is the rendered TEXT @$@$@#$@$@$@#$@$', renderedText); 

        // console.log('this is the returned completion choices', completion.choices[0].message.content);

        console.log('this is the response', response); 

        // setExtractedText(response.data.text); // Set the extracted text in state
        setExtractedText(renderedText); 
        // console.log('this is the extracted text', extractedText); 
        

      } catch (error) {
        console.error('File not uploaded to server', error);
        console.error("this is really frustrating"); 

      }


    }
        
    else{


    console.error("Could not upload file to server"); 
    console.error("Are you sure you uploaded pdf format"); 


    }



}


// Add in the analyze text function here




return (

<section id='fileUploadSection'  >
    <div id='formInputSection' >

    <form id='fileInputForm' onSubmit={uploadFile}  >
    <input type='file' name='pdf' id='fileInput' onChange={handleFileChange} />
    <button id='fileSubmit' type='button' onClick={uploadFile}>
        Upload PDF File


    </button>
    </form>
        
    </div>

    <article id='responseSection' >
        <button>

        <h1 id='extractedTextHeadline' >Extracted Text</h1>
        </button>

        <div id='extractedText'>

        <p>
    
        {extractedText}
        </p>
        </div>

    </article>

</section>

);

}

export default FileUpload