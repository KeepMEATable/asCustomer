<template>
  <div class="waiting md-layout-item">
    <h2>Table is ready!</h2>
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
