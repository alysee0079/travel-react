import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any[]
}
const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
}

export const getShoppingCart = createAsyncThunk('shoppingCart/getShoppingCart', async (jwt: string, thunkAPI) => {
  const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  })
  return data.shoppingCartItems
})

export const addShoppingCartItem = createAsyncThunk('shoppingCart/addShoppingCartItem', async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
  const { data } = await axios.post(
    `http://123.56.149.216:8080/api/shoppingCart/items`,
    {
      touristRouteId: parameters.touristRouteId,
    },
    {
      headers: {
        Authorization: `bearer ${parameters.jwt}`,
      },
    }
  )
  return data.shoppingCartItems
})

export const checkout = createAsyncThunk('shoppingCart/checkout', async (jwt: string, thunkAPI) => {
  const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`, null, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  })
  return data
})

export const clearShoppingCartItem = createAsyncThunk('shoppingCart/clearShoppingCartItem', async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
  return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join()})`, {
    headers: {
      Authorization: `bearer ${parameters.jwt}`,
    },
  })
})

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
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
    [getShoppingCart.pending.type]: state => {
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.error = null
      state.loading = false
    },
    [getShoppingCart.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    //
    [addShoppingCartItem.pending.type]: state => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.error = null
      state.loading = false
    },
    [addShoppingCartItem.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    //
    [clearShoppingCartItem.pending.type]: state => {
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: state => {
      state.items = []
      state.error = null
      state.loading = false
    },
    [clearShoppingCartItem.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    //
    [checkout.pending.type]: state => {
      state.loading = true
    },
    [checkout.fulfilled.type]: state => {
      state.items = []
      state.error = null
      state.loading = false
    },
    [checkout.rejected.type]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})
