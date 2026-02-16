import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CardSection from "../components/CardSection";
import CarCardsMain from "../components/CarCardsMain";
import Newsletter from "../components/Newsletter";
// import Homepage from "../muhira-components/Homepage";
import Homepage from "../components/Homepage"
import UnderConstruction from "../components/UnderConstruction";
import Preloader from "../components/Preloader"
import Head from 'next/head';
import CarCard from '@/components/CarCard';
import AdminModal from "@/components/AdminModal";
import SectionUpdateModal from "@/components/SectionUpdateModal";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  return (
  <div>
     <Head>
        <title>Muhira Updates | Logistics Company</title>
        <link
          rel="icon"
          href="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg"/>
        <meta
          name="description"
          content="At Muhira, we are not just an eCommerce store; we are your reliable partner in bringing the world of shopping to your fingertips. Based in the heart of Burundi, we understand the unique needs of our community, and we're on a mission to redefine the online shopping experience!"
        />
        <meta name="theme-color" content="#003a0f"/>


  

      </Head>
      <Script
        id="tawk-script" // Required to avoid Next.js errors
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/679b88ed825083258e0dc08d/1iirotp7h';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
   
        <Preloader />

        <AdminModal />
        <SectionUpdateModal />
  {/* Update */}

  {/*   */}
      <Homepage />
    {/* <UnderConstruction /> */}
   {/* Test */}
</div>
  )
}
