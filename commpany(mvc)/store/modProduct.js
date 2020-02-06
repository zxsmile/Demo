import axios from 'axios';

export default {
  // 相当于data对象的状态对象
  state: {
    products: {},
    currentProduct: {}
  },
  // 包含了n个直接更新状态的方法的对象
  mutations: {
  },
  // 包含了n个间接更新状态的方法的对象
  actions: {
    async getProducts ({ state }, params) {
      const res = await axios.get('/product/list', { params: params });
      state.products = res.data.result;
      return res;
    },

    async getProduct ({ state }, _id) {
      if (_id === state.currentProduct._id) return;
      const res = await axios.get(`/product/get/${_id}`);
      state.currentProduct = res.data.data;
      return res;
    },

    async addProduct ({ state, dispatch }, product) {
      await axios.post('/product/add', product);
    },

    async updateProduct ({ state, dispatch }, product) {
      await axios.put('/product/update', product);
    },

    async deleteProduct ({ state, dispatch }, product) {
      await axios.delete(`/product/del/${product._id}`);
    }
  },
  // 包含多个getter计算属性的对象
  getters: {
  }
};
