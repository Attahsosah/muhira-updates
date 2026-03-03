import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaHouse, FaMobile, FaHelmetSafety } from "react-icons/fa6";
import { LiaAirFreshenerSolid } from "react-icons/lia";

import { SelectedTypeContext } from "./context/MiscContext";
import { useRouter } from "next/router";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nContext";

const Navbar = ({ link }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedType, setSelectedType] = useContext(SelectedTypeContext);

  const router = useRouter();
  const { t } = useI18n(); 

  const handleCategoryClick = (type) => {
    setOpen(false); // Close menu on click
    router.push(`/miscType/${type}`);
  };

  const showStar = () => {
    if (window.scrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', showStar);
    return () => window.removeEventListener("scroll", showStar);
  }, []);

  return (
    <div className="relative">
      {/* --- LARGE SCREEN NAVBAR --- */}
      <nav className={`${!scrolled ? "bg-black" : "bg-black/90"} hidden lg:flex fixed top-0 z-[150] w-full transition-all duration-500 ease-out border-b border-white/5`}>
        <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-[#bd8b31] font-bold text-xl cursor-pointer p-2">
              <div className="flex items-center space-x-[8px]">
                <Image className="bg-white rounded-full" src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg" height={45} width={45} alt="Logo" />
                <p className="text-[#bd8b31] font-bold">Muhira Updates</p> 
              </div>
            </Link>

            <div className="flex items-center">
              <Link href="/" className="text-gray-300 hover:text-[#bd8b31] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t("navbar.home", "Home")}
              </Link>
              <Link href="/carsmain" className="text-gray-300 hover:text-[#bd8b31] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t("navbar.cars", "Cars")}
              </Link>
              <Link href="/houses" className="text-gray-300 hover:text-[#bd8b31] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t("navbar.houses", "Houses")}
              </Link>
            
              {session && (
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t("navbar.logout", "Logout")}
                </button>
              )}

              <div className="ml-6 pl-6 border-l border-gray-800">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SMALL SCREEN NAVBAR (Sticky Language Switcher) --- */}
      <nav className="block lg:hidden fixed w-full z-[130] top-0 border-b border-white/10">
        {/* Header Bar */}
        <div className="flex justify-between items-center py-2 px-3 w-full bg-black">
          <Link href="/" className="shrink-0">
            <Image className="bg-white rounded-full" src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg" height={40} width={40} alt="Logo" />
          </Link>

          <h1 className="text-[#bd8b31] font-black text-xl tracking-tighter">
            MUHIRA <span className="text-white">UPDATES</span>
          </h1> 
             
          <div className="flex items-center space-x-3">
            {/* Language Switcher is now fixed here for easy access */}
            <LanguageSwitcher />
            
            <div onClick={() => setOpen(!open)} className="text-white text-3xl cursor-pointer active:scale-90 transition-transform">
              { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
            </div>
          </div>
        </div>
            
        {/* Mobile Menu Overlay */}
        <div className={`${open ? "translate-x-0" : "translate-x-full"} fixed top-[56px] left-0 h-screen w-full bg-black transition-transform duration-500 ease-in-out z-[120]`}>
          <div className="flex flex-col items-center justify-start pt-12 h-full">
            <div className="flex flex-col space-y-10 w-full px-12">
              
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center space-x-4 border-b border-gray-900 pb-4">
                <FaHouse className="text-[#bd8b31] text-2xl" />
                <p className="text-gray-100 text-lg font-bold uppercase tracking-widest">{t("navbar.home", "Home")}</p>
              </Link>

              <Link href="/misc" onClick={() => setOpen(false)} className="flex items-center space-x-4 border-b border-gray-900 pb-4">
                <FaMobile className="text-[#bd8b31] text-2xl" />
                <p className="text-gray-100 text-lg font-bold uppercase tracking-widest">{t("navbar.electronics", "Electronics")}</p>
              </Link>
            
              <div onClick={() => handleCategoryClick("safety")} className="flex items-center space-x-4 border-b border-gray-900 pb-4 cursor-pointer">
                <FaHelmetSafety className="text-[#bd8b31] text-2xl" />
                <p className="text-gray-100 text-lg font-bold uppercase tracking-widest">{t("navbar.safetyEquipment", "Safety Equipment")}</p>
              </div>

              <div onClick={() => handleCategoryClick("accesories")} className="flex items-center space-x-4 border-b border-gray-900 pb-4 cursor-pointer">
                <LiaAirFreshenerSolid className="text-[#bd8b31] text-2xl" />
                <p className="text-gray-100 text-lg font-bold uppercase tracking-widest">{t("navbar.advertisingEquipment", "Advertising Equipment")}</p>
              </div>

              {session && (
                <button onClick={() => signOut()} className="text-red-500 font-bold uppercase text-left pt-10">
                  {t("navbar.logout", "Logout")}
                </button>
              )}

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;