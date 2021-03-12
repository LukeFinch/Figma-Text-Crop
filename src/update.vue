<template>
<div id="ui">
<div id="updateButtons">
   <div class="switch">
    <input class="switch__toggle" type="checkbox" id="autoSwitch"  v-model="autoUpdate" @change="handleAutoUpdate">
    <label class="switch__label" for="autoSwitch">Auto Crop</label>
  </div>
  <button class="button button--primary flex-grow justify-content-center" :disabled="autoUpdate" @click='updateInstances' ><span v-if="autoUpdate">Cropping</span><span v-else>Crop</span></button>
  </div>

<Disclosure heading="Settings" :section="true" :expanded="false">

   
    <h2 class="type type--large type--bold mt--medium">Crop to Grid</h2>
    
     
    <div class="input input--with-icon flex row">
    <div class="icon icon--paragraph-spacing"></div>
    <input type="number" class="input__field" style="text-align: right" name="gridSize" @input="handleGridSize" min="0" v-model="gridSize">
    <label class="label">px</label>
    </div>

    <div class="onboarding-tip__msg">Rounds the size of the frame.<br>Leave at 0 for no rounding</div>

    <h2 class="type type--large type--bold mt--medium">Crop Frequency</h2>
    
     
    <div class="input input--with-icon flex row">
    <div class="icon icon--timer"></div>
    <input type="number" class="input__field" style="text-align: right" name="frequency" min="10" max="99999" v-model="updateFrequency">
    <label class="label">ms</label>
    </div>
    <div  class="onboarding-tip__msg">Here you can set how often Auto Crop crops your instances</div>
    <!-- <section v-if="updateFrequency == 8080" >
    
    <h2 class="type type--large type--bold mt--medium">Replace Keys</h2>  
     
    <div class="input input--with-icon flex row">
    <div class="icon icon--key"></div>
    <input  class="input__field" style="text-align: right" name="componentKey" v-model="componentKey">
 
    </div>
   <button class="button button--primary flex-grow justify-content-center"  @click='updateLegacies' >Replace Old</button>
    <button class="button button--primary flex-grow justify-content-center"  @click='swapText' >Swap Text Layer</button>
    <div class="onboarding-tip__msg">This is a secret! replace the component key here</div>
    </section>   -->

</Disclosure>
  </div>
</template>

<script>
import  'figma-plugin-ds/dist/figma-plugin-ds.css'
import { dispatch, handleEvent } from "./uiMessageHandler";
import {ref, onMounted, watchEffect} from "vue"
import  Disclosure  from './components/Disclosure.vue'


const autoUpdate = ref(false)
const updateFrequency = ref(50)
const gridSize = ref(0)
const componentKey = ref('a46bf185241459316d7c3843a39027b19ce27032')







export default {
  components: {
    Disclosure
  },
  props: {
    message: ""
  },  
  setup(props) { 
  onMounted(() => {

            const resizeObserver = new ResizeObserver(function () {
          dispatch('resizeUI', [app.scrollWidth, app.scrollHeight])
        });
        resizeObserver.observe(app)

      handleEvent('gridSize', size => {
        gridSize.value = size
      })

      handleEvent('componentKey',key =>{
        componentKey.value = key
      })

  })

  function handleGridSize(){
    dispatch('gridSize', gridSize.value)
  }


 

  function dispatchUpdate(){
    if(autoUpdate.value === true){

      dispatch('updateInstances', 'clock')
    }
    //dispatch('autoUpdate')
  }



  function handleAutoUpdate(){
    if(autoUpdate.value === true){
      setTimeout(() => {
        dispatchUpdate()
        handleAutoUpdate()
      }, updateFrequency.value)
    }
  }

   function updateInstances(){
     dispatch("updateInstances")
   }

   function updateLegacies(){
     dispatch("updateLegacies", componentKey.value)
   }
   function swapText(){
         dispatch("swapText", componentKey.value)
   }
    
  return {
    props,
    updateInstances,
    autoUpdate,
    handleAutoUpdate,
    dispatchUpdate,
    updateFrequency,
    handleGridSize,
    gridSize,
    updateLegacies,
    componentKey,
    swapText
  }
}
}
</script>

<style>
#app{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>

<style scoped>

.button--withIcon{
  padding: 0 calc(var(--size-xsmall) + 1px) 0 calc(var(--size-xxsmall) + 1px) !important;
}

#ui{
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
}

#updateButtons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: var(--size-xsmall) var(--size-xxsmall);
}

.banner{
  width: 100%;
  padding: var(--size-xxsmall) var(--size-medium);
  background: var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
  max-height: 100px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0;
}

.onboarding-tip{
  align-items: flex-start;
  padding: 0;
}


.onboarding-tip > .icon {
  margin-right: var(--size-xxsmall);
  min-width: var(--size-medium);
}



input::-webkit-outer-spin-button, 
input::-webkit-inner-spin-button { margin-left: var(--size-xxsmall) } 

</style>