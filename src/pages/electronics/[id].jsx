import React from 'react';
import ElectronicsDetailPage from '../../components/ElectronicsDetailPage';
import { getElectronicById } from '../../../firebaseUtil';
import Navbar from "../../components/Navbar";

// 1. Capitalize the component name to "Page" or "ElectronicsDetail"
function Page({ product }) {
  return (
    <div className="pb-[300px]">
      <Navbar />
      {/* Ensure product exists before rendering */}
      {product && <ElectronicsDetailPage product={product}/>}
    </div>
  );
}

// 2. getServerSideProps remains the same logic, but we sanitize the data
export async function getServerSideProps({ params }) {
  const product = await getElectronicById(params.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      // JSON.parse/stringify trick to prevent the "Serialization Error" we saw earlier
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

// 3. Ensure this line is exactly like this at the bottom
export default Page;