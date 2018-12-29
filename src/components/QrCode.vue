<template>
  <div>
    <div class="md-layout md-gutter md-alignment-center-center">
      <div class="md-layout-item">
        <qrcanvas :options="options"></qrcanvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Qrcanvas from 'qrcanvas-vue';

@Component({
  components: {
    Qrcanvas,
  },
})
export default class HelloWorld extends Vue {
  public data() {
    return {
      options: {
        cellSize: 8,
        data: this.$store.state.uid,
      },
    };
  }
}
</script>
