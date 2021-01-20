<template>
<div id="ui">
<div id="updateButtons">
   <div class="switch">
    <input class="switch__toggle" type="checkbox" id="autoSwitch"  v-model="autoUpdate" @change="handleAutoUpdate">
    <label class="switch__label" for="autoSwitch">Auto Update</label>
  </div>
  <button class="button button--primary flex-grow justify-content-center" :disabled="autoUpdate" @click='updateInstances' ><span v-if="autoUpdate">Updating</span><span v-else>Update</span></button>
  </div>

<Disclosure heading="Settings" :section="true" :expanded="false">

 
    <h2 class="type type--large type--bold mt--medium">Update Frequency</h2>
    
     
    <div class="input input--with-icon flex row">
    <div class="icon icon--timer"></div>
    <input type="number" class="input__field" style="text-align: right" name="frequency" min="10" max="99999" v-model="updateFrequency">
    <label class="label">ms</label>
    </div>

    <div class="onboarding-tip__msg">Here you can set how often Auto Update resizes your instances</div>
    


</Disclosure>
  </div>
</template>

<script>
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'
import { dispatch, handleEvent } from "./uiMessageHandler";
import {ref, onMounted, watchEffect} from "vue"
import { setInterval } from 'timers';
import  Disclosure  from './components/Disclosure.vue'
import { once } from 'events';

const autoUpdate = ref(false)
const updateFrequency = ref(50)

const hoverButton = ref(false)






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


  })

 

  function dispatchUpdate(){
    if(autoUpdate.value === true){

      dispatch('updateInstances')
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
    
  return {
    props,
    updateInstances,
    autoUpdate,
    handleAutoUpdate,
    dispatchUpdate,
    updateFrequency,
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