

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

    try {
        
            console.log('WHY IS THIS NOT RUNNING!@##@'); 
            const response = await axios.post('http://localhost:3000/upload', formatData);
            console.log('this is the RESPONSE', response.data);
           await setExtractedText(response.data);
            console.log("this is the STATE VARIABLE EXTRACTED TEXT", extractedText); 
                
      } catch (error) {
    
    
        console.error('There is something wrong with the response , error');
        console.error("this is really frustrating"); 

      }


    }
        
    else{


    console.error("Could not upload file to server"); 
    console.error("Are you sure you uploaded pdf format"); 


}



}


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