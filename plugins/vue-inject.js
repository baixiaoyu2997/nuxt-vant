import Vue from 'vue'
import { Lazyload } from 'vant'
import { setAxios } from '~/utils/global'

Vue.use(Lazyload)

export default function (context) {
  const { $axios } = context
  setAxios($axios)
}
