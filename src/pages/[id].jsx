"use client";

import { getProductById } from "../../firebaseUtil";
import DetailPage from "../components/DetailPage";
import Footer from "../components/Footer";

// import React, { useContext, useEffect, useState } from "react";

function page({product}) {

  return (
    <div className="">
      
      <DetailPage product={product} />
      <Footer />
      {/* test */}
      

    </div>
  );
  
}
export async function getServerSideProps({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      notFound: true, // Handle 404 error if the product is not found
    };
  }

  return {
    props: {
      product,
    },
  };
}


export default page;
