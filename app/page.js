
'use client'; 
import Image from "next/image";
import FileUpload from "./Components/FileUpload";
import Nav from '../app/Components/Navbar'; 
import Hero from '../app/Components/Hero'; 
import CTA from '../app/Components/CTA'; 
import Footer from '../app/Components/Footer'; 


export default function Home() {
  return (
    <main id='main'>

    <nav id='nav' >

    <Nav/> 

    </nav>

    <header id='hero' >
    <Hero/> 


    </header>

    <section id='ctaSection' >

      <CTA/> 

    </section>

    <footer id='footer'>

    <Footer/> 

    </footer>


        
    </main>
  );
}
