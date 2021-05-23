import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { checkout } from '../shoppingCart/slice'

interface OrderState {
  loading: boolean
  error: string | null
  currentOrder: any
}
const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
}

export const placeOrder = createAsyncThunk('order/placeOrder', async (parameters: { jwt: string; orderId: string }, thunkAPI) => {
  const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`, null, {
    headers: {
      Authorization: `bearer ${parameters.jwt}`,
    },
  })
  return data
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: state => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.error = null
      state.loading = false
    },
    [placeOrder.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    //
    [checkout.pending.type]: state => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.error = null
      state.loading = false
    },
    [checkout.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})
