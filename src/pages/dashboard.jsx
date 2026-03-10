import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DashboardHome from "../components/DashboardHome";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

function page() {
  return (
    <div className="block">
      <Navbar />
      <DashboardHome />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default page;
