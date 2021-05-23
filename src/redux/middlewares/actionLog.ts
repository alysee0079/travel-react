import { Middleware } from 'redux'

export const actionLog: Middleware = store => next => action => {
  console.log('当前state：', store.getState())
  console.log('fire action', action)
  next(action)
  console.log('更新后state：', store.getState())
}
