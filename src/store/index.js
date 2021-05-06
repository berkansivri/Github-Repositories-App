import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      favorites: []
    },
    getters: {
      isFavorite: state => id => state.favorites.includes(id)
    },
    mutations: {
      addFavorite(state, id) {
        console.log(id);
        state.favorites.push(id);
      },
      removeFavorite({ favorites }, id) {
        const favIndex = favorites.findIndex(fav => fav === id);
        Vue.delete(favorites, favIndex);
      }
    }
  });

  return Store;
}
