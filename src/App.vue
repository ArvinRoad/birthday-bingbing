<template>
  <audio ref="audioRef" loop autoplay muted src="https://music.163.com/song/media/outer/url?id=1868535933.mp3"></audio>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'

const audioRef = ref(null)

const playGlobalAudio = () => {
  audioRef.value.muted = false
  audioRef.value?.play().catch(err => console.log('音频播放：', err))
}

onMounted(() => {
  playGlobalAudio()
  document.addEventListener('click', playGlobalAudio, { once: true })
})

provide('playGlobalAudio', playGlobalAudio)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: linear-gradient(135deg, 
    #0a0806 0%, 
    #1a150f 25%, 
    #0f0b07 50%, 
    #050402 75%, 
    #000000 100%);
}
#app {
  width: 100%;
  height: 100%;
}
</style>