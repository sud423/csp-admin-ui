export default {
    namespaced: true,
    state: {
      isMobile: false,
      systemName: 'Csp Admin',
      copyright: '2020 susd'
    },
    mutations: {
      setDevice (state, isMobile) {
        state.isMobile = isMobile
      }
    }
  }
  