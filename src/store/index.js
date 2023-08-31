import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("api_token"),
    },
  },
  getters: {
    // isAuthenticated: (state) => !!state.user.token,

    userRole(state) {
      if (state.user.data && state.user.data.roleable_type) {
        return state.user.data.roleable_type.split("\\")[2];
      }
      return null;
    },
    isAdmin(state) {
      return state.user.data && state.user.data.roleable_type.split("\\")[2] === 'Admin';
    },
    isAdministratif(state) {
      return state.user.data && state.user.data.roleable_type.split("\\")[2] === 'Administratif';
    },
    isComptable(state) {
      return state.user.data && state.user.data.roleable_type.split("\\")[2] === 'Comptable';
    },
    isEleve(state) {
      return state.user.data && state.user.data.roleable_type.split("\\")[2] === 'Eleve';
    },
    isParent(state) {
      return state.user.data && state.user.data.roleable_type.split("\\")[2] === 'Parent';
    },
    isProf(state) {
      return state.user.data && state.user.data.roleable_type.split("\\")[2] === 'Prof';
    },
  },
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/auth/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/auth/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((res) => {
        sessionStorage.removeItem("api_token");
        sessionStorage.removeItem("userRole");
        commit("logout");
        return res;
      });
    },
  },

  mutations: {
    logout: (state) => {
      (state.user.data = {}), (state.user.token = null);
    },

    setUser: (state, userData) => {
      console.log("userData: ", userData);

      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("api_token", userData.token);
      sessionStorage.setItem("userRole", userData.user.roleable_type.split('\\')[2]);
    },
  },
  modules: {},
});

export default store;
