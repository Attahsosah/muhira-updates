import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useI18n } from '@/i18n/I18nContext';

function RealEstateHero() {
  const { t } = useI18n();
  return (
    <div className="bg-hero-img bg-cover text-white py-16 px-4 relative h-[100%] w-[100%] ">
    <div className="absoute  top-0 max-w-screen-xl mx-auto text-center z-10">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-700 font-serif">{t('realEstate.dreamHome', 'Find Your Dream Home')}</h1>
      <p className="text-lg mb-8 text-yellow-600">{t('realEstate.discoverProperty', 'Discover the perfect property for you.')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a className="bg-white text-black active:border-b-2 hover:bg-[#00360f] transition-all duration-500 ease-out hover:text-white py-2 px-4 rounded-md block">
            {t('realEstate.rentals', 'Rentals')}
          </a>
          <a className="bg-white text-black active:border-b-2 hover:bg-[#00360f] transition-all duration-500 ease-out hover:text-white py-2 px-4 rounded-md block">
            {t('realEstate.forSale', 'Houses for Sale')}
          </a>
          <a className="bg-white text-black active:border-b-2 hover:bg-[#00360f] transition-all duration-500 ease-out hover:text-white py-2 px-4 rounded-md block">
            {t('realEstate.sellHouse', 'Sell a house')}
          </a>
      </div>
    </div>
  </div>
  )
}

export default RealEstateHero
