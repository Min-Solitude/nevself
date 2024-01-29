import { auth, provider } from '@/configs/firebase';
import { createAccountToCollection, createrAccount, getAccountByUid, login } from '@/configs/firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthState, HagTag } from './auth.type';
import { deleteCookie, setCookie } from 'cookies-next';
import { updateAvatar, updateBanner, updateInfo } from '@/configs/firebase/account';

const initialState: AuthState = {
    account: null,
    loading: false,
    profile: null,
};

export const registerAccount = createAsyncThunk(
    'auth/registerAccountByEmailAndPassword',
    async (payload: { email: string; password: string ; purpose: string | null; phoneNumber: string}) => {
            const registerUser = await createrAccount(`${payload.email}@gmail.com`, payload.password);
        
            if(registerUser?.result?.user?.uid) {
                const addUserToCollection = await createAccountToCollection(payload.email, payload.password, payload.purpose, payload.phoneNumber, registerUser.result.user.uid);

                // Remove session storage
                sessionStorage.removeItem('purpose');
                sessionStorage.removeItem('phoneNumber');
                sessionStorage.removeItem('rules');
                sessionStorage.removeItem('step');

                return addUserToCollection?.result;
            }

            return null;
    }
);

// ERROR: Firebase: Error (auth/operation-not-allowed).
export const registerAccountByGoogle = createAsyncThunk(
    'auth/registerAccountByGoogle',
    async () => {
        try {
            console.log('dmm');
        
            const user = await signInWithPopup(auth, provider);
    
            console.log(user);
            
                
        } catch (error) {
            console.log(error);
        }

    }
);
// ERROR: Firebase: Error (auth/operation-not-allowed).


export const loginAccount = createAsyncThunk(
    'auth/loginAccountByEmailAndPassword',
    async (payload: { username: string; password: string }) => {
       const loginResult = await login(payload.username, payload.password)

       if(loginResult?.result){          

        setCookie('access_token', (loginResult as any)?.result?.user?.accessToken, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });

        const getAccountResult = await getAccountByUid(loginResult?.result?.user?.uid);
        
        return getAccountResult?.result;
        
       }
    }
);

export const updateBannerAccount = createAsyncThunk(
    'auth/updateBannerAccount',
    async (payload: { isBannerUrl: any; uid: any }) => {
        const updateBannerResult = await updateBanner(payload.isBannerUrl, payload.uid);

        return updateBannerResult?.result;
    }
);

export const getProfileAccount = createAsyncThunk(
    'auth/getAccountByUid',
    async (payload: { uid: string }) => {
        const getAccountResult = await getAccountByUid(payload.uid);
        
        return getAccountResult?.result;
    }
)

export const updateAvatarAccount = createAsyncThunk(
    'auth/updateAvatarAccount',
    async (payload: {
        isAvatarUrl: any;
        uid: any;
    }) => {
        const updateAvatarResult = await updateAvatar(payload.isAvatarUrl, payload.uid);

        return updateAvatarResult?.result;
    })

export const updateInfoAccount = createAsyncThunk(
    'auth/updateInfoAccount',
    async (payload : {
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
        )

        console.log(updateInfoResult?.result);
        

        return updateInfoResult?.result;
    })

const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.account = null;
            deleteCookie('access_token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerAccount.fulfilled, (state, action) => {
            state.loading = false;  
            if(action.payload) {
                state.account = {
                    email: action.payload.username,
                    purpose: action.payload.purpose,
                    phoneNumber: action.payload.phoneNumber,
                    uid: action.payload.uid,
                    role: action.payload.role,
                    status: action.payload.status,
                };    
                
                window.location.href = '/login';
            } else{
                toast.error('Đăng ký thất bại');
            }
        });
        builder.addCase(registerAccount.rejected, (state) => {
            state.loading = false;
            toast.error('Đăng ký thất bại');
        });

        builder.addCase(loginAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginAccount.fulfilled, (state, action : any) => {
            state.loading = false;  
            if(action.payload) {
                state.account = action.payload;
                window.location.href = '/';
            } else{
                toast.error('Đăng nhập thất bại');
            }
        });

        builder.addCase(updateBannerAccount.rejected, (state) => {
            state.loading = false;
            toast.error('Cập nhật ảnh bìa thất bại');
        });
        builder.addCase(updateBannerAccount.fulfilled, (state, action : any) => {
            state.loading = false;
            if(state.account && state.profile) {
                state.account.banner = action.payload;
                state.profile.banner = action.payload;
                toast.success('Cập nhật ảnh bìa thành công');
            } else{
                toast.error('Cập nhật ảnh bìa thất bại');
            }
        });
        builder.addCase(updateBannerAccount.pending, (state) => {
            state.loading = true;
        }
        );

        builder.addCase(getProfileAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProfileAccount.fulfilled, (state, action : any) => {
            if(action.payload) {
                state.profile = action.payload;
                state.loading = false;
            }
        });
        builder.addCase(getProfileAccount.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(updateAvatarAccount.rejected, (state) => {
            state.loading = false;
            toast.error('Cập nhật ảnh đại diện thất bại');
        });
        builder.addCase(updateAvatarAccount.fulfilled, (state, action : any) => {
            state.loading = false;
            if(state.account && state.profile) {
                state.account.avatar = action.payload;
                state.profile.avatar = action.payload;
                toast.success('Cập nhật ảnh đại diện thành công');
            } else{
                toast.error('Cập nhật ảnh đại diện thất bại');
            }
        });
        builder.addCase(updateAvatarAccount.pending, (state) => {
            state.loading = true;
        }
        );

        builder.addCase(updateInfoAccount.rejected, (state) => {
            state.loading = false;
            toast.error('Cập nhật thông tin thất bại');
        });
        builder.addCase(updateInfoAccount.fulfilled, (state, action : any) => {
            state.loading = false;
                if(state.account && state.profile) {
                    if(action.payload.displayName) {
                        state.account.displayName = action.payload.displayName;
                        state.profile.displayName = action.payload.displayName;
                    }
                    if(action.payload.introduction){
                        state.account.introduction = action.payload.introduction;
                        state.profile.introduction = action.payload.introduction;
                    }
                    if(action.payload.tags){
                        state.account.tags = action.payload.tags;
                        state.profile.tags = action.payload.tags;
                    }
    
                    toast.success('Cập nhật thông tin thành công');
                } else{
                    toast.error('Cập nhật thông tin thất bại');
                }
        });
        builder.addCase(updateInfoAccount.pending, (state) => {
            state.loading = true;
        }
        );
    },
});

export const AuthAction = reducer.actions;
export const AuthReducer = reducer.reducer;
