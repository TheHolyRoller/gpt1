

import React from 'react'
import '../Styles/CTA.css'; 



function CTA() {
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

    {/*  onChange={handleFileChange} */}
   <input  type='file' name='pdf' id='CTAFileInput' />


   </div>


   <div id='uploadButtonContainer' >

{/* onClick={uploadFile} */}
    <button id='CTAFileSubmit' type='button' >
        Upload PDF File

    </button>
   </div>


    </div>
    {/* Add in the text box section here */}
    <section id='textOutputSection'>

        





    </section>




    </div>
    
    </div>
  )
}

export default CTA