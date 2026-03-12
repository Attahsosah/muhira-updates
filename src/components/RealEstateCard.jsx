import React from 'react'
import { useI18n } from '@/i18n/I18nContext';

function RealEstateCard() {
  const { t } = useI18n();
  return (
<div className="w-[332.66px]  shadow-lg rounded-[8px] block px-[15px] pb-[15px] hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out">

        <div className="flex justify-center">
                <button  className=" h-[40px] px-[5px]  text-[#F75D34] bg-white border border-[#F75D34] text-[12px] mt-[16px] cursor-pointer hover:bg-[#F75D34] hover:text-gray-100 transform transition-all duration-300 ease-out">{t('realEstate.addToCart', 'Add to Cart')}</button>
        </div>

    </div>  )
}

export default RealEstateCard