<template>
  <div class="QrCode">
    <QrCode/>
    <v-btn color="success" v-on:click="$store.dispatch('hasBeenFlashed')">
       Flash!
    </v-btn>
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
export default class Tag extends Vue {}
</script>
