import { auth, db, provider } from "@/configs/firebase";
import {
  createAccountToCollection,
  createrAccount,
  getAccountByUid,
  login,
} from "@/configs/firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthState, HagTag } from "./auth.type";
import { deleteCookie, setCookie } from "cookies-next";
import {
  addNetwork,
  createDonate,
  createInformation,
  createProfile,
  deleteNetwork,
  deleteNotification,
  getNotification,
  likeProfile,
  unlikeProfile,
  updateAvatar,
  updateBanner,
  updateDonate,
  updateInfo,
  updateInformation,
  watchNotice,
} from "@/configs/firebase/account";
import { ProductAction } from "../product/product.reducer";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initialState: AuthState = {
  account: null,
  loading: false,
  profile: null,
};

export const registerAccount = createAsyncThunk(
  "auth/registerAccountByEmailAndPassword",
  async (payload: {
    email: string;
    password: string;
    purpose: string | null;
    phoneNumber: string;
  }) => {
    const registerUser = await createrAccount(
      `${payload.email}@gmail.com`,
      payload.password
    );

    if (registerUser?.result?.user?.uid) {
      const addUserToCollection = await createAccountToCollection(
        payload.email,
        payload.password,
        payload.purpose,
        payload.phoneNumber,
        registerUser.result.user.uid
      );

      // Remove session storage
      sessionStorage.removeItem("purpose");
      sessionStorage.removeItem("phoneNumber");
      sessionStorage.removeItem("rules");
      sessionStorage.removeItem("step");

      return addUserToCollection?.result;
    }

    return null;
  }
);

export const registerAccountByGoogle = createAsyncThunk(
  "auth/registerAccountByGoogle",
  async () => {
    try {
      const user = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, "users", user.user?.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setCookie("access_token", (user as any)?.user?.accessToken, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        return docSnap.data();
      } else {
        await setDoc(userDocRef, {
          username: user.user?.displayName,
          purpose: null,
          phoneNumber: null,
          uid: user.user?.uid,
          role: "user",
          status: "active",
          loginBy: "google",
          avatar: user.user?.photoURL,
          email: user.user?.email,
        });

        setCookie("access_token", (user as any)?.user?.accessToken, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        return {
          email: user.user?.displayName,
          purpose: null,
          phoneNumber: null,
          uid: user.user?.uid,
          role: "user",
          status: "active",
          loginBy: "google",
          avatar: user.user?.photoURL,
          username: user.user?.displayName,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginAccount = createAsyncThunk(
  "auth/loginAccountByEmailAndPassword",
  async (payload: { username: string; password: string }) => {
    const loginResult = await login(payload.username, payload.password);

    if (loginResult?.result) {
      setCookie(
        "access_token",
        (loginResult as any)?.result?.user?.accessToken,
        {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        }
      );

      const getAccountResult = await getAccountByUid(
        loginResult?.result?.user?.uid
      );

      return getAccountResult?.result;
    }
  }
);

export const updateBannerAccount = createAsyncThunk(
  "auth/updateBannerAccount",
  async (payload: { isBannerUrl: any; uid: any }) => {
    const updateBannerResult = await updateBanner(
      payload.isBannerUrl,
      payload.uid
    );

    return updateBannerResult?.result;
  }
);

export const getProfileAccount = createAsyncThunk(
  "auth/getAccountByUid",
  async (payload: { uid: string }) => {
    const getAccountResult = await getAccountByUid(payload.uid);

    return getAccountResult?.result;
  }
);

export const likeProfileAccount = createAsyncThunk(
  "auth/likeProfileAccount",
  async (payload: { uid_like?: string; uid_profile?: string }) => {
    const likeProfileResult = await likeProfile(
      payload.uid_like,
      payload.uid_profile
    );

    return {
      uid_like: payload.uid_like,
      result: likeProfileResult?.result,
    };
  }
);

export const removeLikeProfileAccount = createAsyncThunk(
  "auth/removeLikeProfileAccount",
  async (payload: { uid_like?: string; uid_profile?: string }) => {
    const likeProfileResult = await unlikeProfile(
      payload.uid_like,
      payload.uid_profile
    );

    return {
      uid_like: payload.uid_like,
      result: likeProfileResult?.result,
    };
  }
);

export const updateAvatarAccount = createAsyncThunk(
  "auth/updateAvatarAccount",
  async (payload: { isAvatarUrl: any; uid: any }) => {
    const updateAvatarResult = await updateAvatar(
      payload.isAvatarUrl,
      payload.uid
    );

    return updateAvatarResult?.result;
  }
);

export const updateInfoAccount = createAsyncThunk(
  "auth/updateInfoAccount",
  async (payload: {
    uid: string | undefined;
    displayName?: any | null;
    introduction?: string | null;
    tags?: HagTag[] | null;
  }) => {
    const updateInfoResult = await updateInfo(
      {
        displayName: payload.displayName,
        introduction: payload.introduction,
        tags: payload.tags,
      },
      payload.uid
    );

    return updateInfoResult?.result;
  }
);

export const createProfileAccount = createAsyncThunk(
  "auth/createProfileAccount",
  async (payload: { uid: string | undefined; kindProfile: string | null }) => {
    const createProfileResult = await createProfile(
      payload.uid,
      payload.kindProfile
    );

    return {
      result: createProfileResult?.result,
      kindProfile: payload.kindProfile,
    };
  }
);

export const getAllNoticeAccount = createAsyncThunk(
  "auth/getAllNoticeAccount",
  async (payload: { uid: string | undefined }) => {
    const getResult = await getNotification(payload.uid);

    return getResult?.result?.reverse();
  }
);

export const deleteNoticeAccount = createAsyncThunk(
  "auth/deleteNoticeAccount",
  async (payload: { uid: string | undefined }) => {
    const deleteResult = await deleteNotification(payload.uid);

    return deleteResult?.result;
  }
);

export const createDonateProfile = createAsyncThunk(
  "auth/createDonateProfile",
  async (payload: {
    uid_profile: any;
    title: any;
    description: any;
    imageQr: any;
  }) => {
    const createDonateProfileResult = await createDonate(
      payload.uid_profile,
      payload.title,
      payload.description,
      payload.imageQr
    );

    return createDonateProfileResult.result;
  }
);

export const updateDonateProfile = createAsyncThunk(
    "auth/updateDonateProfile",
    async (payload: {
        uid_profile: any;
        title: any;
        description: any;
        imageQr: any;
        status: any;
        createdAt: any;
        old_image: any;
    }) => {
       
        const updateDonateProfileResult = await updateDonate(
            payload.uid_profile,
            payload.old_image,
            payload.title,
            payload.description,
            payload.imageQr,
            payload.status,
            payload.createdAt,
        )

        return {
            title: updateDonateProfileResult.result?.title,
            description: updateDonateProfileResult.result?.description,
            imageQr: updateDonateProfileResult.result?.imageQr,
            status: updateDonateProfileResult.result?.status, 
            updatedAt: updateDonateProfileResult.result?.updatedAt,
            createdAt: payload.createdAt
        }
        
    }
    );


    export const addNetworkProfile = createAsyncThunk(
      "auth/addNetwork",
      async (payload: {
        uid: any;
        label: any;
        link: any;
      }) => {
        const addNetworkResult = await addNetwork(
          payload.uid,
          payload.label,
          payload.link
        )

        return addNetworkResult?.result;
      }
    );

    export const deleteNetworkProfile = createAsyncThunk(
      "auth/deleteNetwork",
      async (payload: {
        uid: any;
        uuid: any;
      }) => {
        const deleteNetworkResult = await deleteNetwork(
          payload.uid,
          payload.uuid
        )

        return payload.uuid;
      }
    );

    export const createInfoProfile = createAsyncThunk(
      "auth/createInfoProfile",
      async (payload: {
        uid_profile: any;
        data: {
          story: string;
          skills: string[];
          info: {
            location: string;
            mail: string;
            joinAt: string;
          };
        }
      }) => {
       
        const createInfoProfileResult = await createInformation(
          payload.uid_profile,
          payload.data
        )

        return createInfoProfileResult?.result;
      }
    );

    export const updateInfoProfile = createAsyncThunk(
      "auth/updateInfoProfile",
      async (payload: {
        uid_profile: any;
        data: {
          story: string;
          skills: string[];
          info: {
            location: string;
            mail: string;
            joinAt: string;
          };
        }
      }) => {
       
        const createInfoProfileResult = await updateInformation(
          payload.uid_profile,
          payload.data
        )

        return createInfoProfileResult?.result;
      }
    );

    export const watchNoticeAccount = createAsyncThunk(
      "auth/watchNotice",
      async (payload: {
        uid: any;
        uuid: any;
      }) => {
        const watchNoticeResult = await watchNotice(
          payload.uid,
          payload.uuid
        );        

        return {
          result: watchNoticeResult?.result,
          uuid: payload.uuid
        };
      }
    )

const reducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = null;
      deleteCookie("access_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAccount.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.account = {
          email: action.payload.username,
          purpose: action.payload.purpose,
          phoneNumber: action.payload.phoneNumber,
          uid: action.payload.uid,
          role: action.payload.role,
          status: action.payload.status,
          loginBy: action.payload.loginBy,
        };

        window.location.href = "/login";
      } else {
        toast.error("Đăng ký thất bại");
      }
    });
    builder.addCase(registerAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Đăng ký thất bại");
    });

    builder.addCase(registerAccountByGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAccountByGoogle.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.account = {
          email: action.payload.email,
          avatar: action.payload.avatar,
          displayName: action.payload.username,
          purpose: action.payload.purpose,
          phoneNumber: action.payload.phoneNumber,
          uid: action.payload.uid,
          role: action.payload.role,
          status: action.payload.status,
          loginBy: action.payload.loginBy,
        };
        window.location.href = "/";
      } else {
        toast.error("Đăng ký thất bại");
      }
    });
    builder.addCase(registerAccountByGoogle.rejected, (state) => {
      state.loading = false;
      toast.error("Đăng ký thất bại");
    });

    builder.addCase(loginAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (action.payload) {
        state.account = action.payload;
        window.location.href = "/";
      } else {
        toast.error("Đăng nhập thất bại");
      }
    });

    builder.addCase(updateBannerAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Cập nhật ảnh bìa thất bại");
    });
    builder.addCase(updateBannerAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.account && state.profile) {
        state.account.banner = action.payload;
        state.profile.banner = action.payload;
        toast.success("Cập nhật ảnh bìa thành công");
      } else {
        toast.error("Cập nhật ảnh bìa thất bại");
      }
    });
    builder.addCase(updateBannerAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProfileAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileAccount.fulfilled, (state, action: any) => {
      if (action.payload) {
        state.profile = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(getProfileAccount.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateAvatarAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Cập nhật ảnh đại diện thất bại");
    });
    builder.addCase(updateAvatarAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.account && state.profile) {
        state.account.avatar = action.payload;
        state.profile.avatar = action.payload;
        toast.success("Cập nhật ảnh đại diện thành công");
      } else {
        toast.error("Cập nhật ảnh đại diện thất bại");
      }
    });
    builder.addCase(updateAvatarAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateInfoAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Cập nhật thông tin thất bại");
    });
    builder.addCase(updateInfoAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.account && state.profile) {
        if (action.payload.displayName) {
          state.account.displayName = action.payload.displayName;
          state.profile.displayName = action.payload.displayName;
        }
        if (action.payload.introduction) {
          state.account.introduction = action.payload.introduction;
          state.profile.introduction = action.payload.introduction;
        }
        if (action.payload.tags) {
          state.account.tags = action.payload.tags;
          state.profile.tags = action.payload.tags;
        }

        toast.success("Cập nhật thông tin thành công");
      } else {
        toast.error("Cập nhật thông tin thất bại");
      }
    });
    builder.addCase(updateInfoAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(likeProfileAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Thích thất bại");
    });
    builder.addCase(likeProfileAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile) {
        // push uid_like to likes
        if (action.payload.result) {
          state.profile.likes?.push(action.payload.uid_like);
        }
      } else {
        toast.error("Thích thất bại");
      }
    });
    builder.addCase(likeProfileAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeLikeProfileAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Bỏ thích thất bại");
    });
    builder.addCase(
      removeLikeProfileAccount.fulfilled,
      (state, action: any) => {
        state.loading = false;
        if (state.profile) {
          // remove uid_like to likes
          if (action.payload.result) {
            state.profile.likes = state.profile.likes?.filter(
              (item) => item !== action.payload.uid_like
            );
          }
        } else {
          toast.error("Bỏ thích thất bại");
        }
      }
    );
    builder.addCase(removeLikeProfileAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createProfileAccount.rejected, (state) => {
      state.loading = false;
      toast.error("Tạo profile thất bại");
    });
    builder.addCase(createProfileAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (action.payload.result) {
        if (state.account && state.profile) {
          state.account.kindProfile = action.payload.kindProfile;
          state.profile.kindProfile = action.payload.kindProfile;
          toast.success("Tạo profile thành công");
        }
      } else {
        toast.error("Tạo profile thất bại");
      }
    });
    builder.addCase(createProfileAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllNoticeAccount.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllNoticeAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        state.profile.notifications = action.payload;
        state.account.notifications = action.payload;
      }
    });
    builder.addCase(getAllNoticeAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteNoticeAccount.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteNoticeAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        state.profile.notifications = [];
        state.account.notifications = [];
      }
    });
    builder.addCase(deleteNoticeAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createDonateProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createDonateProfile.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        toast.success("Tạo donate thành công");
        state.profile.donate = action.payload;
      }
    });
    builder.addCase(createDonateProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateDonateProfile.rejected, (state) => {
        state.loading = false;
    });
    builder.addCase(updateDonateProfile.fulfilled, (state, action: any) => {
        state.loading = false;
        if (state.profile && state.account) {
            toast.success("Cập nhật donate thành công");
            state.profile.donate = {
                ...state.profile.donate,
                title: action.payload.title,
                description: action.payload.description,
                imageQr: action.payload.imageQr,
                status: action.payload.status,
                createdAt: action.payload.createdAt,
            }
        }
    });
    builder.addCase(updateDonateProfile.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(addNetworkProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addNetworkProfile.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        toast.success("Thêm mạng xã hội thành công");
        if(state.profile.networks){
          state.profile.networks.push(action.payload);
        }else{
          state.profile.networks = [action.payload];
        }
      }
    });
    builder.addCase(addNetworkProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteNetworkProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteNetworkProfile.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        toast.success("Xóa mạng xã hội thành công");
        state.profile.networks = state.profile.networks?.filter(
          (item) => item.uuid !== action.payload
        );
      }
    });
    builder.addCase(deleteNetworkProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createInfoProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createInfoProfile.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        toast.success("Tạo thông tin thành công");
        state.profile.information = action.payload;
      }
    });
    builder.addCase(createInfoProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateInfoProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateInfoProfile.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        toast.success("Cập nhật thông tin thành công");
        state.profile.information = action.payload;
      }
    });
    builder.addCase(updateInfoProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(watchNoticeAccount.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(watchNoticeAccount.fulfilled, (state, action: any) => {
      state.loading = false;
      if (state.profile && state.account) {
        state.profile.notifications = state.profile.notifications?.map(item => {
          if(item.uuid === action.payload.uuid){
            item.status = "read";
          }
          return item;
        })

        state.account.notifications = state.account.notifications?.map(item => {
          if(item.uuid === action.payload.uuid){
            item.status = "read";
          }
          return item;
        })
      }
    });
    builder.addCase(watchNoticeAccount.pending, (state) => {
      state.loading = true;
    });
  },
});

export const AuthAction = reducer.actions;
export const AuthReducer = reducer.reducer;
