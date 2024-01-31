import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "./product.type";
import { createProductAccount, getProductsAccount } from "@/configs/product";
import { toast } from "react-toastify";

const initialState: ProductState = {
    loading: false,
    products: null,
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

const reducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.result){
                state.products = state.products ? [...state.products, action.payload.result] : [action.payload.result];
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
                state.products = action.payload.result.products;
            }
        }
        );
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
        }
        );
    },
});

export const ProductAction = reducer.actions;
export const ProductReducer = reducer.reducer;
