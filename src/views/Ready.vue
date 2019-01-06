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
import Notification from '@/lib/Notifications';

@Component({
  components: {
    Notification,
  },
})
export default class Waiting extends Vue {
  public mounted() {
    Notification(this.$store.state.uid);
  }
}
</script>
