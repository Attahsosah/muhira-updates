import { createContext, useState } from "react";
import {
  DeleteContext,
  DeleteIdContext,
  DeleteNameContext,
  DeleteTypeContext,
} from "./CrudContext";

export const TitleContext = createContext();
export const TypeContext = createContext();
export const PriceContext = createContext();
export const RoomsContext = createContext();
export const BathroomsContext = createContext();
export const DescriptionContext = createContext();

export const RealEstateOpenContext = createContext();
export const RealEstateImagesContext = createContext();
export const RealEstateIdContext = createContext();
export const TaskContext = createContext();

export const RealEstateProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");

  const [realEstateImages, setrealEstateImages] = useState([]);
  const [realEstateOpen, setrealEstateOpen] = useState(false);
  const [realEstateId, setrealEstateId] = useState("");

  const [task, setTask] = useState("create");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("item");
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");

  return (
    <TitleContext.Provider value={[title, setTitle]}>
      <TypeContext.Provider value={[type, setType]}>
        <PriceContext.Provider value={[price, setPrice]}>
          <RoomsContext.Provider value={[rooms, setRooms]}>
            <BathroomsContext.Provider value={[bathrooms, setBathrooms]}>
              <RealEstateOpenContext.Provider
                value={[realEstateOpen, setrealEstateOpen]}
              >
                <RealEstateIdContext.Provider
                  value={[realEstateId, setrealEstateId]}
                >
                  <RealEstateImagesContext.Provider
                    value={[realEstateImages, setrealEstateImages]}
                  >
                    <DeleteContext.Provider value={[deleteOpen, setDeleteOpen]}>
                      <DeleteTypeContext.Provider
                        value={[deleteType, setDeleteType]}
                      >
                        <DeleteNameContext.Provider
                          value={[deleteName, setDeleteName]}
                        >
                          <DeleteIdContext.Provider
                            value={[deleteId, setDeleteId]}
                          >
                            <TaskContext.Provider value={[task, setTask]}>
                              <DescriptionContext.Provider
                                value={[description, setDescription]}
                              >
                                {children}
                              </DescriptionContext.Provider>
                            </TaskContext.Provider>
                          </DeleteIdContext.Provider>
                        </DeleteNameContext.Provider>
                      </DeleteTypeContext.Provider>
                    </DeleteContext.Provider>
                  </RealEstateImagesContext.Provider>
                </RealEstateIdContext.Provider>
              </RealEstateOpenContext.Provider>
            </BathroomsContext.Provider>
          </RoomsContext.Provider>
        </PriceContext.Provider>
      </TypeContext.Provider>
    </TitleContext.Provider>
  );
};
