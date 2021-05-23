import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductDetailState {
  loading: boolean
  error: string | null
  data: any
}
const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
}

export const getProductDetail = createAsyncThunk('productDetail/getProductDetail', async (touristRouteId: string, thunkAPI) => {
  const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
  return data
})

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // fetchStart: state => {
    //   state.loading = true
    // },
    // fetchSuccess: (state, action) => {
    //   state.data = action.payload
    //   state.error = null
    //   state.loading = false
    // },
    // fetchFail: (state, action) => {
    //   state.error = action.payload
    //   state.loading = false
    // },
  },
  extraReducers: {
    [getProductDetail.pending.type]: state => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.error = null
      state.loading = false
    },
    [getProductDetail.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})
