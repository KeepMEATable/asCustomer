<template>
  <div class="QrCode">
    <QrCode/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QrCode from '@/components/QrCode.vue';

@Component({
  components: {
    QrCode,
  },
})
export default class Tag extends Vue {
  public mounted() {
    this.$store.dispatch('start');
  }
}
</script>
