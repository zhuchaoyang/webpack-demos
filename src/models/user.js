// import { logout, userInfo  } from 'services/user'
// import * as serviceUser from 'services/user.js'


export default {
  namespace: 'user',
  state: {
    isLogin: false,
    userInfo: null,
  },
  effects: {
  

  },
  reducers: {
    update(state, action){ return { ...state, ...action.payload, } },








  },
  // 路由变化监听
  subscriptions: {
    setup({ dispatch, history }){
      history.listen(location => {
        
      })
    }
  }
}
