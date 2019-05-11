<template>
  <div class="waiting md-layout-item">
    <h2>Waiting for a table...</h2>
    <p><v-icon class="wb_waiting" color="blue">watch_later</v-icon></p>
    <div class="timer" v-if="days || hours || minutes || seconds">
      <div class="day" v-if="days">
        <span class="number">{{ days }}</span>
        <div class="format">days</div>
      </div>
      <div class="hour" v-if="hours">
        <span class="number">{{ hours }}</span>
        <div class="format">hours</div>
      </div>
      <div class="min" v-if="minutes">
        <span class="number">{{ minutes }}</span>
        <div class="format">minutes</div>
      </div>
      <div class="sec" v-if="seconds">
        <span class="number">{{ seconds }}</span>
        <div class="format">seconds</div>
      </div>
    </div>
    <div v-else>
      Please wait, we are almost here, it shouldn't take too long :)
    </div>
    <v-btn v-on:click="$store.dispatch('reset')">Cancel</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Waiting extends Vue {
  public days = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  public interval = 0;

  public mounted() {
    this.$store.dispatch('start').then(() => {

      const d = new Date();
      const now = d.getTime() / 1000;
      const localOffset = d.getTimezoneOffset() * 60;

      const start = Math.round(Date.parse(this.$store.state.awaitStartedAt) / 1000) + localOffset;
      const end = start + parseInt(this.$store.state.estimatedDelay, 0);

      this.timerCount(start, end);
      this.interval = setInterval(() => {
        this.timerCount(start, end);
      }, 1000);
    });

  }

  public timerCount(start: number, end: number) {
    // Get todays date and time
    const d = new Date();
    const now = Math.round(d.getTime() / 1000);

    // Find the distance between now an the count down date
    const distance = start  - now;
    const passTime = end - now;

    if (distance < 0 && passTime < 0) {
      clearInterval(this.interval);
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      return;

    } else if (distance < 0 && passTime > 0) {
      this.calcTime(passTime);

    } else if ( distance > 0 && passTime > 0 ) {
      this.calcTime(distance);
    }
  }

  public calcTime(dist: number) {
    // Time calculations for days, hours, minutes and seconds
    this.days = Math.floor((dist * 1000) / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(((dist * 1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor(((dist * 1000) % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor(((dist * 1000) % (1000 * 60)) / 1000);
  }
}
</script>

<style lang="scss" scoped=true>
  .wb_waiting {
    font-size: 30vmin;
  }

  .timer {
    font-size: 20px;
    color: #fff;
    text-align:center;
    margin-top: 50px;

    .day, .hour, .min, .sec {
      font-size: 30px;
      display: inline-block;
      font-weight: 500;
      text-align: center;
      margin: 0 5px;
      .format {
        color: #000;
        font-weight: 300;
        font-size: 14px;
        opacity: 0.8;
        width: 60px;
      }
    }

    .number{
      background: rgba(51, 51, 51, 0.53);
      padding: 0 5px;
      border-radius: 5px;
      display: inline-block;
      width: 60px;
      text-align: center;
    }
  }
</style>
