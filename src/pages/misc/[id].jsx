import React from 'react'
import Navbar from '../../components/Navbar'
import MiscDetailPage from '../../components/MiscDetailPage'
import { getMiscById } from '../../../firebaseUtil';

function page({ product }) {
  return (
    <div>
        <Navbar />
        <MiscDetailPage product={product} />    
    </div>
  )
}

export async function getServerSideProps({ params }) {
    const product = await getMiscById(params.id);
  
    if (!product) {
      return {
        notFound: true,
      };
    }

    /**
     * SERIALIZATION FIX:
     * We convert the product object to a JSON string and back to an object.
     * This strips out the complex Firebase Timestamp objects and replaces 
     * them with standard ISO string dates, which Next.js can handle.
     */
    const serializedProduct = JSON.parse(JSON.stringify(product));
  
    return {
      props: {
        product: serializedProduct,
      },
    };
}

export default page