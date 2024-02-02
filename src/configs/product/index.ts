import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storages } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

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
            uuid: uuidv4(),
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
          uuid: uuidv4(),
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

export async function deleteProductByUuid(uid: string, uuid: string){
    let result = null;
  let error = null;

  try {
    const productDocRef = doc(db, "products", uid);
    const docSnap = await getDoc(productDocRef);

    if (docSnap.exists()) {
        const getDocProduct = await getDoc(productDocRef)

        const products = getDocProduct.data()?.products || [];

        const newProducts = products.filter((product: any) => product.uuid !== uuid);

        await updateDoc(productDocRef, {
            products: newProducts,
            amount: increment(-1),
          });

        result = newProducts;
        
      } else {
        result = null;
      }
  } catch (e) {
    error = e;
  }

    return { result, error };
}

export async function getProductsByUuid(uid: string, uuid: string){
    let result = null;
  let error = null;

  try {
    const productDocRef = doc(db, "products", uid);
    const docSnap = await getDoc(productDocRef);

    if (docSnap.exists()) {
        const getDocProduct = await getDoc(productDocRef)

        const products = getDocProduct.data()?.products || [];

        const newProducts = products.filter((product: any) => product.uuid === uuid);

        result = newProducts;
        
      } else {
        result = null;
      }
  } catch (e) {
    error = e;
  }

    return { result, error };
}

export async function updateProductByUuid(uid: string, uuid: string, name: string, image: any, description: string, link: string, imageOld: any){
    let result = null;
  let error = null;

  try {

    let downloadURL = null;

    if(image){
      const storageRef = ref(storages, `products/${uid}/${image.name}`);
    await uploadBytes(storageRef, image, {});
     downloadURL = await getDownloadURL(storageRef);
    }else{
      downloadURL = imageOld;
    }

    const productDocRef = doc(db, "products", uid);
    const docSnap = await getDoc(productDocRef);

    if (docSnap.exists()) {
        // delete old image
       if(image){
        const oldImage = docSnap.data()?.image;
        if(oldImage){
          const oldImageRef = ref(storages, oldImage);
          await deleteObject(oldImageRef);
        }
       }

        const getDocProduct = await getDoc(productDocRef)

        const products = getDocProduct.data()?.products || [];

        const newProducts = products.filter((product: any) => product.uuid !== uuid);

        const newProduct = {
            name: name,
            status: "active",
            image: downloadURL,
            description: description,
            link: link,
            uid_creator: uid,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            uuid: uuid 
    }

        newProducts.push(newProduct);

        await updateDoc(productDocRef, {
            products: newProducts,
            amount: increment(1),
          });

        result = newProducts;
        
      } else {
        result = null;
      }
  } catch (e) {
    error = e;
  }

    return { result, error };
}

export async function likeProductProfile(uid_liker: any, uuid_product: any, uid_creator: any , name: any){
    let result = null;
  let error = null;

  try {
    const productDocRef = doc(db, "products", uid_creator);
    const docSnap = await getDoc(productDocRef);

    const userDocRef = doc(db, "users", uid_creator);
    const docSnapUser = await getDoc(userDocRef);

    if (docSnap.exists()) {
        const getDocProduct = await getDoc(productDocRef)

        const products = getDocProduct.data()?.products || [];

        const newProducts = products.map((product: any) => {
            if(product.uuid === uuid_product){
                const likes = product.likes || [];
                const index = likes.indexOf(uid_liker);
                if(index === -1){
                    likes.push(uid_liker);
                }else{
                    likes.splice(index, 1);
                }
                return {
                    ...product,
                    likes: likes
                }
            }else{
                return product;
            }
        });

        await updateDoc(productDocRef, {
            products: newProducts,
          });

        // add notification
        const timeLike = new Date().getTime();
        const notifications = docSnapUser.data()?.notification || [];

        notifications.push({
            uid: uid_liker,
            content: `Đã thì sản phẩm ${name} của bạn`,
            time: timeLike
        });

        await updateDoc(userDocRef, {
            notification: notifications,
          });

        result = newProducts;
        
      } else {
        result = null;
      }
  } catch (e) {
    error = e;
  }

    return { result, error };
}


export async function unlikeProductAccount(uid_liker: any, uuid_product: any, uid_creator: any){
    let result = null;
  let error = null;

  try {
    const productDocRef = doc(db, "products", uid_creator);
    const docSnap = await getDoc(productDocRef);

    if (docSnap.exists()) {
        const getDocProduct = await getDoc(productDocRef)

        const products = getDocProduct.data()?.products || [];

        const newProducts = products.map((product: any) => {
            if(product.uuid === uuid_product){
                const likes = product.likes || [];
                const index = likes.indexOf(uid_liker);
                if(index !== -1){
                    likes.splice(index, 1);
                }
                return {
                    ...product,
                    likes: likes
                }
            }else{
                return product;
            }
        });

        await updateDoc(productDocRef, {
            products: newProducts,
          });

        result = newProducts;
        
      } else {
        result = null;
      }
  } catch (e) {
    error = e;
  }

    return { result, error };
}