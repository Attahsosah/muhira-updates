import React from 'react'
import Navbar from '../../components/Navbar'
import HouseDetailPage from "../../components/HouseDetailPage"
import { getHouseById } from '../../../firebaseUtil'
function page({ house }) {
  return (
    <div>
        <Navbar />
        <HouseDetailPage house={house}/>
        </div>
  )
}

export default page

export async function getServerSideProps({ params }) {

  const house = await getHouseById(params.id);

  if (!house) {
    return {
      notFound: true, // Handle 404 error if the product is not found
    };
  }

  return {
    props: {
      house,
    },
  };
}

