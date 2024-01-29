import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storages } from "..";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function updateBanner(banner: any, uid: any) {
  let result = null;
  let error = null;

  try {
    const storageRef = ref(storages, `banners/${uid}/${banner.name}`);
    await uploadBytes(storageRef, banner, {});
    const downloadURL = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // delete old banner
      const oldBanner = docSnap.data()?.banner;
      if (oldBanner) {
        const oldBannerRef = ref(storages, oldBanner);
        await deleteObject(oldBannerRef);
      }

      // update new banner
      await updateDoc(userDocRef, {
        banner: downloadURL,
      });
    } else {
      await updateDoc(userDocRef, {
        banner: downloadURL,
      });
    }

    result = downloadURL;
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function updateAvatar(avatar: any, uid: any) {
  let result = null;
  let error = null;

  try {
    const storageRef = ref(storages, `avatar/${uid}/${avatar.name}`);
    await uploadBytes(storageRef, avatar, {});
    const downloadURL = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // delete old avatar
      const oldAvatar = docSnap.data()?.avatar;
      if (oldAvatar) {
        const oldAvatarRef = ref(storages, oldAvatar);
        await deleteObject(oldAvatarRef);
      }

      // update new avatar
      await updateDoc(userDocRef, {
        avatar: downloadURL,
      });
    } else {
      await updateDoc(userDocRef, {
        avatar: downloadURL,
      });
    }

    result = downloadURL;
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function updateInfo(info: any, uid: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const updatedFields = {
        ...(info.displayName && { displayName: info.displayName }),
        ...(info.introduction && { introduction: info.introduction }),
        ...(info.tags && { tags: info.tags }),
      };

      await updateDoc(userDocRef, updatedFields);

      result = updatedFields;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
