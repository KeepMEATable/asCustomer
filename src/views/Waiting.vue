<template>
  <div class="waiting md-layout-item">
    <h2>Waiting for a table...</h2>
    <v-btn v-on:click="$store.dispatch('cancelFlash')">Cancel</v-btn>
    <v-btn color="success" v-on:click="$store.dispatch('tableIsReady')">Ready!</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Waiting extends Vue {}
</script>
