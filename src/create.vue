<template>
<div id="ui">
    <div id="options">
<div id="inputWrapper">
  <label class="label" for="gridSizeInput">Baseline Grid</label>
  <div class="input input--with-icon">
  <div class="icon icon--paragraph-spacing"></div>
  <input type="number" id="gridSizeInput" min=0 v-model="gridSize" class="input__field" >
</div>
</div>
<button class="button button--primary" @click='createNode'>Create Components</button>

</div>
<Disclosure heading="Help">

    To get started with Text Crop, you need to create a set of variants for all of your text styles.
    If your designs follow a baseline grid, you can set that here, or leave it at zero for no baseline rounding.

</Disclosure>
</div>
</template>

<script>
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'
import { dispatch, handleEvent } from "./uiMessageHandler";
import {ref, onMounted, watchEffect} from "vue"
import { setInterval } from 'timers';
import Disclosure from './components/Disclosure.vue';

const gridSize = ref(0)
const fontsLoaded = ref(false)
const autoUpdate = ref(false)
const updateFrequency = ref(500)
export default {
  components: { Disclosure },
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



  
  function  createNode() {
      // This shows how the UI code can send messages to the main code.
      console.log('dispatching')
      dispatch("createNode", gridSize.value);
    }

    
  return {
    props,
    gridSize,
    createNode,
  }
}
}

</script>

<style scoped>

.icon--paragraph-spacing{
background-image: url(./assets/icons/paragraph-spacing.svg);

}

#options{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}
#inputWrapper{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
#ui{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-xxsmall);
}
</style>