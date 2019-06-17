const state = {
  user: {
    id: 1,
    name: 'Uciha Naruto',
    isAdmin: true,
  },
};

const getters = {
  userId: state => {
    return state.user.id;
  },

  userName: state => {
    return state.user.name;
  },

  userIsAdmin: state => {
    return state.user.isAdmin;
  },
};

const mutations = {

};

const actions = {

};

export const userState = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
