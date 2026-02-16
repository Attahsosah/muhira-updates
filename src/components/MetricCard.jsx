import React from 'react'

function MetricCard({ metric, colour, title }) {
  return (
    <div className={`bg-${colour}-400 h-[200px] w-[300px] rounded-[12px] block`}>
        <p className="text-white text-[24px] flex justify-center mt-[12px]">{title}</p>
        <hr className="bg-black"/>
        <p className="text-white text-[32px] mt-[50px] flex justify-center">{metric}</p>
    </div>
  )
}

export default MetricCard