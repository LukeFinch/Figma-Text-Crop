<template>
<ul class="disclosure"> 
  <li class="disclosure__item" v-bind:class="{ 'disclosure--expanded': expanded}" >
    <div class="disclosure__label" v-bind:class="{'disclosure--section': section }">{{heading}}</div> 
    <div class="disclosure__content"><slot /></div>
  </li>


</ul>
</template>
<script>
import { disclosure } from 'figma-plugin-ds'
import { onMounted } from 'vue'


export default {
  name: "Disclosure",
  props: {
        heading: String,
        expanded: Boolean,
        section: Boolean,

    },
  setup(props){


  onMounted( () => {
      disclosure.init() 
    }   
  )
}
}
</script>
<style lang="scss" >





.disclosure__content {
  font-size: var(--font-size-xsmall);
  font-weight: var(--font-weight-normal);
  letter-spacing: var(--font-letter-spacing-pos-xsmall);
  line-height: var(--line-height);
  color: var(--black8);
  padding: var(--size-xxsmall) var(--size-xxsmall) var(--size-xxsmall) var(--size-xsmall);
  display: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  pointer-events: all;
}

.disclosure--section {
  font-weight: var(--font-weight-bold);
}

.disclosure--expanded > .disclosure__content {
  display: block
} 
// .disclosure--expanded .disclosure__content {
//   display: initial;
// }

</style>