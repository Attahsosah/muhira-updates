import { useContext } from "react";
import { SelectedCategoryContext } from "./context/CarCardContext";
import { SelectedTypeContext } from "./context/MiscContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ScrollReveal from "../components/ScrollReveal";
import ElectronicsSubcategories from "./ElectronicsSubcategories";
import HomepageSubList from "./HomepageSubList";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useContext(SelectedCategoryContext);
  const [selectedType, setSelectedType] = useContext(SelectedTypeContext);
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/miscType/${category}`);
  };

  return (
    <div id="categories" className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Electronics */}
          <ScrollReveal>
            <ElectronicsSubcategories />
          </ScrollReveal>

          {/* Advertising Equipment (Accessories) */}
          <ScrollReveal>
            <div className="group relative h-[180px] w-full cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300">
              <Image
                src="https://i.ibb.co/H2Zshyt/pexels-davidguerrero-14999946.jpg"
                alt="Advertising Equipment"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Darker gradient for better text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div onClick={() => handleCategoryClick("accessories")}>
                  <p className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1">
                    Advertising Equipment
                  </p>
                </div>
                
                {/* Dynamic List */}
                <HomepageSubList parentCategory="accessories" />
              </div>
            </div>
          </ScrollReveal>

          {/* Safety Equipment */}
          <ScrollReveal>
            <div className="group relative h-[180px] w-full cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300">
              <Image
                src="https://i.ibb.co/pQ0c3dK/pexels-lokomotywa-744922.jpg"
                alt="Safety Equipment"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div onClick={() => handleCategoryClick("safety")}>
                  <p className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1">
                    Safety Equipment
                  </p>
                </div>

                {/* Dynamic List */}
                <HomepageSubList parentCategory="safety" />
              </div>
            </div>
          </ScrollReveal>

          {/* Website Development */}
          <ScrollReveal>
            <Link href="/dev">
              <div className="relative h-[180px] w-full cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                <Image
                  src="https://i.ibb.co/tJJGx8m/pexels-junior-teixeira-1064069-2047905.jpg"
                  alt="Website Development"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-4 left-4 font-bold text-white uppercase text-sm sm:text-base tracking-widest">
                  Website Development
                </p>
              </div>
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
};

export default Categories;