import React from 'react'
import { useI18n } from '@/i18n/I18nContext';

function Filters() {
  const { t } = useI18n();
  return (
    <div className="block lg:flex justify-between items-center py-3 px-4 ">
        {/* Filter components will go here */}
        <div className="flex items-center">
  <label htmlFor="category" className="mr-2 font-medium">
    {t('filters.category', 'Category:')}
  </label>
  <select
    id="category"
    className="rounded-md py-1 px-2 bg-white border-gray-300 border focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
  >
    <option value="all">{t('filters.allCategories', 'All categories')}</option>
    <option value="category1">{t('filters.suvs', 'SUVs')}</option>
    <option value="category2">{t('filters.sedans', 'Sedans')}</option>
    <option value="category3">{t('filters.stationWagons', 'Station Wagons')}</option>
  </select>
</div>


<div className="flex items-center">
  <label htmlFor="price" className="mr-2 font-medium">
    {t('filters.price', 'Price:')}
  </label>
  <input
    type="range"
    id="price"
    className="w-48"
    min="0"
    max="100"
    defaultValue="0"
  />
</div>



<div className="flex items-center">
  <input
    type="checkbox"
    id="instock"
    className="mr-2"
  />
  <label htmlFor="instock" className="font-medium">
    {t('filters.inStock', 'In stock')}
  </label>
</div>

  </div>
  
  )
}

export default Filters