import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebDevService from '../components/WebDevService'; // We will create this below

function Dev() {
    return (
      <div className="bg-[#050505] min-h-screen selection:bg-[#bd8b31] selection:text-white" >
         <Navbar />
         
         {/* Hero Header for Dev Section */}
         <div className="pt-32 pb-10 px-6 text-center">
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase" data-aos="zoom-out">
                Precision <span className="text-[#bd8b31]">Code.</span><br/>
                Visionary <span className="text-white/20">Design.</span>
            </h1>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto uppercase tracking-[0.3em] text-xs font-bold">
                Custom Web Solutions by Muhira Updates
            </p>
         </div>

         <WebDevService />
         
         <Footer />
      </div>
    );
}

export default Dev;