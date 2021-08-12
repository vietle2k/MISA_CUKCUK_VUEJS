<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}" >
            <div class="model"></div>
            <div class="dialog-content">
                <div class="dialog_header">
                    <div class="dialog_title">THÔNG TIN NHÂN VIÊN</div>
                    <button class="button_X" @click="btnDialogClose()"></button>
                </div>
                <div class="dialog_middle">
                    <div class="column1">
                        <button class="button_avatar"></button>
                        <div style="font-size:11px;">(Vui lòng chọn ảnh có định <br>dạng<br> .jpg,.jpeg,.png,.gif.)</div>
                    </div>
                    <div class="column2">
                        <div style="font-size: 15px">A. THÔNG TIN CHUNG</div>
                        <div class="border"></div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Mã nhân viên </div>
                                <input 
                                type="text" maxlength="10"
                                class="blank_box employeecode" 
                                :class="{ 'error-dialog': !checkEmployeeCode }"
                                ref="EmployeeCode" 
                                v-model="employee.EmployeeCode" 
                                @blur="EmployeeCodeValidation(employee.EmployeeCode)">
                                <span class="abc" style="color: red; font-size: 10px;" :class="{ 'error-required': checkEmployeeCode }">Vui lòng nhập mã nhân viên</span>
                            </div>
                            <div>
                                <div style="display:flex;">Họ và tên </div>
                                <input ref="name" type="text" class="blank_box fullname" :class="{ 'error-dialog': !checkEmployeeFullName }" v-model="employee.FullName" @blur="FullNameValidation(employee.FullName)" >
                                <span class="abc" style="color: red; font-size: 10px"  :class="{ 'error-required': checkEmployeeFullName }">Vui lòng nhập tên nhân viên</span>
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Ngày sinh</div>
                                <!-- <input type="date" class="date_box" v-model="employee.DateOfBirth"> -->
                                 <date-pick ref="datePick"  v-model="employee.DateOfBirth"
                                    :displayFormat="'DD/MM/YYYY'" :months="months"
                                    :weekdays="weekdays" nextMonthCaption="Tháng sau" prevMonthCaption="Tháng trước"
                                    :inputAttributes="{placeholder: 'dd/mm/yyyy'}"></date-pick>
                            </div>
                            <div>
                                <div style="display:flex;margin-left: 12px">Giới tính</div>
                                <!-- <select class="select_box" v-model="employee.Gender">
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                    <option value="">Không xác định</option>
                                </select> -->
                                <v-select   id="mySelect"
                                            label="GenderName"
                                            v-model="employee.Gender"
                                            :options="select.genderOptions"
                                            :reduce = "GenderName => GenderName.Gender"
                                            :placeholder="'Nhập/chọn giới tính'"
                                        >
                                            <template  v-slot:option="option">
                                                <span class="option-icon"></span>
                                                {{ option.GenderName }}
                                            </template>
                                        </v-select>
                                <!-- combobox -->
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Số CMTND/ Căn cước </div>
                                <input type="text" class="blank_box identity" :class="{ 'error-dialog': !checkEmployeeIdentityNumber }" v-model="employee.IdentityNumber" @blur="IdentityValidation(employee.IdentityNumber)">
                                <div class="abc" style="color: red; font-size: 10px"  :class="{ 'error-required': checkEmployeeIdentityNumber }">Vui lòng nhập đúng CMTND</div>
                            </div>
                            <div>
                                <div style="display:flex;">Ngày cấp</div>
                                <!-- <input type="date" class="date_box" v-model="employee.IdentityDate"> -->
                                <div>
                                <date-pick ref="datePick"  v-model="employee.IdentityDate"
                                    :displayFormat="'DD/MM/YYYY'" :months="months"
                                    :weekdays="weekdays" nextMonthCaption="Tháng sau" prevMonthCaption="Tháng trước"
                                    :inputAttributes="{placeholder: 'dd/mm/yyyy'}"></date-pick>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style="display:flex;">Nơi cấp</div>
                            <input type="text" class="blank_box" v-model="employee.IdentityPlace">
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Email </div>
                                <input type="text" class="blank_box email" :class="{ 'error-dialog': !checkEmployeeEmail }" v-model="employee.Email" @blur="EmailValidation(employee.Email)" >
                                <span class="abc" style="color: red; font-size: 10px"  :class="{ 'error-required': checkEmployeeEmail }">Vui lòng nhập đúng định dạng email</span>
                            </div>
                            <div>
                                <div style="display:flex;">Số điện thoại </div>
                                <input type="text" class="blank_box phonenumber" :class="{ 'error-dialog': !checkEmployeePhoneNumber }" v-model="employee.PhoneNumber" @blur="PhoneNumberValidation(employee.PhoneNumber)">
                                <span class="abc" style="color: red; font-size: 10px"  :class="{ 'error-required': checkEmployeePhoneNumber }">Vui lòng nhập số điện thoại</span>
                            </div>
                        </div>
                        <div style="font-size: 15px">B. THÔNG TIN CÔNG VIỆC</div>
                        <div class="border"></div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Vị trí</div>
                                <!-- <select class="select_box" v-model="employee.PositionId">
                                    <option value="148ed882-32b8-218e-9c20-39c2f00615e8">Nhân viên Marketing</option>
                                    <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91">Thu ngân</option>
                                    <option value="3700cc49-55b5-69ea-4929-a2925c0f334d">Giám đốc</option>
                                </select> -->
                                <!-- combobox -->
                                 <BaseCombobox style="margin-right: 24px;margin-bottom: 16px;" :parentValue.sync="employee.PositionName" type="position" @Choose="Choose"/>
                            </div>
                            <div>
                                <div style="display:flex;">Phòng ban</div>
                                <BaseCombobox style="margin-bottom: 16px;" :parentValue.sync="employee.DepartmentName" type="department" @Choose="Choose"/>
                                <!-- combobox -->
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Mã số thuế cá nhân</div>
                                <input type="text" class="blank_box" v-model="employee.PersonalTaxCode">
                            </div>
                            <div>
                                <div style="display:flex;">Mức lương cơ bản</div>
                                <div class="wrapper" data-placeholder="(VNĐ)">
                                    <input type="text" class="blank_box" id="salary_input"  
                                    v-model="employee.Salary"
                                    
                                    >
                                </div>
                                <!-- format int input js -->
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Ngày gia nhập công ty</div>
                                <!-- <input type="date" class="date_box" v-model="employee.JoinDate"> -->
                                <date-pick ref="datePick"  v-model="employee.JoinDate"
                                    :displayFormat="'DD/MM/YYYY'" :months="months"
                                    :weekdays="weekdays" nextMonthCaption="Tháng sau" prevMonthCaption="Tháng trước"
                                    :inputAttributes="{placeholder: 'dd/mm/yyyy'}"></date-pick>
                            </div>
                            <div>
                                <div style="display:flex; margin-left: 36px">Tình trạng công việc</div>
                                <select class="select_box a" v-model="employee.WorkStatus">
                                    <option value="0">Đang thử việc</option>
                                    <option value="1">Đã nghỉ việc</option>
                                    <option value="2">Đang làm việc</option>
                                    <option value="3">Đã nghỉ hưu</option>
                                </select>
                                <!-- combobox -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <button class="button_cancel" @click="btnDialogClose()">Hủy</button>
                    <button id="button_save" @click="btnSave()">Lưu</button>
                </div>
            </div>
            <!-- <BaseToast v-if="showToast" :items="Toast" /> -->
                
    </div>
</template>


<script>
// import BaseToast from '../../base/BaseToast.vue'
import axios from 'axios'
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import "vue-select/dist/vue-select.css";
//regular expression của email
// import DatePicker from 'vue2-datepicker'
// import 'vue2-datepicker/locale/vi'
// import 'vue2-datepicker/index.css'

import BaseCombobox from '../../base/BaseCombobox.vue'

export default({
    created() {
        // console.log(this.employee);
    },
    components: {
        BaseCombobox,
        DatePick
        // DatePicker
    },
    computed: {
        // Toast(){
        //    return this.$store.state.Toast.data;
        // },
        // showToast(){
        //     return this.$store.state.Toast.showToast;
        // }
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        employee: {
            type: Object 
        },
        formmode: {
            type: String,
            default: ""
        }
    },
    mounted() {

    },
    updated() {
        //auto focus ô input đầu tiên
        //Vì hàm focusInput đã được gọi trước khi dialog hiện ra nên là phải gọi lại nó một lần nữa (sau khi isShow thay đổi từ false sang true)
        
        while(this.focusFirstInput==true){
        this.focusInput();
        this.focusFirstInput=false;
        
        }
        if(this.isShow == false) this.focusFirstInput = true;

        //Format ngày sau khi dialog được hiện ra, để binding dữ liệu (isShow thay đổi từ false sang true)
        // this.employee.DateOfBirth = this.DateFormat(this.employee.DateOfBirth);
        // this.employee.IdentityDate = this.DateFormat(this.employee.IdentityDate);
        // this.employee.JoinDate = this.DateFormat(this.employee.JoinDate);
        // Format tiền lương (salary) sau khi dialog được hiện ra, để binding dữ liệu (isShow thay đổi từ false sang true)
        if(this.employee.Salary != null){
            this.format_salary();
        }
        // this.employee.Salary = this.format_salary(this.employee.Salary);
        this.employee.GenderName = this.format_notNaN(this.employee.GenderName);
        
    },
    methods: {
        // AddDataToast(a){
        //     console.log(a)
        //     this.$store.commit('TOGGLE_TOAST_DATA',a);
        //     setTimeout(()=>{
        //         this.$store.commit('TOGGLE_TOAST_REMOVE');
        //     },2000)
        // },
        
        Choose(type,id,content){
            switch(type) {
                case "department":
                    this.employee.DepartmentId = id;
                   
                    this.employee.DepartmentName = content;
                    console.log(content);
                    break;
                case "position":
                    this.employee.PositionId = id;
                    this.employee["PositionName"] = content;
                    break;
            }
        },
        btnDialogClose(){
            this.$emit('hideDialog');
            var c = {       
                        class: 'snackbar2',
                        icon: 'icon-exclamation-mark',
                        text: 'Bạn chưa thêm được nhân viên'
                    }
            this.$store.dispatch('addToast',c);
            this.checkEmployeeCode = this.checkEmployeeFullName = this.checkEmployeeIdentityNumber = this.checkEmployeePhoneNumber = this.checkEmployeeEmail = true;
        },
        //Phương thức thêm/sửa dữ liệu
        btnSave(){
            //Thêm dữ liệu -> đẩy dữ liệu lên API
            console.log(this.employee);
            // this.employee.Salary = this.formatSalary(this.employee.Salary);
            console.log(this.formatSalary(this.employee.Salary));
            this.employee.Salary = this.formatSalary(this.employee.Salary);
            this.CheckFull();
            if (this.formmode == "add"){
                if(this.totalCheck){
                    axios.post("https://localhost:44347/api/v1/Employees", this.employee)
                .then(res => {
                    console.log(res);
                    //Đóng Dialog
                    this.$emit('hideDialog');
                    // this.showToast = true
                    // setTimeout(() => this.showToast = false, 2000)
                    var a = {       
                        class: 'snackbar',
                        icon: 'icon-tick',
                        text: 'Bạn đã thêm nhân viên thành công'
                    }
                    this.$store.dispatch('addToast',a);
                })
                .catch(res => { 
                    console.log(res);
                })
                this.checkEmployeeCode = this.checkEmployeeFullName = this.checkEmployeeIdentityNumber = this.checkEmployeePhoneNumber = this.checkEmployeeEmail = true;
                }else{
                    alert("vui long ktra o mau do");
                }
                
            }
            //Sửa dữ liệu -> đẩy dữ liệu lên API
            else {
                console.log(this.employee);
                if(this.totalCheck){
                        axios.put("https://localhost:44347/api/v1/Employees" , this.employee)
                    .then(res => {
                        console.log(res);
                        //Đóng Dialog
                        this.$emit('hideDialog');
                        var b = {       
                            class: 'snackbar',
                            icon: 'icon-tick',
                            text: 'Bạn đã sửa nhân viên thành công'
                        }
                        this.$store.dispatch('addToast',b);
                    })
                    .catch(res => { 
                        console.log(res);
                    })
                    this.checkEmployeeCode = this.checkEmployeeFullName = this.checkEmployeeIdentityNumber = this.checkEmployeePhoneNumber = this.checkEmployeeEmail = true;
                }else{
                    alert("ktra lai de");
                }
                
            }
           

        },
        //format date để binding vào form
        DateFormat(unformatDate){
            if(unformatDate=="NaN-NaN-NaN"){
                return "";
            }
            var formattedDate = new Date(unformatDate);
                var stringMonth = formattedDate.getMonth() + 1;
                if (stringMonth < 10) stringMonth = '0' + stringMonth;
                var stringDate = formattedDate.getDate();
                if (stringDate < 10) stringDate = '0' + stringDate;
                var stringYear = formattedDate.getFullYear();

                return stringYear + '-' + stringMonth + '-' + stringDate;
               
        },
        //auto focus vào ô input đầu tiên sau khi hiện dialog
        focusInput(){
            this.$refs.EmployeeCode.focus();
        },

        //format salary luôn theo định dạng 20,000,000 (vnđ)
        format_salary(){
            if(this.employee.Salary ==="NaN") {
                this.employee.Salary ="";
                return;
            }
            
            var stringSalary = new String(this.employee.Salary);
            this.employee.Salary = parseInt(stringSalary.replace(/\D/g,''),10).toLocaleString();
           
        
        },
        //checkform not NaN
        format_notNaN(data){
            if(data==='NaN'){
                return '';
            }else return data;
        },
        //Validate Form hợp lệ
        
        EmployeeCodeValidation(a){
          
            if (a==""|| a=="null") {
                this.checkEmployeeCode = false;

            }
            else {
               this.checkEmployeeCode = true
            }            
        },
        validateEmail(email) {
                if (email) {
                    const re =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                } else return false;
        },
        checkValidNumber(str) {
                return /^\d+$/.test(str.replaceAll('.', ''));
        },
    
        FullNameValidation(a){
           
            if (a==""|| a=="null"||typeof(a) =="undefined") {
                this.checkEmployeeFullName = false;

            }
            else {
               this.checkEmployeeFullName = true;
            }  
        },
        IdentityValidation(id){
            if(id && this.checkValidNumber(id))  this.checkEmployeeIdentityNumber = true;
            else this.checkEmployeeIdentityNumber = false;
        },
        PhoneNumberValidation(id){
            if(id && this.checkValidNumber(id))  this.checkEmployeePhoneNumber = true;
            else this.checkEmployeePhoneNumber = false;
        },
        //Validate email hợp lệ
        EmailValidation(a) {
           if(a && this.validateEmail(a)) this.checkEmployeeEmail = true;
           else this.checkEmployeeEmail = false;
        },
        CheckFull(){
            this.EmployeeCodeValidation(this.employee.EmployeeCode);
            this.FullNameValidation(this.employee.FullName);
            this.IdentityValidation(this.employee.IdentityNumber);
            this.PhoneNumberValidation(this.employee.PhoneNumber);
            this.EmailValidation(this.employee.Email);
            if (
                this.checkEmployeeCode == true &&
                this.checkEmployeeFullName == true &&
                this.checkEmployeeIdentityNumber == true &&
                this.checkEmployeeEmail == true &&
                this.checkEmployeePhoneNumber
            ) {
                this.totalCheck = true;
            } else {
                this.totalCheck = false;
            }
        },
        formatSalary(money){
            if (money) {
                    console.log(money);
                    return money.toString().replaceAll('.', '');
                } else return "0";
        }
    },
    data() {
        return {
            date: null,
            months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
                "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
            focusFirstInput: true,
            // showToast : false
            checkEmployeeCode: true,
            checkEmployeeFullName: true,
            checkEmployeeIdentityNumber: true,
            checkEmployeeEmail: true,
            checkEmployeePhoneNumber: true,
            totalCheck: false,
            select: {
                genderOptions:[
                    {
                        GenderName: 'Nam',
                        Gender: 1,
                    },
                    {
                        GenderName: 'Nữ',
                        Gender: 0,
                    },
                    {
                        GenderName: 'Không xác định',
                        Gender: 2,
                    },
                ],

            }
        
        }
    },
    
})
</script>

<style scoped>
@import url('../../../style/base/test.css');
/* v-select .vs__dropdown-toggle {
    background: red !important;
  } */ 
/* .v-select.drop-up.vs--open .vs__dropdown-toggle {
    border-radius: 0 0 4px 4px;
    border-top-color: transparent;
    border-bottom-color: rgba(60, 60, 60, 0.26);
    height: 36px;
  } */

.abc{
    margin: 0px;;
    padding: 0px;
}
.a{
    margin-left: 12px;
    /* box-sizing: border-box; */
}
.vs__dropdown-toggle{
    height:35px;
}
/* .vs--disabled .vs__clear,
.vs--disabled .vs__dropdown-toggle,
.vs--disabled .vs__open-indicator,
.vs--disabled .vs__search,
.vs--disabled .vs__selected {
    cursor: not-allowed;
    background-color: #f8f8f8
}
.vs__dropdown-option--highlight {
    background: #019160;
    color: #fff
} */
.vs__selected-options{
    font-family: GoogleSans-Regular;
}
.v-select {
    position: relative;
    font-family: inherit
}




/*# sourceMappingURL=vue-select.css.map*/
.error-required{
    display: none;
}
.error-dialog{
    border: 1px solid red !important;
}
.dialog_hide {
    display:none;
}
.model {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #000000;
    opacity: .4;
}

.dialog-content {
    position: fixed;
    width: 700px;
    height: 732px;
    top: calc(50% - 366px);
    left: calc(50% - 350px);
    background-color: white;
    border-radius: 4px;
}
.dialog-content .dialog_header{
    display:flex;
    height: 48px;
}

.dialog_header .dialog_title {
    width: 80%;
    height: 48px;
    padding-left:24px;
    padding-top: 24px;
    font-weight: bold;
    font-size: 20px; 
}


.dialog_middle {
    height: 574px;
    padding: 24px;
    display:flex;
}

.column1{
    text-align: center;
    height: 100%;
    margin-right: 16px;
}

.column2{
    width: 100%;
}

.column2 .border{
    height:4px;
    width: 84px;
    margin-top:6px;
    margin-bottom: 6px;
    background-color:#019160;
}

.blank_box {
    height: 30px;
    width: 212px;
    margin-right: 12px;
    margin-top:4px;
    margin-bottom:6px;
    border-radius: 5px;
    border: 2px solid #dedede;
    padding-left: 16px;
    background-color: transparent;
}

.blank_box_invalid {
    border-color: #F65454;
    outline: none;
}
.InvalidEmail {
    display: none;
}

.date_box {
    height: 32px;
    width: 214px;
    margin-right: 12px;
    margin-top:4px;
    margin-bottom:8px;
    border-radius: 5px;
    border: 2px solid #dedede;
    padding-left: 16px;
}

.select_box{
    height: 36px;
    width: 235px;
    margin-right: 12px;
    margin-top:4px;
    margin-bottom:8px;
    border-radius: 5px;
    border: 2px solid #dedede;
    padding-left: 13px;
}
.dialog_footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #e5e5e5;
    border-radius: 0px 0px 4px 4px;
}
input, .select_box {
  font-family: GoogleSans-Regular;
  font-size: 12px;
}

@font-face {
  font-family: "GoogleSans-Regular";
  src: url("../../../assets/font/GoogleSans-Regular.otf") format("opentype");
}
.blank_box:focus, .date_box:focus, .select_box:focus{
    border-color: #01b075;
    outline: none;
}

.blank_box:hover, .date_box:hover, .select_box:hover{
    border-color: #01b075;
}
.wrapper {
    position: relative;
}
.wrapper::after {
    position: absolute;
    right: 27px;
    top: 14px;
    content: attr(data-placeholder);
    font-style: italic;
}

#salary_input{
    text-align:right;
    padding-right: 56px;
    width: 159px;
}
</style>