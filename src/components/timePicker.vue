<template>
    <time-picker v-model="visible" :data-items="items" @change="onValuesChange">
      <div class="time-picker-top" slot="top-content">
        <span class="cancel-btn" @click="hideTimePicker">取消</span>
        <span class="tips-text">请选择时间</span>
        <span class="submit-btn" @click="submitTimePicker">确定</span>
      </div>
      <!-- <div class="bottom-content" slot="bottom-content">Bottom of the content.</div> -->
    </time-picker>
</template>
<script>
import Picker from 'vue-3d-picker';
export default {
  name: 'timePicker',
  components:{
    'time-picker': Picker
  },
  data () {
    return {
      visible:false,
      items: [],
      items0: [
        {
          values: ['00', '01', '02', '03', '04', '05', '06', 
                   '07', '08', '09', '10', '11', '12', '13', 
                   '14', '15', '16', '17', '18', '19', '20',
                   '21', '22', '23'],
        }, 
        {
          values: ['00', '05', '10', '15', '20', '25', '30', 
                   '35', '40', '45', '50', '55'],
        }
      ],
      items1: [
        {
          values: ['06', '07', '08', '09', '10', '11'],
        }, 
        {
          values: ['00', '05', '10', '15', '20', '25', '30', 
                   '35', '40', '45', '50', '55'],
        }
      ],
      items2: [
        {
          values: ['12','13', '14', '15', '16', '17'],
        }, 
        {
          values: ['00', '05', '10', '15', '20', '25', '30', 
                   '35', '40', '45', '50', '55'],
        }
      ],
      items3: [
        {
          values: ['18', '19', '20', '21', '22', '23'],
        }, 
        {
          values: ['00', '05', '10', '15', '20', '25', '30', 
                   '35', '40', '45', '50', '55'],
        }
      ],
      hour:'00',
      minute:'00',
    }
  },
  props: {
      counts: {
        type: Number,
        default: 60
      },
      /*
      * type 0-全天,1-上午，2-下午，3-晚上
      */
      type: {
        type: Number,
        default: 0
      },
      show: {
        type: Boolean,
        default: false
      },
      onEnd: {
        type: Function,
        default: undefined,
        require: false
      }
    },
  methods:{
    hideTimePicker(){
       this.visible = false;
    },
    submitTimePicker(){
      this.$emit('submite',this.hour,this.minute);
      this.hideTimePicker();
    },
    onValuesChange(h,m){
      this.hour = h;
      this.minute = m;
    },
    checkType(type){
      switch(type){
        case 1:
          this.items = this.items1;
          break;
        case 2:
          this.items = this.items2;
          break;
        case 3:
          this.items = this.items3;
          break;
        default:
          this.items = this.items0;
      }  
    }
  },
  watch:{
    'visible':function(val){
      this.$emit('update:show', val)
    },
    'show':function(val){
      this.visible = val;
    },
    'type':function(val){
        this.checkType(val);
    }
  },
  mounted(){
    this.checkType(this.type)
  },
  destroyed(){
   
  }
}
</script>

<style>

   .picker-backdrop,.picker-wrapper{
    position: fixed!important;
   }
  .picker-wrapper .time-picker-top{
    background-color: #fff;
    line-height: 46px;
    display: flex;
    padding:0 15px;
    justify-content: space-between;
    background-color: #eee;
  }
  .picker-wrapper .picker-content{
    background: #f6f6f6;
  }
  .picker-wrapper .picker-item{
    font-size: 18px;
  }
  .picker-wrapper .cancel-btn,
  .picker-wrapper .submit-btn{
    font-size: 15px;
    color: #f90;
  }
  .picker-wrapper .picker-helper:before{
    border-color: #ddd;
  }
</style>
