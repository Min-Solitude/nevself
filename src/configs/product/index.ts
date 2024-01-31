import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storages } from "../firebase";
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";

export async function createProductAccount(uid: string,name: string, image: any, description: string, link: string){
    let result = null;
  let error = null;

  try {
    const storageRef = ref(storages, `products/${uid}/${image.name}`);
    await uploadBytes(storageRef, image, {});
    const downloadURL = await getDownloadURL(storageRef);

    const createAt = Date.now();

    const productDocRef = doc(db, "products", uid);
    const docSnap = await getDoc(productDocRef);

    const getDocProduct = await getDoc(productDocRef)

    const products = getDocProduct.data()?.products || [];


    const newProduct = {
            name: name,
            status: "active",
            image: downloadURL,
            description: description,
            link: link,
            uid_creator: uid,
            createdAt: createAt,
    }

    products.push(newProduct);    
        
    if (docSnap.exists()) {
        await updateDoc(productDocRef, {
          products: products,
          amount: increment(1),
        });
      } else {
        await setDoc(productDocRef, {
          products: products,
          creator: uid,
          amount: 1,
        });
      }

    result = newProduct;
  } catch (e) {
    error = e;
  }

    return { result, error };
}

export async function getProductsAccount(uid: string){
    let result = null;
  let error = null;

  try {
    const productDocRef = doc(db, "products", uid);
    const docSnap = await getDoc(productDocRef);

    if (docSnap.exists()) {
        result = docSnap.data();
      } else {
        result = null;
      }
  } catch (e) {
    error = e;
  }

    return { result, error };
}