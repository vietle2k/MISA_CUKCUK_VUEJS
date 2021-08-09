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
        isToggleNavBar: false,
        Toast: {
            data: []
        },
        dataForm: {
            department: [],
            position: [],
            gender: [{
                    id: '1',
                    name: 'Nam',
                    isClick: false,
                    isHover: false
                },
                {
                    id: '2',
                    name: 'Nữ',
                    isClick: false,
                    isHover: false
                },
                {
                    id: '0',
                    name: 'Không xác định',
                    isClick: false,
                    isHover: false
                }
            ],

        },
        payload: {

        }


    },
    actions: {
        addToast({ commit }, arr) {
            commit('TOGGLE_TOAST_DATA', arr);
            setTimeout(() => {
                commit('TOGGLE_TOAST_REMOVE');
            }, 2000)
        }
    },
    mutations: {
        TOGGLE_CLICK(state, payload) {

            if (payload.type == 'department') {
                for (let i = 0; i < state.dataForm.department.length; i++) {
                    if (i == payload.index)
                        state.dataForm.department[i]["isClick"] = true;
                    else
                        state.dataForm.department[i]["isClick"] = false;
                }

            } else if (payload.type == "position") {
                for (let i = 0; i < state.dataForm.position.length; i++) {
                    if (i == payload.index)
                        state.dataForm.position[i]["isClick"] = true;
                    else
                        state.dataForm.position[i]["isClick"] = false;
                }
            }

        },
        TOGGLE_HOVER(state, payload) {
            if (payload.type == 'department') {
                for (let i = 0; i < state.dataForm.department.length; i++) {
                    if (i == payload.index)
                        state.dataForm.department[i]["isHover"] = true;
                    else
                        state.dataForm.department[i]["isHover"] = false;
                }

            } else if (payload.type == 'position') {
                for (let i = 0; i < state.dataForm.position.length; i++) {
                    if (i == payload.index)
                        state.dataForm.position[i]["isHover"] = true;
                    else
                        state.dataForm.position[i]["isHover"] = false;
                }
            }

        },
        TOGGLE_CLICK_DEPARTMENT(state, a) {


            for (var i = 0; i < state.dataForm.department.length; i++) {
                if (i == a)
                    state.dataForm.department[i]["isClick"] = true;
                else
                    state.dataForm.department[i]["isClick"] = false;
            }

        },
        TOGGLE_HOVER_DEPARTMENT(state, a) {
            for (var i = 0; i < state.dataForm.department.length; i++) {
                if (i == a)
                    state.dataForm.department[i]["isHover"] = true;
                else
                    state.dataForm.department[i]["isHover"] = false;
            }

        },
        TOGGLE_PUSH_DEPARTMENT(state, a) {
            // console.log("h1");
            state.dataForm.department.push(a);
        },
        TOGGLE_PUSH_POSITION(state, a) {
            // console.log("h2");
            state.dataForm.position.push(a);
        },
        TOGGLE_NAVBAR(state) {
            state.isToggleNavBar = !state.isToggleNavBar;
        },
        TOGGLE_TOAST(state) {
            state.Toast.showToast = !state.Toast.showToast;
        },
        TOGGLE_TOAST_DATA(state, a) {
            state.Toast.data.push(a);
        },
        TOGGLE_TOAST_REMOVE(state) {
            state.Toast.data = []
        }
    }
})

export default store;