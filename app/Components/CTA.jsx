

import '../Styles/CTA.css'; 
import React, { useState } from 'react';
import axios from 'axios';


function CTA() {


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
    <div id='CTAMainContainer' >
    <div id='CTASubContainer'>

    <div id='headlineContainer'>
    <div id='headlineSubContainer'>

        <p id='headlineText'>
        
        Ready to Turn Your Dreams Into Reality? 


        </p>



    </div>



    </div>

    <div id='CTAButtonSection'>


   {/* Add in the input form here  */}
   <div id='fileInputContainer'>

    {/* Add in the label here */}
    <label for="CTAFileInput" id='CTAFileUpload' class='CTAFileUpload' >Browse Files</label>

    {/*  */}
   <input  type='file' name='pdf' id='CTAFileInput'  onChange={handleFileChange} />


   </div>


   <div id='uploadButtonContainer' >

{/* onClick={uploadFile} */}
    <button id='CTAFileSubmit' type='button' onClick={uploadFile} >
        Upload PDF File

    </button>
   </div>


    </div>
    {/* Add in the text box section here */}
    {/* Render the extracted text here  */}
    <section id='textOutputSection'>
    {extractedText}

    </section>


    </div>
    
    </div>
  )
}

export default CTA