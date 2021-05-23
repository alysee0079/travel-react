import { createStore, applyMiddleware } from 'redux'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import LanguageReducer from './language/languageReducer'
import RecommendProducts from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import { actionLog } from './middlewares/actionLog'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { shoppingCartSlice } from './shoppingCart/slice'
import { userSlice } from './user/slice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { orderSlice } from './order/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  language: LanguageReducer,
  recommendProducts: RecommendProducts,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReudcer, applyMiddleware(thunk, actionLog))
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), actionLog],
  devTools: true,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default { store, persistor }
