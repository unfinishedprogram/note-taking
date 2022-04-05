<template>
  <audio ref="player" >
    <source src="../assets/stories.mp3" type="audio/ogg" />
  </audio>
  <div class="controls">
    <span class="topmenu">
      <div class="infotext">
        {{playbackText}}
      </div>
      <div class="playpause" @click="togglePlayback">
        <img
          :style="!playing ? 'display:none' : ''"
          src="../assets/pause.svg"
        />
        <img :style="playing ? 'display:none' : ''" src="../assets/play.svg" />
      </div>
    </span>
    <div class="timeline_container">
      <div :style="playedStyle" class="timeline_center"></div>
    </div>
  </div>
</template>

<script lang="ts">
import metadata, { metaLog } from "@/metadata";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    src: String,
    callback:Function,
  },

  computed: {
    playedStyle() {
      return `--played-amount:${this.currentTime / this.duration};`;
    },

    playbackText() {
      let min_played = String(Math.floor(this.currentTime / 60)).padStart(2, "0");
      let sec_played = String(Math.floor(this.currentTime % 60)).padStart(2, "0");

      let min_total = String(Math.floor(this.duration / 60)).padStart(2, "0");
      let sec_total = String(Math.floor(this.duration % 60)).padStart(2, "0");

      return `${min_played}:${sec_played}/${min_total}:${sec_total}`
    }
  },
})

export default class AudioPlayer extends Vue {
  playing: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  time_paused: number = 0;

  updatePlayback() {
    this.currentTime = (this.$refs.player as HTMLAudioElement).currentTime;
    if (this.playing) {
      requestAnimationFrame(this.updatePlayback);
    }
  }

  play() {
    metaLog("resumed audio", "info")
    if(this.time_paused){
      metadata.time_paused! += (Date.now() - this.time_paused);
    }
    this.playing = true;
  }

  pause() {
    metaLog("paused audio", "info")
    metadata.times_paused! ++;
    this.time_paused = Date.now();
    this.playing = false;
  }

  togglePlayback() {
    const player = (this.$refs.player as HTMLAudioElement)
    this.duration = player.duration;
    this.playing = !this.playing;
    if (this.playing) {
      player.play();
    } else {
      player.pause();
    }
  }

  mounted() {
    const player = this.$refs.player as HTMLAudioElement;
    metadata.time_paused = 0;
    metadata.times_paused = 0;

    document.addEventListener("keypress", (e) => {
      if (e.key == " ") {
        this.togglePlayback();
      }
    });

    player.addEventListener("ended", () => {
      this.playing = false;
      metaLog("Audio ended", "info");
      (this.$props as any).callback()
    });

    player.addEventListener("play", () => {
      this.playing = true;
      this.updatePlayback();
    });

    player.addEventListener("canplay", () => {
      this.duration = player.duration;
      // player.play();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playpause {
  color: #2c3e50;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  padding: 1rem;
  width: 3rem;
  height: 3rem;
  background-color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.playpause > img {
  width: 3rem;
  height: 3rem;
  filter:drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.25));

}
.playpause:hover {
  transform: scale(1.05);
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
}
.controls > .topmenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.timeline_container {
  width: 100%;
  height: 1rem;
  background-color: #e1e2e1;
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25) inset;
}

.timeline_center {
  width: calc(100% * var(--played-amount));

  height: 1rem;
  background-color: rgb(105, 105, 209);
  border-radius: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  /* box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.25) inset,
    -2px -2px 5px rgba(0, 0, 0, 0.25) inset; */
}
.infotext {
  font-family: monospace;
  font-size: larger;
}
</style>
