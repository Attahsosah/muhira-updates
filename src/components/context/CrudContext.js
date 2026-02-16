"use client";

import { createContext, useState } from "react";

// --- Existing Contexts ---
export const MakeContext = createContext();
export const ModelContext = createContext();
export const PriceContext = createContext();
export const TypeContext = createContext();
export const MileageContext = createContext();
export const YearContext = createContext();
export const TransmissionContext = createContext();
export const ModalImagesContext = createContext();
export const OpenContext = createContext();
export const DeleteContext = createContext();
export const DeleteIdContext = createContext();
export const DescriptionContext = createContext();
export const ElectronicsOpenContext = createContext();
export const ElectronicsImagesContext = createContext();
export const DoneContext = createContext();

// --- Electronics Fields (Single Item State) ---
export const ElectronicsIdContext = createContext();
export const ElectronicsTitleContext = createContext();
export const ElectronicsDescriptionContext = createContext();
export const ElectronicsDiscountContext = createContext();
export const ElectronicsFeaturedContext = createContext();
export const ElectronicsOfferContext = createContext();
export const ElectronicsPriceContext = createContext();
export const ElectronicsWasContext = createContext();
export const ElectronicsSubcategoryContext = createContext();
export const ElectronicsSpecsContext = createContext(); 
export const DeleteTypeContext = createContext();
export const DeleteNameContext = createContext();
export const TaskContext = createContext();

// --- NEW: Electronics Data Array ---
export const ElectronicsDataContext = createContext();

// --- NEW: Toast Context ---
export const ToastContext = createContext();

export const CrudProvider = ({ children }) => {
  // UI State
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("item");
  const [electronicsOpen, setElectronicsOpen] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [done, setDone] = useState(false);
  const [task, setTask] = useState("create");

  // Car State
  const [make, setMake] = useState("");
  const [modalModel, setModalModel] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalYear, setModalYear] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalMileage, setModalMileage] = useState("");
  const [modalTransmission, setModalTransmission] = useState("");
  const [modalImages, setModalImages] = useState([]);
  const [modalDescription, setModalDescription] = useState("");

  // Electronics Individual Product State
  const [electronicsId, setElectronicsId] = useState("");
  const [electronicsTitle, setElectronicsTitle] = useState("");
  const [electronicsDescription, setElectronicsDescription] = useState("");
  const [electronicsDiscount, setElectronicsDiscount] = useState("");
  const [electronicsFeatured, setElectronicsFeatured] = useState(true);
  const [electronicsOffer, setElectronicsOffer] = useState(true);
  const [electronicsPrice, setElectronicsPrice] = useState("");
  const [electronicsWas, setElectronicsWas] = useState("");
  const [electronicsImages, setElectronicsImages] = useState([]);
  const [electronicsSubcategory, setElectronicsSubcategory] = useState("");
  const [electronicsSpecs, setElectronicsSpecs] = useState([{ key: "", value: "" }]);

  // Electronics List State
  const [electronicsData, setElectronicsData] = useState([]);

  // --- Toast Logic ---
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, triggerToast }}>
      <MakeContext.Provider value={[make, setMake]}>
      <ModelContext.Provider value={[modalModel, setModalModel]}>
      <PriceContext.Provider value={[modalPrice, setModalPrice]}>
      <TypeContext.Provider value={[modalType, setModalType]}>
      <MileageContext.Provider value={[modalMileage, setModalMileage]}>
      <TransmissionContext.Provider value={[modalTransmission, setModalTransmission]}>
      <ModalImagesContext.Provider value={[modalImages, setModalImages]}>
      <OpenContext.Provider value={[open, setOpen]}>
      <YearContext.Provider value={[modalYear, setModalYear]}>
      <DeleteContext.Provider value={[deleteOpen, setDeleteOpen]}>
      <DeleteIdContext.Provider value={[deleteId, setDeleteId]}>
      <DescriptionContext.Provider value={[modalDescription, setModalDescription]}>
      <ElectronicsOpenContext.Provider value={[electronicsOpen, setElectronicsOpen]}>
      <ElectronicsDescriptionContext.Provider value={[electronicsDescription, setElectronicsDescription]}>
      <ElectronicsDiscountContext.Provider value={[electronicsDiscount, setElectronicsDiscount]}>
      <ElectronicsFeaturedContext.Provider value={[electronicsFeatured, setElectronicsFeatured]}>
      <ElectronicsOfferContext.Provider value={[electronicsOffer, setElectronicsOffer]}>
      <ElectronicsPriceContext.Provider value={[electronicsPrice, setElectronicsPrice]}>
      <ElectronicsWasContext.Provider value={[electronicsWas, setElectronicsWas]}>
      <ElectronicsTitleContext.Provider value={[electronicsTitle, setElectronicsTitle]}>
      <ElectronicsImagesContext.Provider value={[electronicsImages, setElectronicsImages]}>
      <ElectronicsSubcategoryContext.Provider value={[electronicsSubcategory, setElectronicsSubcategory]}>
      <ElectronicsSpecsContext.Provider value={[electronicsSpecs, setElectronicsSpecs]}>
      <ElectronicsIdContext.Provider value={[electronicsId, setElectronicsId]}>
      <ElectronicsDataContext.Provider value={[electronicsData, setElectronicsData]}>
      <DeleteTypeContext.Provider value={[deleteType, setDeleteType]}>
      <DeleteNameContext.Provider value={[deleteName, setDeleteName]}>
      <TaskContext.Provider value={[task, setTask]}>
      <DoneContext.Provider value={[done, setDone]}>
          {children}
      </DoneContext.Provider>
      </TaskContext.Provider>
      </DeleteNameContext.Provider>
      </DeleteTypeContext.Provider>
      </ElectronicsDataContext.Provider>
      </ElectronicsIdContext.Provider>
      </ElectronicsSpecsContext.Provider>
      </ElectronicsSubcategoryContext.Provider>
      </ElectronicsImagesContext.Provider>
      </ElectronicsTitleContext.Provider>
      </ElectronicsWasContext.Provider>
      </ElectronicsPriceContext.Provider>
      </ElectronicsOfferContext.Provider>
      </ElectronicsFeaturedContext.Provider>
      </ElectronicsDiscountContext.Provider>
      </ElectronicsDescriptionContext.Provider>
      </ElectronicsOpenContext.Provider>
      </DescriptionContext.Provider>
      </DeleteIdContext.Provider>
      </DeleteContext.Provider>
      </YearContext.Provider>
      </OpenContext.Provider>
      </ModalImagesContext.Provider>
      </TransmissionContext.Provider>
      </MileageContext.Provider>
      </TypeContext.Provider>
      </PriceContext.Provider>
      </ModelContext.Provider>
      </MakeContext.Provider>
    </ToastContext.Provider>
  );
};