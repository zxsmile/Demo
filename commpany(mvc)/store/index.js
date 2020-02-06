import Vuex from 'vuex';
import modProduct from './modProduct';
import modArticle from './modArticle';
import modUser from './modUser';

const createStore = () => {
  return new Vuex.Store({
    modules: {
      modProduct,
      modUser,
      modArticle
    }
  });
};
export default createStore;
