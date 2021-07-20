import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      NarbarItems: [{
        content: 'Tổng quan',
        classItem: 'icon-dashboard',
        toLink: '/dashboard',
        isClick: false
    },
    {
        content: 'Báo cáo',
        classItem: 'icon-report',
        toLink: '/report',
        isClick: false
    },
    {
        content: 'Danh mục khách hàng',
        classItem: 'icon-dic-employee',
        toLink: '/customer',
        isClick: false
    },
    {
        content: 'Danh mục nhân viên',
        classItem: 'icon-dic-employee',
        toLink: '/employee',
        isClick: false
    },
    {
        content: 'Thiết lập hệ thống',
        classItem: 'icon-setting',
        toLink: '/setting',
        isClick: false
    },

  ],
      isToggleNavBar : false,
      Toast: {
            data : []
      },
      
    },
    actions:{
      addToast({commit},arr){
        commit('TOGGLE_TOAST_DATA',arr);
        setTimeout(()=>{
            commit('TOGGLE_TOAST_REMOVE');
        },2000)
  }
    }
    ,
    mutations: {
        TOGGLE_NAVBAR(state){
            state.isToggleNavBar = ! state.isToggleNavBar;
        },
        TOGGLE_TOAST(state){
          state.Toast.showToast = !state.Toast.showToast;
        },
        TOGGLE_TOAST_DATA(state,a){
          state.Toast.data.push(a);
        },
        TOGGLE_TOAST_REMOVE(state){
          state.Toast.data = []
        }
    }
  })

export default store;