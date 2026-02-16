import React, { useContext, useEffect, useState } from 'react'
import WebDev from '../components/WebDev';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import Footer from '../components/Footer';
function Dev() {
    return (
      <div className="bg-gray-900" >
         <Navbar />
         <Nav />
         <Newsletter />
         <Footer />
      </div>
     
    );
  }

  export default Dev;
  