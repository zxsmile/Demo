import axios from 'axios';
export default {
  // 相当于data对象的状态对象
  state: {
    user: null
  },
  // 包含了n个直接更新状态的方法的对象
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  // 包含了n个间接更新状态的方法的对象
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.user) {
        const { email, nickname } = req.session.user;
        const user = {
          email,
          nickname
        };
        commit('SET_USER', user);
      }
    },
    async login ({ commit }, { email, password }) {
      try {
        let res = await axios.post('/user/login', {
          email,
          password
        });

        const { data } = res;
        if (data.success) {
          commit('SET_USER', data.data);
        }
        return data;
      } catch (e) {
        if (e.response.status === 401) {
          throw new Error('来错地方了');
        }
      }
    },

    async addUser({ commit }, { email, password, nickname }) {
      try {
        let res = await axios.post('/user/addUser', {
          email,
          password,
          nickname
        });

        const { data } = res;
        return data;
      } catch (e) {
        if (e.response.status === 401) {
          throw new Error('注册异常');
        }
      }
    },

    // 深坑：axios.post()返回的res中的data 才是我们需要解析的值，可以打印 res 就知道了
    async logout ({ commit }) {
      try {
        let res = await axios.post('/user/logout');
        const { data } = res;
        if (data.success) {
          commit('SET_USER', null);
        }
        return data; // 在此 返回 data，而不是 res
      } catch (e) {
        if (e.response.status === 401) {
          throw new Error('退出系统出错...');
        }
      }
    }
  },
  // 包含多个getter计算属性的对象
  getters: {
  }
};
