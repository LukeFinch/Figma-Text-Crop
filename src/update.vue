<template>
<transition name=fade>
<div v-if="!isBound" class="banner">
    <div class="onboarding-tip">
    <div class="icon icon--white icon--warning"></div>
    <div class="onboarding-tip__msg type type--small type--medium type--inverse" style="color: var(--white)">You must bind to a text crop component before updating</div>
    </div>

</div>
</transition>
<div id="ui">
<div id="updateButtons">
   <div class="switch">
    <input class="switch__toggle"  :disabled="!isBound" type="checkbox" id="autoSwitch"  v-model="autoUpdate" @change="handleAutoUpdate">
    <label class="switch__label" for="autoSwitch">Auto Update</label>
  </div>
  <button class="button button--primary flex-grow justify-content-center" :disabled="autoUpdate || !isBound" @click='updateInstances' ><span v-if="autoUpdate">Updating</span><span v-else>Update</span></button>
  </div>

<Disclosure heading="Settings" :section="true" :expanded="!initialIsBound">

    <h2 class="type type--large type--bold">Binding</h2>
    <div class="flex column justify-content-between align-items-center">

    <div v-if="isBound" class="mb-xxsmall">
      <span class="type type--small">Bound to <span class="type--medium">{{boundName}}</span> in <span class="type--medium">{{boundDoc}}</span></span>
    </div>
     <div v-else class="mb-xxsmall">
      <span class="type type--small">Select a Text Crop component to bind to</span>
    </div>

    <div class="flex row justify-content-center align-items-center">
    
        <button v-if="isBound" class="button button--withIcon" :class="{'button--secondary': !hoverButton, 'button--secondary-destructive': hoverButton, }" @click='unbindComponentSet($event)' @mouseover="hoverButton = true" @mouseleave="hoverButton = false">
        <div class="icon"
        :class="{
          'icon--hyperlink': !hoverButton,
          'icon--break': hoverButton,
          'icon--red': hoverButton
          }"></div>
        Unbind
        </button>        
     
        <button v-else class="button  button--withIcon" :class="{'button--primary': bindable, 'button--secondary': !bindable}" :disabled="!bindable" @click="bindComponentSet">
        <div class="icon icon--hyperlink" :class="{'icon--white': bindable}"></div>
        Bind
      </button>  
     
     </div>
    </div>
 
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
const isBound = ref(true)
const boundName = ref(String)
const boundDoc = ref(String)
const boundId = ref(String)
const boundKey = ref(String)
const initialIsBound = ref(Boolean)


const bindable = ref(false)


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



    handleEvent("nodeCreated", nodeID => {
      props.message = `Node ${nodeID} was created!`;
    });


 
 handleEvent("bindable", (data) => {
   console.log("Set bindable to:", data)
   bindable.value = data
 })

 handleEvent("bindingData", (data) => {
    boundName.value = data[0]
    boundDoc.value  = data[1]
    boundId.value   = data[2]
    boundKey.value  = data[3]

    isBound.value = !data.some(n => typeof n == 'undefined')
   
    if(initialIsBound.value == null){
      initialIsBound.value = isBound.value
    }

 })
 handleEvent("bindingNotFound", () => {
   isBound.value = false
 })

  })

  function bindComponentSet($event){
    if($event.shiftKey){
      console.log('clearing bindings')
      dispatch('clearBindings')
    } else {
      dispatch('bindComponentSet')
    }
  }
  function unbindComponentSet($event){
    dispatch('clearBindings')
  }

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
    isBound,
    initialIsBound,
    boundName,
    boundDoc,
    boundId,
    boundKey,
    props,
    updateInstances,
    autoUpdate,
    handleAutoUpdate,
    dispatchUpdate,
    updateFrequency,
    bindComponentSet,
    unbindComponentSet,
    bindable,
    hoverButton 
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