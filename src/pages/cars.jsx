"use client";
import Navbar from "@/components/Navbar";

import React, { useState, useEffect, useContext } from "react";

import CarDetailAdmin from "../components/CarDetailAdmin";

function cars() {
 
  return (
    <div>
        <Navbar link="dashboard"/>
        <CarDetailAdmin />
      
    </div>
  );
}

export default cars;
