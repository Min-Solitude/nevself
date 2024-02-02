import { createProductAccount, deleteProductByUuid, getProductsAccount, getProductsByUuid, likeProductProfile, unlikeProductAccount, updateProductByUuid } from "@/configs/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ProductState } from "./product.type";

const initialState: ProductState = {
    loading: false,
    products: null,
    product: null,
};

export const getProducts = createAsyncThunk(
    'product/get',
    async (payload: {
        uid: string;
    },) => {
        const getProductsResult = await getProductsAccount(payload.uid);
        
        return getProductsResult;
    },
);

export const createProduct = createAsyncThunk(
    'product/create',
    async (payload: {
        image: any;
        name: string;
        link: string;
        description: string;
        uid: string;
    },) => {
        const createProductResult = await createProductAccount(payload.uid, payload.name, payload.image, payload.description, payload.link);
        
        return createProductResult;
    },
);

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (payload: {
        uid: string;
        uuid: string;
    },) => {
        const deleteProductResult = await deleteProductByUuid(payload.uid, payload.uuid);
        
        return deleteProductResult.result
    },
);

export const getProductByUuid = createAsyncThunk(
    'product/getByUuid',
    async (payload: {
        uid: string;
        uuid: string;
    },) => {
        const getProductsResult = await getProductsByUuid(payload.uid, payload.uuid);
        
        return getProductsResult;
    },
);

export const updateProduct = createAsyncThunk(
    'product/update',
    async (payload: {
        uid: string;
        uuid: string;
        name: string;
        image: any;
        description: string;
        imageOld: string;
        link: string;
    },) => {
        const updateProductResult = await updateProductByUuid(payload.uid, payload.uuid, payload.name, payload.image, payload.description, payload.link, payload.imageOld);
        
        return updateProductResult.result
    },
);

export const likeProduct = createAsyncThunk(
    'product/like',
    async (payload: {
        uid_liker: string;
        uuid_product: string;
        uid_creator: string;
        name: string;
    },) => {
        const getProductsResult = await likeProductProfile(payload.uid_liker, payload.uuid_product, payload.uid_creator, payload.name);
        
        return getProductsResult.result
    },
);

export const unlikeProduct = createAsyncThunk(
    'product/unlike',
    async (payload: {
        uid_liker: string;
        uuid_product: string;
        uid_creator: string;
    },) => {
        const getProductsResult = await unlikeProductAccount(payload.uid_liker, payload.uuid_product, payload.uid_creator);
        
        return getProductsResult.result
    },
);

const reducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.products = null;
            state.product = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.result){
                state.products = state.products ? [ action.payload.result, ...state.products] : [action.payload.result];
                toast.success("Tạo sản phẩm thành công");
            }else{
                toast.error("Tạo sản phẩm thất bại");
            }
        }
        );
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            toast.error("Tạo sản phẩm thất bại");
        }
        );

        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.result){
                state.products = action.payload.result.products.reverse();
            }
        }
        );
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
        }
        );

        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.products = action.payload;
                toast.success("Xóa sản phẩm thành công");
            }else{
                toast.error("Xóa sản phẩm thất bại");
            }
        }
        );
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            toast.error("Xóa sản phẩm thất bại");
        }
        );

        builder.addCase(getProductByUuid.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getProductByUuid.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.result){
                state.product = action.payload.result[0];
            }else{
                state.product = null;
            }
        }
        );
        builder.addCase(getProductByUuid.rejected, (state, action) => {
            state.loading = false;
        }
        );

        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.products = action.payload.reverse();
                toast.success("Cập nhật sản phẩm thành công");
            }else{
                toast.error("Cập nhật sản phẩm thất bại");
            }
        }
        );
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            toast.error("Cập nhật sản phẩm thất bại");
        }
        );

        builder.addCase(likeProduct.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(likeProduct.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.products = action.payload.reverse();
            }else{
                toast.error("Thích sản phẩm thất bại");
            }
        }
        );
        builder.addCase(likeProduct.rejected, (state, action) => {
            state.loading = false;
            toast.error("Thích sản phẩm thất bại");
        }
        );


        builder.addCase(unlikeProduct.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(unlikeProduct.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.products = action.payload.reverse();
            }else{
                toast.error("Bỏ thích sản phẩm thất bại");
            }
        }
        );
        builder.addCase(unlikeProduct.rejected, (state, action) => {
            state.loading = false;
            toast.error("Bỏ thích sản phẩm thất bại");
        }
        );
    },
});

export const ProductAction = reducer.actions;
export const ProductReducer = reducer.reducer;
