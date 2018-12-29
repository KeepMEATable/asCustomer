<template>
  <v-layout row>
    <v-flex>
      <carousel :per-page="1">
        <slide>
          <div class="flex display-3 font-weight-bold">{{ $vuetify.t('home.welcome') }}</div>
          <div class="flex subheading font-weight-light">
            TakeMEATable is free to use!<br><br>
            <p class="justify-start">It prevent you from waiting in a queue,<br/> and will warn you at the right time.</p>
            <v-card>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>Waiting for a table at a restaurant...</v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-content>Waiting for a meal to be cooked...</v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-content>Waiting for a package to be prepared...</v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-content>Any waiting situation really!</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
            <br>
            It's simple and works in a few steps.
          </div>
        </slide>
        <slide>
          <div class="flex display-3 font-weight-bold">Present<br/> your QrCode.</div>
          <div class="flex subheading font-weight-light">
            <br>
            <v-card class="elevation-0"><br><QrCode/><br></v-card>
          </div>
        </slide>
        <slide>
          <div class="flex display-3 font-weight-bold">Wait<br/> for your turn.</div>
          <div class="flex subheading font-weight-light">
            <br>
            <p class="justify-space-around">
              The application detects that the QrCode has been flashed and redirect you in the waiting room. <br>
              You can do anything you want until then (shopping, grab a couple of beers, run a marathon, etc) :)
            </p>
          </div>
        </slide>
        <slide>
          <div class="flex display-3 font-weight-bold">Changed your mind?</div>
          <div class="flex subheading font-weight-light">
            <br>
            <p>Nothing to worry, you can always cancel and leave the waiting room.</p>
          </div>
        </slide>
        <slide>
          <div class="flex display-3 font-weight-bold">It's your turn?</div>
          <div class="flex subheading font-weight-light">
            <br>
            <p>The application will receive a signal,<br/> so as you ;)</p>
          </div>
        </slide>
        <Slide>
          <v-btn outline large fab color="indigo" v-on:click="$store.dispatch('start')">
            Start
          </v-btn>
        </Slide>
      </carousel>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
import QrCode from '@/components/QrCode.vue';

@Component({
  components: {
    Carousel,
    Slide,
    QrCode,
  },
})
export default class Home extends Vue {}
</script>
