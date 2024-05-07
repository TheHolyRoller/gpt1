

import '../Styles/CTA.css'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';


function CTA() {


  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [words, setWords] = useState([]); 
  const [validInput, setValidInput] = useState(false); 


  // Add in a state variable to keep track of the validity of the file input 
  // That way I can use it to decide whether or not to start displaying the loading animation. 
  // I can also change it when the formatted text changes and therefore hide it when the text begins to start rendering 



// Create the keyword Array here 

const keywords = ['Profitability:', 'Scalability:', '1.', '2.', '3.']; 

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

    // Check the file format here 
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

    alert('Please select a file!'); 


}



}


// Add in the Function that formats extracted text here 
// In the function set a state variable to the formatted text called formatted text. 

const keywordPattern = new RegExp(keywords.join('|'), 'g');
// console.log('this is the keyword pattern', keywordPattern); 


const formattedText = extractedText.replace(keywordPattern, '<div class="keyword" > $&</div>');


// Add in the useEffect hook here to orchestrate the whole process. 
// Make it run when the formatted text changes. 

useEffect(() => {

  const allWords = formattedText.split(/\s+/); 
  console.log('this is the allWords list', allWords); 


  // Add in the display words function here 
  console.log('calling the textInterval function')
  const textInterval = setInterval(() => {

  if(allWords.length > 0){

    // Run the shift sub-routine here 
    setWords(prevWords => [...prevWords, allWords.shift()]); 
    // console.log('this is the new previous word list now', prevWords); 






  }
  else{

    console.log('clearing interval'); 
    clearInterval(textInterval); 


  }


  }, 100); 


  // clean everything up to avoid memory leaks. It's good hygiene anyway. 

  // return () => clearInterval(textInterval);

  // Add in formatted text here into the second argument which is the dependency Array to Trigger useEffect when it runs 
  // console.log('formatted Text has changed', formattedText); 
},[formattedText])




// Add in the useEffect hook here that listens for changes to the valid input state variable 
// And then checks whether it is truthy or falsy and then decides whether to hide or render the loading animation element. 
useEffect(() => {

  // Check the value of the valid input state variable here 
  if(validInput === true ){

    // Set the display value of the loading element to block here 
    // The truthy value of the state variable will already be set in the input file function that checks for the 
    // validity of the file input 
    



  }

  else{

    // Just log something to the console as the display value of the loading element is already set to none by default
    // You won't need to set the value of the valid input state variable to false as this will be done in 
    // The previous useEffect hook. Therefore the state variable will change thus triggering this useEffect hook. 
    // And then we can check the value of the state variable and change the visibility of the UI element accordingly. 
    // Of the Loading Animation UI Element to a display of none. 
    // Even though it is like this by default I want a way of hiding the animation once the text has arrived from the 
    // Server and been fully formatted 




  }




}, [validInput]);





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
    {/* Add in the loading animation here */}
    
    
    {/* Add in the text box section here */}
    {/* Render the extracted text here  */}

    <section id='textOutputSection'>

    {/* <div dangerouslySetInnerHTML={{ __html: formattedText }} /> */}
    <div dangerouslySetInnerHTML={{ __html: formattedText + ' ' + words.join(' ') }} />    </section>


    </div>
    
    </div>
  )
}

export default CTA