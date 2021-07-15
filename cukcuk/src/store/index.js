import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      NarbarItems: [
          {
              content: 'Tổng quan',
              classItem : 'icon-dashboard',
              toLink : '/dashboard',
              isClick: false
          },
          {
            content: 'Tổng quan',
            classItem : 'icon-dashboard',
            isClick: false
          },
          {
            content: 'Tổng quan',
            classItem : 'icon-dashboard',
            isClick: false
          },
          {
          content: 'Tổng quan',
          classItem : 'icon-dashboard',
          isClick: false
          },
    
      ],
      isToggleNavBar : false
    },
    mutations: {
        TOGGLE_NAVBAR(){
            state.isToggleNavBar = ! state.isToggleNavBar;
        }
    }
  })

export default store;