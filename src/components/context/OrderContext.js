import { createContext, useState } from "react";

export const OrderDetailsContext = createContext();
export const AdminOpenContext = createContext();
export const SectionModalContext = createContext();
export const SectionDataContext = createContext();
export const SectionContentContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState();
  const [sectionData, setSectionData] = useState({});
  const [sectionContent, setSectionContent] = useState("");
  return (
    <OrderDetailsContext.Provider value={[orders, setOrders]}>
      <AdminOpenContext.Provider value={[adminOpen, setAdminOpen]}>
        <SectionModalContext.Provider
          value={[sectionModalOpen, setSectionModalOpen]}
        >
          <SectionDataContext.Provider value={[sectionData, setSectionData]}>
            <SectionContentContext.Provider
              value={[sectionContent, sectionContent]}
            >
              {children}
            </SectionContentContext.Provider>
          </SectionDataContext.Provider>
        </SectionModalContext.Provider>
      </AdminOpenContext.Provider>
    </OrderDetailsContext.Provider>
  );
};
