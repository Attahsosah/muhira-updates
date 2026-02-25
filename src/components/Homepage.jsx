"use client";
import React, { forwardRef, useContext, useState, useEffect } from 'react'
import CardSection from './CardSection'
import CarCardsMain from './CarCardsMain'
import Newsletter from './Newsletter'
import Hero from './Hero'
import Navbar from './Navbar'
import Testiomonials from './Testimonials'
import Categories from "./Categories"
import MainCarousel from './MainCarousel';
import GlobalSearch from "./GlobalSearch"; // 1. Import the new component
import ElectronicsCardsMain from "./ElectronicsCardsMain";
import Footer from "./Footer";
import AboutHomeNew from "./AboutHomeNew";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import About from "./About";
import { PageLoadedContext } from './context/CarCardContext'
import Misc from "./Misc";
import Contact from "./Contact";
import RealEstate from "./RealEstate";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ScrollReveal from '../components/ScrollReveal';
import NewsletterModal from "../components/NewsletterModal";
import { Snackbar } from '@mui/material';
import { SnackBarContext } from './context/MiscContext';
import MuiAlert from '@mui/material/Alert';
import Head from 'next/head';

function Homepage() {
  const { data: session } = useSession();
  const [loaded, setLoaded] = useContext(PageLoadedContext);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useContext(SnackBarContext);
  const [submitted, setSubmitted] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(true);

  // ... (handleClose and style remain the same)

  return (
    <div className={loaded ? "block bg-gray-200" : "hidden"}>
      <Head>
        <title>Muhira | Logistics Company</title>
        {/* ... (meta tags remain the same) */}
      </Head>

      <Navbar link="/" />
      
      {/* Hero Section */}
      <div className="">
        <MainCarousel />
      </div>

      {/* 2. GLOBAL SEARCH BAR 
          Placing it here with z-index to ensure it sits above the carousel and categories.
      */}
      <div className="relative z-[60] -mt-10 mb-10">
        <GlobalSearch />
      </div>

      {/* Newsletter Modal */}
      {/* {showNewsletterModal && !submitted && (
        <NewsletterModal />
      )} */}

      {/* ... (Admin Modal and Snackbar remain the same) */}

      {/* Main Content Sections */}
      <Categories />
      <About />
      <hr className="mt-[30px]" />
      <Contact />
      <Footer />
    </div>
  );
}

export default Homepage;