import Navbar from "../components/Navbar";
import ProcurementSection from "../components/ProcurementSection";
import Footer from "../components/Footer";

export default function ProcurementPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16"> {/* Add padding for the sticky navbar */}
        <ProcurementSection />
      </div>
      <Footer />
    </main>
  );
}