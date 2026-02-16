import { db } from "./firestore";
import { doc, getDoc } from "firebase/firestore";

export const getProductById = async (productId) => {
  const productRef = doc(db, "cars", productId);
  const productSnapshot = await getDoc(productRef);

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } else {
    return null; // Handle the case where the product doesn't exist
  }
};

export const getElectronicById = async (electronicsId) => {
  const electronicsRef = doc(db, "electronics", electronicsId);
  const productSnapshot = await getDoc(electronicsRef);

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } else {
    return null; // Handle the case where the product doesn't exist
  }
};

export const getMiscById = async (miscId) => {
  const miscRef = doc(db, "misc", miscId);
  const productSnapshot = await getDoc(miscRef);

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } else {
    return null; // Handle the case where the product doesn't exist
  }
};

export const getHouseById = async (houseId) => {
  const houseRef = doc(db, "houses", houseId);
  const productSnapshot = await getDoc(houseRef);

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } else {
    return null; // Handle the case where the product doesn't exist
  }
};
