<template>
  <div class="waiting md-layout-item">
    <h2>Table is ready!</h2>
    <p><v-icon class="wb_ready" color="green">thumb_up</v-icon></p>
    <v-btn color="success" v-on:click="$store.dispatch('reset')">
      Dismiss!
    </v-btn>
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
  .wb_ready {
    font-size: 30vmin;
  }
</style>
