import React from 'react'
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Hero from "./Hero";
import ElectronicsHero from "./ElectronicsHero";
import RealEstateHeroNew from "../components/RealEstateHeroNew";
import CarAccesoriesHero from './CarAccesoriesHero';
function MainCarousel() {
  return (
    <Carousel
    className="mx-0 lg:mt-3"
    autoPlay
    infiniteLoop
    showStatus={false}
    showIndicators={false}
    showThumbs={false}
    interval={5000}
    >
   <ElectronicsHero />

{/* <RealEstateHeroNew /> */}
      {/* <Hero /> */}

      {/* <CarAccesoriesHero /> */}

   
    </Carousel> )
}

export default MainCarousel