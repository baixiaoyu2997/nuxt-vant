const NAMESPACE = '@@LOADING' // 定义模块名
const SHOW = '@@LOADING/SHOW' // 显示mutation 同步type
const HIDE = '@@LOADING/HIDE'

const createLoadingPlugin = ({
  namespace = NAMESPACE,
  includes = [],
  excludes = [],
} = {}) => {
  return (store) => {
    if (store.state[namespace]) {
      throw new Error(
        `createLoadingPlugin: ${namespace} exited in current store`
      )
    }

    // new vuex的时候注册一个模块进去
    store.registerModule(namespace, {
      namespaced: true,
      state: {
        effects: {},
      },
      getters: {
        globalLoading(state) {
          return Object.values(state.effects).some((x) => x)
        },
      },
      // 同步方法
      mutations: {
        SHOW(state, { payload }) {
          state.effects = {
            ...state.effects,
            [payload]: true, // 将当前的action 置为true
          }
        },
        HIDE(state, { payload }) {
          if (state.effects[payload]) {
            state.effects = {
              ...state.effects,
              [payload]: false, // 将当前的action 置为false
            }
          }
        },
      },
    })

    store.subscribeAction({
      // 发起一个action 之前会走这里
      before: (action) => {
        if (onEffect(action, includes, excludes)) {
          store.commit({ type: SHOW, payload: action.type })
        }
      },
      // 发起一个action 之后会走这里
      after: (action, state) => {
        if (onEffect(action, includes, excludes)) {
          store.commit({ type: HIDE, payload: action.type })
        }
      },
      error: (action) => {
        if (onEffect(action, includes, excludes)) {
          store.commit({ type: HIDE, payload: action.type })
        }
      },
    })
  }
}

// 判断是否要执行
function onEffect({ type }, includes, excludes) {
  if (includes.length === 0 && excludes.length === 0) {
    return true
  }

  if (includes.length > 0) {
    return includes.includes(type)
  }

  return excludes.length > 0 && !excludes.includes(type)
}

export default createLoadingPlugin
