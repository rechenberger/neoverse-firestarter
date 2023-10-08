import { proxy } from 'valtio'

export const metaState = proxy({
  mode: 'menu' as 'menu' | 'gameplay',
})
