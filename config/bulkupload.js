import { collection, doc, setDoc } from "firebase/firestore";
import { restaurants } from "../store/restaurants";
import { db } from "./firebaseConfig";

const restaurantData = restaurants;

const uploadData = async () => {
  try {
    for (let i = 0; i < restaurantData.length; i++) {
      const restaurnt = restaurantData[i];
      const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
      await setDoc(docRef, restaurnt);
    }
    console.log("Data uploaded");
  } catch (error) {
    console.log("Error uploading data", error);
  }
};

export default uploadData;
