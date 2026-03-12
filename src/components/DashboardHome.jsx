import { useState, useEffect } from "react";
import { useI18n } from '@/i18n/I18nContext';
import { db } from "../../firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import DashboardChart from "@/components/DashboardChart";
import OrdersDashboard from "@/components/OrdersDashboard";
import {
  HiOutlineShoppingCart,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineLogout,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineCollection,
  HiOutlineMenu,
} from "react-icons/hi";


function StatCard({ title, value, Icon, bg, text, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-5">
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <span className={`${bg} ${text} p-2.5 rounded-xl`}>
          <Icon className="text-[18px]" />
        </span>
      </div>
      <p className="text-4xl font-black text-gray-900 tracking-tight">{value}</p>
      <p className="text-xs text-gray-400 mt-2 font-medium">{sub}</p>
    </div>
  );
}

function DashboardHome() {
  const { t } = useI18n();
  const { data: session } = useSession();

  const NAV = [
    { id: "overview", label: t('dashboard.overview', 'Overview'), icon: HiOutlineChartBar },
    { id: "orders",   label: t('dashboard.orders', 'Orders'),   icon: HiOutlineShoppingCart },
  ];

  const PRODUCT_LINKS = [
    { href: "/carsmain", label: t('navbar.cars', 'Cars'),     icon: HiOutlineTruck },
    { href: "/houses",   label: t('navbar.houses', 'Houses'),   icon: HiOutlineHome },
    { href: "/misc",     label: t('dashboard.products', 'Products'), icon: HiOutlineCollection },
  ];
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [confirmedOrders, setConfirmedOrders] = useState(0);

  useEffect(() => {
    if (!session?.user?.isAdmin) return;
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      const docs = snap.docs.map((d) => d.data());
      setTotalOrders(docs.length);
      setPendingOrders(docs.filter((o) => o.status === "pending").length);
      setConfirmedOrders(docs.filter((o) => o.status === "confirmed").length);
    });
    return () => unsub();
  }, [session]);

  if (!session?.user?.isAdmin) return null;

  const initials = session.user.name?.[0]?.toUpperCase() || "A";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const stats = [
    {
      title: t('dashboard.totalOrders', 'Total Orders'),
      value: totalOrders,
      Icon: HiOutlineShoppingCart,
      bg: "bg-violet-50",
      text: "text-violet-600",
      sub: t('dashboard.allTime', 'All time'),
    },
    {
      title: t('dashboard.pendingOrders', 'Pending Orders'),
      value: pendingOrders,
      Icon: HiOutlineClock,
      bg: "bg-amber-50",
      text: "text-amber-600",
      sub: t('dashboard.awaitingConfirmation', 'Awaiting confirmation'),
    },
    {
      title: t('dashboard.confirmedOrders', 'Confirmed Orders'),
      value: confirmedOrders,
      Icon: HiOutlineCheckCircle,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      sub: t('dashboard.successfullyCompleted', 'Successfully completed'),
    },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5 flex-shrink-0">
        <Image
          src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg"
          height={36} width={36} alt="Logo"
          className="rounded-full ring-2 ring-[#bd8b31]/30"
        />
        <div className="min-w-0">
          <p className="text-white font-black text-sm leading-tight">Muhira Updates</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">{t('dashboard.adminPanel', 'Admin Panel')}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.15em] px-3 mb-2">
          {t('dashboard.dashboard', 'Dashboard')}
        </p>
        <div className="space-y-0.5">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setSection(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                section === id
                  ? "bg-[#bd8b31] text-white shadow-lg shadow-[#bd8b31]/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="text-lg flex-shrink-0" />
              {label}
              {id === "orders" && pendingOrders > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {pendingOrders}
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.15em] px-3 mb-2 mt-6">
          {t('dashboard.products', 'Products')}
        </p>
        <div className="space-y-0.5">
          {PRODUCT_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-150"
            >
              <Icon className="text-lg flex-shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Footer */}
      <div className="px-4 py-4 border-t border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-[#bd8b31] flex items-center justify-center text-white text-xs font-black flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold truncate leading-tight">
              {session.user.name || "Admin"}
            </p>
            <p className="text-gray-500 text-[10px] truncate">{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-2 text-gray-500 hover:text-red-400 text-xs font-semibold transition-colors py-1"
        >
          <HiOutlineLogout className="text-sm" />
          {t('dashboard.signOut', 'Sign out')}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-60 xl:w-64 bg-[#0f172a] flex-col h-screen flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 bg-[#0f172a] flex flex-col h-screen z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-6 lg:px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <HiOutlineMenu className="text-xl" />
            </button>
            <div>
              <h1 className="text-lg font-black text-gray-900 capitalize leading-tight">
                {section === "overview" ? t('dashboard.overview', 'Overview') : t('dashboard.orders', 'Orders')}
              </h1>
              <p className="text-gray-400 text-[11px] font-medium hidden sm:block">{today}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-gray-900">{session.user.name || "Admin"}</p>
              <p className="text-[10px] text-gray-400">{session.user.email}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#bd8b31] flex items-center justify-center text-white text-sm font-black ring-2 ring-[#bd8b31]/20">
              {initials}
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {section === "overview" && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mb-8">
                {stats.map((s) => (
                  <StatCard key={s.title} {...s} />
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    {t('dashboard.salesOverview', 'Sales Overview')}
                  </h2>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    {t('dashboard.thisYear', 'This Year')}
                  </span>
                </div>
                <DashboardChart />
              </div>

              {/* Recent Orders preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    {t('dashboard.recentOrders', 'Recent Orders')}
                  </h2>
                  <button
                    onClick={() => setSection("orders")}
                    className="text-xs text-[#bd8b31] font-bold hover:underline"
                  >
                    {t('dashboard.viewAll', 'View all')} →
                  </button>
                </div>
                <OrdersDashboard embedded />
              </div>
            </>
          )}

          {section === "orders" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                  {t('dashboard.allOrders', 'All Orders')}
                </h2>
              </div>
              <OrdersDashboard embedded />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardHome;
