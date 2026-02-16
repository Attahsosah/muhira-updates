import React from 'react'

function Filters() {
  return (
    <div className="block lg:flex justify-between items-center py-3 px-4 ">
        {/* Filter components will go here */}
        <div className="flex items-center">
  <label htmlFor="category" className="mr-2 font-medium">
    Category:
  </label>
  <select
    id="category"
    className="rounded-md py-1 px-2 bg-white border-gray-300 border focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
  >
    <option value="all">All categories</option>
    <option value="category1">SUVs</option>
    <option value="category2">Sedans</option>
    <option value="category3">Station Wagons</option>
  </select>
</div>


<div className="flex items-center">
  <label htmlFor="price" className="mr-2 font-medium">
    Price:
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
    In stock
  </label>
</div>

  </div>
  
  )
}

export default Filters