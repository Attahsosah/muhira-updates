import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Map from "./Map";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useI18n } from '@/i18n/I18nContext';

const Footer = () => {
    const { t } = useI18n();
    return (
        <footer className="block bg-black">
            <div className="lg:flex block justify-between px-[20px] lg:py-[26px] lg:px-[26px] w-[100%] py-[15px] mt-[50px]">

                {/* Left Side: Contact Info */}
                <div className="flex justify-center">
                    <div className="block lg:ml-[34px]">
                        <p className="font-serif text-[40px] font-[300] text-yellow-600 text-center uppercase">
                            M U H I R A <br />
                            <span className='text-gray-200'>U P D A T E S</span>
                        </p>

                        <div className="mt-[32px]">
                            <p className="text-gray-200 text-[16px] font-bold"> Address : Bujumbura, Burundi</p>
                            <p className="font-[300] text-gray-200 text-[16px]"> Commune : Mukaza Rohero,</p>
                            <p className="font-[300] text-gray-200 text-[16px]"> Chaussé du Prince Louis Rwagasore, <br /> Galerie Idéale E34</p>

                            <p className="mt-[30px] text-gray-200 text-[16px] font-bold">Tel: +257 69 57 11 09</p>
                            <p className="text-gray-200 text-[16px] font-bold">Email: muhiraupdates@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Center: Social Media Links & Privacy Section */}
                <div className='px-20 py-6 flex flex-col items-center'>
                    <p className="font-serif text-[20px] font-[300] text-yellow-600 text-center uppercase">
                        {t('footer.followUs', 'Follow Us').split(' ').join(' \n')}
                    </p>

                    <div className="flex space-x-4 mt-3">
                        <a href="https://www.facebook.com/profile.php?id=61558517173326&mibextid=ZbWKwL" className="text-gray-400 hover:text-blue-500 text-3xl transition-colors"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/muhiraupdates?igsh=aWQyMXV5djRnaXRw" className="text-gray-400 hover:text-pink-500 text-3xl transition-colors"><FaInstagram /></a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-600 text-3xl transition-colors"><FaLinkedinIn /></a>
                    </div>

                    {/* Privacy Policy Subsection */}
                    <div className="mt-10 text-center border-t border-white/10 pt-4 w-full">
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">{t('footer.legalTrust', 'Legal & Trust')}</p>
                        <Link
                            href="/privacy"
                            className="text-[#bd8b31] hover:text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all animate-pulse"
                        >
                            {t('footer.privacyPolicy', 'Privacy Policy')}
                        </Link>
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className="h-[250px] w-[300px] lg:w-[450px] flex justify-center mx-auto mt-[20px] lg:mt-0">
                    <Map />
                </div>
            </div>

            {/* Bottom Copyright */}
            <p className="text-center font-[400] text-white/50 text-xs pb-6 border-t border-white/5 pt-6">
                © Muhira Updates Ltd. 2023-{new Date().getFullYear()}. {t('footer.allRightsReserved', 'All Rights Reserved')}
            </p>
        </footer>
    )
}

export default Footer;
