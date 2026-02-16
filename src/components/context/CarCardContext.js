"use client";
import { createContext, useState } from "react";

export const CardIdContext = createContext();
export const CarDataContext = createContext();
export const FetchedCarsContext = createContext();
export const MakeFilterContext = createContext();
export const ModelFilterContext = createContext();
export const YearFilterContext = createContext();
export const PriceRangeFilterContext = createContext();
export const SearchingContext = createContext();
export const FilteredCarsContext = createContext();
export const TypingContext = createContext();
export const SelectedCategoryContext = createContext();
export const PageLoadedContext = createContext();
export const ElectronicsDataContext = createContext();
export const ModalContext = createContext();
export const ModalDataContext = createContext();
export const ModalIdContext = createContext();
export const ModalColorContext = createContext();
export const CarContext = createContext();
export const FetchCarDataContext = createContext();

export const CarCardProvider = ({ children }) => {
  const [carId, setCarId] = useState(0);
  const [carData, setCarData] = useState({ images: ["src12", "src2"] });

  const [cars, setCars] = useState([]);

  // Filters

  const [makeFilter, setMakeFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searching, setSearching] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [typing, setTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("cars");
  const [loading, setLoading] = useState(false);

  // Preloader Loading state
  const [loaded, setLoaded] = useState(false);
  const [electronics, setElectronics] = useState([]);

  // Function to filter cars based on the user that posted them

  // Modal Context for Create Read and Update functionality

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalId, setModalId] = useState("");
  const [car, setCar] = useState({});
  const [modalColor, setModalColor] = useState("");

  
  const fetchCarsData = async () => {
    const carsSnapshot = await getDocs(collection(db, 'cars'));
    const carsData = carsSnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      setCarId(id);
      return { id, ...data };
    });

    setCars(carsData);
    setLoading(false);
    console.log("Fetched data", cars)
  };


  const fetchCars = {
    fetchCarsData,
    cars,
    loading
  }


  return (
    <CardIdContext.Provider value={[carId, setCarId]}>
      <CarDataContext.Provider value={[carData, setCarData]}>
        <FetchedCarsContext.Provider value={[cars, setCars]}>
          <MakeFilterContext.Provider value={[makeFilter, setMakeFilter]}>
            <ModelFilterContext.Provider value={[modelFilter, setModelFilter]}>
              <YearFilterContext.Provider value={[yearFilter, setYearFilter]}>
                <PriceRangeFilterContext.Provider
                  value={[priceRange, setPriceRange]}
                >
                  <SearchingContext.Provider value={[searching, setSearching]}>
                    <FilteredCarsContext.Provider
                      value={[filteredCars, setFilteredCars]}
                    >
                      <TypingContext.Provider value={[typing, setTyping]}>
                        <SelectedCategoryContext.Provider
                          value={[selectedCategory, setSelectedCategory]}
                        >
                          <PageLoadedContext.Provider
                            value={[loaded, setLoaded]}
                          >
                            <ElectronicsDataContext.Provider
                              value={[electronics, setElectronics]}
                            >
                              <ModalContext.Provider
                                value={[modalOpen, setModalOpen]}
                              >
                                <ModalDataContext.Provider
                                  value={[modalData, setModalData]}
                                >
                                  <ModalIdContext.Provider
                                    value={[modalId, setModalId]}
                                  >
                                    <CarContext.Provider value={[car, setCar]}>
                                      <ModalColorContext.Provider
                                        value={[modalColor, setModalColor]}
                                      >
                                        <FetchCarDataContext.Provider value={fetchCars}>
                                          {children}

                                        </FetchCarDataContext.Provider>
                                      </ModalColorContext.Provider>
                                    </CarContext.Provider>
                                  </ModalIdContext.Provider>
                                </ModalDataContext.Provider>
                              </ModalContext.Provider>
                            </ElectronicsDataContext.Provider>
                          </PageLoadedContext.Provider>
                        </SelectedCategoryContext.Provider>
                      </TypingContext.Provider>
                    </FilteredCarsContext.Provider>
                  </SearchingContext.Provider>
                </PriceRangeFilterContext.Provider>
              </YearFilterContext.Provider>
            </ModelFilterContext.Provider>
          </MakeFilterContext.Provider>
        </FetchedCarsContext.Provider>
      </CarDataContext.Provider>
    </CardIdContext.Provider>
  );
};
