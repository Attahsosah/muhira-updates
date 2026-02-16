import { SnackbarContent } from "@mui/material";
import { createContext, useState } from "react";

export const MiscTitleContext = createContext();
export const MiscDescriptionContext = createContext();
export const MiscDiscountContext = createContext();
export const MiscFeaturedContext = createContext();
export const MiscOfferContext = createContext();
export const MiscPriceContext = createContext();
export const MiscWasContext = createContext();
export const DeleteTypeContext = createContext();
export const DeleteNameContext = createContext();
export const TaskContext = createContext();
export const MiscOpenContext = createContext();
export const MiscImagesContext = createContext();
export const MiscIdContext = createContext();
export const MiscTypeContext = createContext();
export const MiscSubcategoryContext = createContext(); // Added
export const SelectedTypeContext = createContext();
export const SnackBarContext = createContext();
export const SubmittedContext = createContext();

// Newsletter state
export const NewsletterOpenContext = createContext();

export const MiscProvider = ({ children }) => {
  const [miscTitle, setmiscTitle] = useState("");
  const [miscDescription, setmiscDescription] = useState("");
  const [miscDiscount, setmiscDiscount] = useState("");
  const [miscFeatured, setmiscFeatured] = useState(true);
  const [miscOffer, setmiscOffer] = useState(true);
  const [miscPrice, setmiscPrice] = useState("");
  const [miscWas, setmiscWas] = useState("");
  const [miscImages, setmiscImages] = useState([]);
  const [miscOpen, setmiscOpen] = useState(false);
  const [miscId, setmiscId] = useState("");
  const [miscType, setMiscType] = useState("safety");
  const [miscSubcategory, setMiscSubcategory] = useState(""); // Added

  const [task, setTask] = useState("create");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("item");
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <MiscOpenContext.Provider value={[miscOpen, setmiscOpen]}>
      <MiscDescriptionContext.Provider value={[miscDescription, setmiscDescription]}>
        <MiscDiscountContext.Provider value={[miscDiscount, setmiscDiscount]}>
          <MiscFeaturedContext.Provider value={[miscFeatured, setmiscFeatured]}>
            <MiscOfferContext.Provider value={[miscOffer, setmiscOffer]}>
              <MiscPriceContext.Provider value={[miscPrice, setmiscPrice]}>
                <MiscWasContext.Provider value={[miscWas, setmiscWas]}>
                  <MiscTitleContext.Provider value={[miscTitle, setmiscTitle]}>
                    <MiscImagesContext.Provider value={[miscImages, setmiscImages]}>
                      <DeleteTypeContext.Provider value={[deleteType, setDeleteType]}>
                        <DeleteNameContext.Provider value={[deleteName, setDeleteName]}>
                          <TaskContext.Provider value={[task, setTask]}>
                            <MiscIdContext.Provider value={[miscId, setmiscId]}>
                              <MiscTypeContext.Provider value={[miscType, setMiscType]}>
                                <MiscSubcategoryContext.Provider value={[miscSubcategory, setMiscSubcategory]}>
                                  <SelectedTypeContext.Provider value={[selectedType, setSelectedType]}>
                                    <NewsletterOpenContext.Provider value={[open, setOpen]}>
                                      <SnackBarContext.Provider value={[snackbarOpen, setSnackbarOpen]}>
                                        <SubmittedContext.Provider value={[submitted, setSubmitted]}>
                                          {children}
                                        </SubmittedContext.Provider>
                                      </SnackBarContext.Provider>
                                    </NewsletterOpenContext.Provider>
                                  </SelectedTypeContext.Provider>
                                </MiscSubcategoryContext.Provider>
                              </MiscTypeContext.Provider>
                            </MiscIdContext.Provider>
                          </TaskContext.Provider>
                        </DeleteNameContext.Provider>
                      </DeleteTypeContext.Provider>
                    </MiscImagesContext.Provider>
                  </MiscTitleContext.Provider>
                </MiscWasContext.Provider>
              </MiscPriceContext.Provider>
            </MiscOfferContext.Provider>
          </MiscFeaturedContext.Provider>
        </MiscDiscountContext.Provider>
      </MiscDescriptionContext.Provider>
    </MiscOpenContext.Provider>
  );
};