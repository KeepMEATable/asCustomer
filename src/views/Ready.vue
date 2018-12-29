<template>
  <div class="waiting md-layout-item">
    <h2>Table is ready!</h2>
    <v-btn color="success" v-on:click="$store.dispatch('dismiss')">
      Dismiss!
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Waiting extends Vue {}
</script>
