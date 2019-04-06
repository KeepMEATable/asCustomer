<template>
  <div class="waiting md-layout-item">
    <h2>Waiting for a table...</h2>
    <p><v-icon class="wb_waiting" color="blue">watch_later</v-icon></p>
    <v-btn v-on:click="$store.dispatch('reset')">Cancel</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Waiting extends Vue {
  public mounted() {
    this.$store.dispatch('start');
  }
}
</script>

<style scoped=true>
  .wb_waiting {
    font-size: 30vmin;
  }
</style>
