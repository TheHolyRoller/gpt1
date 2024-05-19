

import React from 'react';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../Styles/Navbar.css'; 

function Navbar() {
  return (
    <nav id='navMainContainer' >
    <div id='navSubContainer'>

    <div id='logoContainer'>

    <div id='logo'>

    {/* Vitalium */}
    HealthPlan
    {/* Fitness  */}

    </div>


    </div>

    <div id='navbarListContainer'>

    <ul id='navList' >
    <li id='listItem'>

        <XIcon fontSize='large' style={{color: 'none'}} />


    </li>

        <li id='listItem'>

            <InstagramIcon  fontSize='large' />


        </li>
    <li id='listItem'>
    
    <FacebookIcon  fontSize='large' />

    </li>



    </ul>



    </div>




    </div>
    
    
    
    
    </nav>
  )
}

export default Navbar