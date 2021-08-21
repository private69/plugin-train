const state = {
  mapMarkers: []
}
const getters = {
  getMapMarkers: state => state.mapMarkers,
}

const mutations = {
  setMapMarkers: ( state , result) => {
    state.mapMarkers = result;
  }
}
const actions = {
  setMapMarkers: ({commit} , result) => {
    if(!(result instanceof Array)) {
      console.error("markers data is not an array!");
      return ;
    }
    let _data = [...result];
    _data
      .filter( item => item)
      .map(item => item)
    commit('setMapMarkers' , _data);
  }
}

module.exports = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}