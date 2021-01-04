export const state = () => ({
  errorMsg: '',
  id: '',
})

export const mutations = {
  setState(state, data) {
    if (data.constructor === Object) {
      Object.keys(data).forEach((x) => {
        state[x] = data[x]
      })
    } else {
      throw new Error('setState参数不正确')
    }
  },
}
export const actions = {
  getNewsLike({ commit, state }) {
    return this.$axios
      .$get('/news/like-list', { params: { news_id: 0 } })
      .then((res) => {
        const newsLike = res.data.list || []
        commit('setState', { newsLike })
      })
  },
}
