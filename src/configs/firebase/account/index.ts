import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storages } from "..";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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

export async function likeProfile(uid_likes: any, uid_profile: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid_profile);
    const docSnap = await getDoc(userDocRef);


    if (docSnap.exists()) {
      // add uid_likes to likes
      const likes = docSnap.data()?.likes;

      if (likes) {
        await updateDoc(userDocRef, {
          likes: [...likes, uid_likes],
        });
      } else {
        await updateDoc(userDocRef, {
          likes: [uid_likes],
        });
      }

      // add notification
      const timeLike = new Date().getTime();
      const notification = docSnap.data()?.notification;

      if (notification) {
        await updateDoc(userDocRef, {
          notification: [...notification, {uid: uid_likes, time: timeLike, content: "Đã thích hồ sơ của bạn"}],
        });
      } else {
        await updateDoc(userDocRef, {
          notification: [{uid: uid_likes, time: timeLike,  content: "Đã thích hồ sơ của bạn"}],
        });
      }
      

      result = true;
    }

  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function unlikeProfile(uid_likes: any, uid_profile: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid_profile);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // remove uid_likes from likes
      const likes = docSnap.data()?.likes;

      if (likes) {
        const newLikes = likes.filter((item: any) => item !== uid_likes);

        await updateDoc(userDocRef, {
          likes: newLikes,
        });
      }

      // remove notification
      const notification = docSnap.data()?.notification;

      if (notification) {
        const newNotification = notification.filter((item: any) => item.uid !== uid_likes);

        await updateDoc(userDocRef, {
          notification: newNotification,
        });
      }

      result = true;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function createProfile(uid: any, kindProfile: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      await updateDoc(userDocRef, {
        kindProfile: kindProfile,
      });

      result = true;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getNotification(uid: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const notice = docSnap.data()?.notification;

      if(notice){
        const data = [];

        for (let d of notice) {
          const userDocRef = doc(db, "users", d.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const user = docSnap.data();
            data.push({
              uid: d.uid,
              time: d.time,
              content: d.content,
              avatar: user?.avatar,
              displayName: user?.displayName,
            });
          }
        }

        result = data;
      }

    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function deleteNotification(uid: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      await updateDoc(userDocRef, {
        notification: [],
      });

      result = true;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function createDonate(uid_profile: any, title: string,description: string, imageQr: any) {
  let result = null;
  let error = null;

  try {
    const storageRef = ref(storages, `donate/${uid_profile}/${imageQr.name}`);
    await uploadBytes(storageRef, imageQr, {});
    const downloadURL = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "users", uid_profile);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {

      const createdAt = new Date().getTime();
      
      await updateDoc(userDocRef, {
        donate: {title: title, description: description, imageQr: downloadURL, status: "active", createdAt: createdAt},
      })

      result = {
        title: title,
        description: description,
        imageQr: downloadURL,
        status: "active",
        createdAt: createdAt
      };
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}



export async function updateDonate(uid_profile: any, old_image: any, title: string,description: string, imageQr: any, status: boolean, createdAt: any) {
  let result = null;
  let error = null;

  try {
   if(imageQr){
    const storageRef = ref(storages, `donate/${uid_profile}/${imageQr.name}`);
    await uploadBytes(storageRef, imageQr, {});
    const downloadURL = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "users", uid_profile);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {

      // delete old imageQr
      const oldImageQr = docSnap.data()?.donate?.imageQr;
      if (oldImageQr) {
        const oldImageQrRef = ref(storages, oldImageQr);
        await deleteObject(oldImageQrRef);
      }

      const UpdatedAt = new Date().getTime();

      // Keep stable createdAt
      
      await updateDoc(userDocRef, {
        donate: {title: title, description: description, imageQr: downloadURL, status: status, updatedAt: UpdatedAt, createdAt: createdAt},
      })

      result = {
        title: title,
        description: description,
        imageQr: downloadURL,
        status: status,
        updatedAt: UpdatedAt
      };
    }
   } else {
    const userDocRef = doc(db, "users", uid_profile);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {

      const UpdatedAt = new Date().getTime();
      
      await updateDoc(userDocRef, {
        donate: {title: title, description: description, status: status, updatedAt: UpdatedAt,  createdAt: createdAt , imageQr: old_image},
      })

      result = {
        title: title,
        description: description,
        status: status,
        updatedAt: UpdatedAt,
        createdAt: createdAt,
        imageQr: old_image
      };
    }
   }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addNetwork(uid: any, label: any, link: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const networks = docSnap.data()?.networks;

      const createdAt = new Date().getTime();

      if (networks) {
        await updateDoc(userDocRef, {
          networks: [...networks, {uid_creator: uid, label: label, link: link, createdAt: createdAt , uuid: uuidv4()}],
        });
      } else {
        await updateDoc(userDocRef, {
          networks: [{uid_creator: uid, label: label, link: link, createdAt: createdAt , uuid: uuidv4()}],
        });
      }

      result = {uid_creator: uid, label: label, link: link, createdAt: createdAt , uuid: uuidv4()};
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function deleteNetwork(uid: any, uuid: any) {
  let result = null;
  let error = null;

  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const networks = docSnap.data()?.networks;

      if (networks) {
        const newNetworks = networks.filter((item: any) => item.uuid !== uuid);

        await updateDoc(userDocRef, {
          networks: newNetworks,
        });
      }

      result = true;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}