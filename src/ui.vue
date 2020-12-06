<template>
<div id="ui">
  <label for="gridSize">Baseline Grid size (0 for no grid rounding)</label>
  <input v-model="gridSize" type=number/>
	<button class="button button--primary" @click='createNode'>Create text crop variants</button>
  <button class="button button--primary" @click='updateInstances' :disabled='!fontsLoaded'>Update Instances</button>
	<p class="type type--pos-small-normal"> {{props.message}} </p>
</div>
</template>

<script>
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'
import { dispatch, handleEvent } from "./uiMessageHandler";
import {ref, onMounted} from "vue"

const gridSize = ref(0)
const fontsLoaded = ref(false)
export default {
  props: {
    message: ""
  },  
  setup(props) { 
  onMounted(() => {
    dispatch("preloadFonts")
    // Add these lines to initialize the interactive figma-ui components as needed.
    // The following shows how messages from the main code can be handled in the UI code.
    handleEvent("nodeCreated", nodeID => {
      props.message = `Node ${nodeID} was created!`;
    });

  handleEvent("fontsLoaded", () => {
    fontsLoaded.value = true
  })

  })
  function  createNode() {
      // This shows how the UI code can send messages to the main code.
      console.log('dispatching')
      dispatch("createNode", gridSize.value);
    }
   function updateInstances(){
     dispatch("updateInstances")
   } 
    
  return {
    props,
    gridSize,
    createNode,
    updateInstances,
    fontsLoaded
  }
}
}
</script>

<style scoped>
#ui{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-medium);
}
</style>