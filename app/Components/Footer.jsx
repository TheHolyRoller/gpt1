
import React from 'react'
import '../Styles/Footer.css'; 
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';


function Footer() {
  return (
    <footer id='footerMainContainer' >
    
    <div id='footerSubContainer'>

    <ul id='footerList'>

    <li id='footerListItem'>

    <XIcon fontSize='large' style={{color: 'none'}} />


    </li>

    <li id='footerListItem'>

    
<InstagramIcon  fontSize='large' />


</li>

<li id='footerListItem'>

<FacebookIcon  fontSize='large' />
    


</li>




    </ul>



    </div>
    
    
    
    
    </footer>
  )
}

export default Footer