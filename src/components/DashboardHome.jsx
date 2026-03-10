import DashboardChart from "@/components/DashboardChart";
import MetricCard from "@/components/MetricCard";
import OrdersDashboard from "@/components/OrdersDashboard";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firestore";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FilteredCarsContext } from "./context/CarCardContext";

function DashboardHome() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [filteredCars, setFilteredCars] = useContext(FilteredCarsContext);

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [confirmedOrders, setConfirmedOrders] = useState(0);

  useEffect(() => {
    if (!session?.user?.isAdmin) return;
    const unsub = onSnapshot(collection(db, 'orders'), (snap) => {
      const docs = snap.docs.map(d => d.data());
      setTotalOrders(docs.length);
      setPendingOrders(docs.filter(o => o.status === 'pending').length);
      setConfirmedOrders(docs.filter(o => o.status === 'confirmed').length);
    });
    return () => unsub();
  }, [session]);

  const toggleModal = () => {
    setOpen(true);
  };

  return (
    <div>
      {session?.user?.isAdmin ? (
        <>
          <div className="flex justify-center">
            <div className="flex justify-between w-full mx-[40px] mt-[90px]">
              <MetricCard title="Total Orders" metric={String(totalOrders)} colour="red" />
              <MetricCard title="Pending Orders" metric={String(pendingOrders)} colour="yellow" />
              <MetricCard title="Confirmed Orders" metric={String(confirmedOrders)} colour="red" />
            </div>
          </div>

          <div className="flex justify-between bg-white mt-[40px] mx-[40px]">
            {/* Bottom Left */}
            <DashboardChart />

            {/* Bottom Right */}
            <div className="flex space-x-[10px]">
              <Link href="/cars">
                <button className="h-[50px] px-[5px] py-[7px] rounded-[8px] bg-black text-white font-[400]">
                  My Ads
                </button>
              </Link>
            </div>

            <div className="block w-[500px]">
              <div className="flex justify-center">
                <button onClick={toggleModal}>Create Ad</button>
              </div>
            </div>
          </div>

          <OrdersDashboard />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DashboardHome;
