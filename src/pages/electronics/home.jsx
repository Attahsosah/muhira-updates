"use client";
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ElectronicsCardMain from "../../components/ElectronicsCardMain";
import { ElectronicsDataContext } from '../../components/context/CarCardContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firestore';
import ElectronicsHome from '../../components/ElectronicsHome';
function home() {
   
    return (
    <div>
       {/* <ElectronicsHome /> */}
    </div>
  )
}

export default home