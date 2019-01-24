<template>
  <div class="waiting md-layout-item">
    <h2>Waiting for a table...</h2>
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
