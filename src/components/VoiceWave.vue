<template>
    <div  class="vioce-wave-wrapper"> 
        <span class="voice-icon-bar voice-icon-bar1" :class="{'voice-icon-play1':playId == id && play}"></span>
        <span class="voice-icon-bar voice-icon-bar2" :class="{'voice-icon-play2':playId == id && play}"></span>
        <span class="voice-icon-bar voice-icon-bar3" :class="{'voice-icon-play3':playId == id && play}"></span>
        <span class="voice-icon-bar voice-icon-bar4" :class="{'voice-icon-play4':playId == id && play}"></span>
        <span class="voice-icon-bar voice-icon-bar5" :class="{'voice-icon-play5':playId == id && play}"></span>
    </div>
</template>
<script>
export default {
  name: 'VoiceWave',
  props: {
    id:{
      type: Number,
      required: true
    },
    play:{
      type: Boolean,
      default: false
    },
    playId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
   
    }
  },
  methods:{
 
  }
}
</script>
<style scoped>
.vioce-wave-wrapper{
  align-items: center;
  display: flex;
}
.vioce-wave-wrapper .voice-icon-bar{
  display: block;
  width:3px;  
  margin-left: 3px;  
  border-radius: 50px;    
  background-color: #55cbc4;  
}

@keyframes voicePlay{  
    0%{  
        height: 6px;
    }  
    20%{  
        height: 14px;  
    }  
    50%{  
        height: 20px;  
    }  
    80%{  
        height: 14px;      
    }  
    100%{  
        height: 6px;  
    }  
}         

.vioce-wave-wrapper .voice-icon-bar1{  
    margin-left: 10px;
    height: 6px;
}  
.vioce-wave-wrapper .voice-icon-bar2{  
    height: 14px;
}  
.vioce-wave-wrapper .voice-icon-bar3{  
    height: 20px;
}  
.vioce-wave-wrapper .voice-icon-bar4{  
    height: 14px;
}  
.vioce-wave-wrapper .voice-icon-bar5{  
   margin-right: 10px;
   height: 6px; 
}  
.voice-icon-play1{
    animation:voicePlay 0.6s infinite 0.1s;  
   -webkit-animation:voicePlay 0.6s infinite 0.1s;  
}
.voice-icon-play2{
   animation:voicePlay 0.6s infinite 0.2s;  
   -webkit-animation:voicePlay 0.6s infinite 0.2s;  
}
.voice-icon-play3{
    animation:voicePlay 0.6s infinite 0.3s;  
   -webkit-animation:voicePlay 0.6s infinite 0.3s;  
}
.voice-icon-play4{
   animation:voicePlay 0.6s infinite 0.4s;  
   -webkit-animation:voicePlay 0.6s infinite 0.4s;  
}
.voice-icon-play5{
   animation:voicePlay 0.6s infinite 0.5s;  
   -webkit-animation:voicePlay 0.6s infinite 0.5s; 
}
</style>