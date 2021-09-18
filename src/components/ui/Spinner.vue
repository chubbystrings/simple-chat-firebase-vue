<template>
  <div class="spin"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

interface PROPS {
    width?: string;
    height?: string
}
export default defineComponent({

  setup(props: PROPS) {
      const width = computed(() => props.width ? props.width + 'px' : '40px')
      const height = computed(() => props.height ? props.height + 'px' : '40px')
      return { width, height}
  },
});


</script>

<style scoped>
.spin {
    margin: 0 auto;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    display: block;
    border: 3px solid transparent;
    border-top-color: #5ae4ca;
    animation: spin 1s ease infinite;
}

    @keyframes spin {
        to {
            transform: rotateZ(360deg)
        }
    }
</style>