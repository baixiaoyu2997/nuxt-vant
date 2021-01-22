import { axios } from '~/utils/global'
export function getGrayHolding() {
  return axios.$get('/h5/gray/holding')
}
export function getDefiMarketSupply(payload) {
  return axios.$get('/h5/defi/market/supply', { params: { ...payload } })
}
