<template>
  <div class="container">
    <div class="combo-box" 
    :class="{'clicked ': isOpen}"
    >
      <input ref="input" type="text" autocomplete="off"  v-model="selection"
      @keyup.down="down"
      @keyup.up="up"
      @keyup.enter="enter"
      @keydown.tab="tab"
      @input="inputChange"
      
      />
      <i :class="{'fas fa-chevron-down' : !isOpen, 'fas fa-chevron-up' : isOpen}" @click="onClick()"></i>
    </div>
    <ul class="content" v-if="isOpen" >
      <li v-for="(item,index) in dataForm" :key="index" :class="{'isActive' : item.isClick, 'isHover' : item.isHover}" @click ="Choose(item.name,index,item.id)">
        <i class="fas fa-check" :class="{'e5e5e5' : item.isHover}" @keyup.enter="chooseOption(item.name,item.id)"></i>{{item.name}} </li>
      <!-- <li><i class="fas fa-check"></i>2</li>
      <li><i class="fas fa-check"></i>3</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseComboBox",
  created() {
      console.log(this.$store.state.dataForm[this.type]);
  },
   watch: {
    selection (newValue) {
      this.$emit('update:parentValue', newValue);
    },
    parentValue (newValue) {
      this.content = newValue;
    }
  },
  props: {
    type: String,
    text: String,
    parentValue: {},

    // cbxId: String,
    // router: String,
    // idName: String,
    // valueName: String,
    // text: String,
    
  },
  computed:{
        dataForm(){
          return this.$store.state.dataForm[this.type];
        }
        
    },
  data() {
    return {
      isOpen: false,
      // fas: "fas fa-chevron-down",
      current: -1,
      data: [],
      selection: this.parentValue,
    }
  },  
  methods: {

    onClick() {
      
      this.$refs.input.focus();
      this.isOpen = !this.isOpen;
    },
    inputChange(){
      
    },
    Choose(content,index,id){
       this.$emit('Choose',this.type,id,content);
      console.log(id);
       let payload= {};
       payload.type = this.type;
       payload.index = index;
      //  this.text = this.dataForm[index].name;
      this.selection = content;
      console.log(this.selection);
       this.$store.commit('TOGGLE_CLICK',payload);
      //  console.log(this.$store.state.dataDepartment[index].isClick);
       this.isOpen = false;
    },
    chooseOption(content,id){
      this.$emit('Choose',this.type,id,content);
    },
    up(){
      if(this.current>0) this.current --;
      let payload= {};
       payload.type = this.type;
       payload.index = this.current;
      this.$store.commit('TOGGLE_HOVER',payload);
    },
    enter(){
      
      this.isOpen = !this.isOpen;
      if(!this.isOpen){
        let payload= {};
       payload.type = this.type;
       payload.index = this.current;
       
        let id = this.dataForm[this.current].id
        let content = this.dataForm[this.current].name
        this.$emit('Choose',this.type,id,content);
        this.selection = this.dataForm[this.current].name;
      this.$store.commit('TOGGLE_CLICK',payload);
      }
      
      // this.isOpen = false;
    },
    down(){
      if(!this.isOpen)
        this.isOpen = true;  
      if(this.current<3) this.current ++;
      
      let payload= {};
       payload.type = this.type;
       payload.index = this.current;
      this.$store.commit('TOGGLE_HOVER',payload);
      },
    tab(){
      this.isOpen = false;
    }
      
    },
  
}


</script>

<style scoped>
.isActive {
  background-color: #019160 !important;
}
.isHover{
  background-color:#e5e5e5;
}
.e5e5e5{
  color : #e5e5e5 !important;
}
.container {
  height: 30px;
  width: 222px;
  position: relative;
  margin-bottom: 6px;
}
.combo-box {
  display: flex;
  margin-bottom: 6px;
  
  width: 232px;
  height: 34px;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  
}
.combo-box.require {
  border-color: #f65454;
}
.combo-box.clicked,
.combo-box:hover {
  border-color: #019160;
}
.combo-box input {
  width: 100%;
  height: 30px;
  padding-left: 16px;
  outline: none;
  border: none;
  border-radius: 4px 0 0 4px;
  border-right: 1px solid #bbbbbb;
  font-family: GoogleSans-Regular;
}
.combo-box i {
  border-radius: 0 4px 4px 0;
  line-height: 38px;
  padding: 0 12px;
  cursor: pointer;
}
.combo-box i:hover {
  background-color: #bbbbbb;
}
.content {
  list-style: none;
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: 5px 10px 8px #ccc;
  padding: 4px 0;
  border-radius: 4px;
  margin-top: 0px;
}
.content li {
  height: 40px;
  line-height: 40px;
}
.content li i {
  width: 36px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
.content li.selected {
  background-color: #019160;
  color: #fff;
}
.content li.hover {
  background-color: #e5e5e5;
  color: #000;
}
.content li.hover i {
  color: #e5e5e5;
}
.content li:hover {
  background-color: #e5e5e5;
  color: #000;
}
.content li:hover i {
  color: #e5e5e5;
}
</style>