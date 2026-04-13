<template>
  <div class="page">
    <canvas ref="meteorCanvas" class="meteor-canvas"></canvas>
    
    <section class="poster">
      <div class="content">
        <h1>刘冰冰</h1>
        <div class="divider"></div>
        <p class="date">2004.04.14 — 2026.04.14</p>
        <p class="slogan">生日快乐，前路皆为梦途</p>
      </div>
    </section>

    <section class="message">
      <div class="card">
        <div class="text">
          <p>很高兴能认识你。</p>
          <p>愿你在提瓦特自在如风，</p>
          <p>在现实里平安、开心、被温柔以待。</p>
          <p>你对我来说，真的很重要。</p>
          <p class="sign">宋宇辰 · 2026.04.14</p>
        </div>
      </div>
    </section>

    <section class="end">
      <button class="btn" @click="goToStar">✨ 打开星光祝福</button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const playGlobalAudio = inject('playGlobalAudio')
const router = useRouter()
const goToStar = () => {
  playGlobalAudio()
  router.push('/star')
}

const baseUrl = import.meta.env.BASE_URL

const meteorCanvas = ref(null)
let meteorCtx = null
let meteorAnimationId = null
let meteors = []
let stars = []

const isValidNumber = (num) => {
  return !isNaN(num) && isFinite(num) && num >= 0
}

const COLORS = {
  purple: { r: 145, g: 80, b: 170 },
  gold: { r: 200, g: 180, b: 80 },
  lightPurple: { r: 210, g: 200, b: 220 },
  lightGold: { r: 230, g: 220, b: 200 }
}

const METEOR_CONFIG = {
  meteorCount: 5,
  starCount: 100,
  meteorMinSpeed: 1.2,
  meteorMaxSpeed: 2.5,
  meteorMinLength: 60,
  meteorMaxLength: 150,
  meteorMinWidth: 0.5,
  meteorMaxWidth: 1.2,
  trailMinLength: 5,
  trailMaxLength: 8
}

class Star {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight)
  }
  reset(canvasWidth, canvasHeight) {
    this.x = isValidNumber(canvasWidth) ? Math.random() * canvasWidth : 0
    this.y = isValidNumber(canvasHeight) ? Math.random() * canvasHeight : 0
    this.size = Math.random() * 0.8 + 0.1
    this.opacity = Math.random() * 0.4 + 0.1
    this.blinkSpeed = Math.random() * 0.002 + 0.0003
    this.colorRatio = Math.random()
  }
  update() {
    this.opacity += this.blinkSpeed
    if (this.opacity > 0.5) this.opacity = 0.5
    if (this.opacity < 0.1) this.opacity = 0.1
    if (this.opacity >= 0.5 || this.opacity <= 0.1) {
      this.blinkSpeed *= -1
    }
  }
  draw(ctx) {
    if (!isValidNumber(this.x) || !isValidNumber(this.y) || !isValidNumber(this.size)) return
    const r = Math.round(COLORS.lightPurple.r * (1-this.colorRatio) + COLORS.lightGold.r * this.colorRatio)
    const g = Math.round(COLORS.lightPurple.g * (1-this.colorRatio) + COLORS.lightGold.g * this.colorRatio)
    const b = Math.round(COLORS.lightPurple.b * (1-this.colorRatio) + COLORS.lightGold.b * this.colorRatio)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`
    ctx.fill()
  }
}

class Meteor {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight)
  }
  reset(canvasWidth, canvasHeight) {
    const cw = isValidNumber(canvasWidth) ? canvasWidth : window.innerWidth
    const ch = isValidNumber(canvasHeight) ? canvasHeight : window.innerHeight
    this.x = Math.random() * cw * 0.5
    this.y = Math.random() * ch * 0.3
    const baseSpeed = Math.random() * (METEOR_CONFIG.meteorMaxSpeed - METEOR_CONFIG.meteorMinSpeed) + METEOR_CONFIG.meteorMinSpeed
    this.speedX = baseSpeed * 0.8
    this.speedY = baseSpeed * 0.6
    this.length = Math.max(METEOR_CONFIG.meteorMinLength, Math.random() * (METEOR_CONFIG.meteorMaxLength - METEOR_CONFIG.meteorMinLength) + METEOR_CONFIG.meteorMinLength)
    this.width = Math.max(METEOR_CONFIG.meteorMinWidth, Math.random() * (METEOR_CONFIG.meteorMaxWidth - METEOR_CONFIG.meteorMinWidth) + METEOR_CONFIG.meteorMinWidth)
    this.opacity = Math.random() * 0.6 + 0.2
    this.decay = Math.random() * 0.001 + 0.0003
    this.trailLength = Math.round(Math.random() * (METEOR_CONFIG.trailMaxLength - METEOR_CONFIG.trailMinLength) + METEOR_CONFIG.trailMinLength)
  }
  update(canvasWidth, canvasHeight) {
    const cw = isValidNumber(canvasWidth) ? canvasWidth : window.innerWidth
    const ch = isValidNumber(canvasHeight) ? canvasHeight : window.innerHeight
    if (isValidNumber(this.x) && isValidNumber(this.speedX)) {
      this.x += this.speedX
    }
    if (isValidNumber(this.y) && isValidNumber(this.speedY)) {
      this.y += this.speedY
    }
    this.opacity = Math.max(0, this.opacity - this.decay)
    if (this.x > cw + this.length || this.y > ch + this.length || this.opacity <= 0) {
      this.reset(cw, ch)
    }
  }
  draw(ctx) {
    if (!isValidNumber(this.x) || !isValidNumber(this.y) || !isValidNumber(this.length) || this.opacity <= 0) {
      return
    }
    ctx.save()
    const gradX = this.x + this.length * 0.7
    const gradY = this.y + this.length * 0.5
    if (!isValidNumber(gradX) || !isValidNumber(gradY)) {
      ctx.restore()
      return
    }
    const gradient = ctx.createLinearGradient(this.x, this.y, gradX, gradY)
    gradient.addColorStop(0, `rgba(${COLORS.gold.r}, ${COLORS.gold.g}, ${COLORS.gold.b}, ${this.opacity})`)
    gradient.addColorStop(1, `rgba(${COLORS.purple.r}, ${COLORS.purple.g}, ${COLORS.purple.b}, ${this.opacity * 0.3})`)
    ctx.beginPath()
    ctx.strokeStyle = gradient
    ctx.lineWidth = this.width
    ctx.lineCap = 'round'
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(gradX, gradY)
    ctx.stroke()
    for (let i = 1; i < this.trailLength; i++) {
      const trailOpacity = this.opacity * (1 - i/this.trailLength) * 0.5
      if (trailOpacity <= 0.1) continue
      const trailX = this.x + (gradX - this.x) * (i/this.trailLength)
      const trailY = this.y + (gradY - this.y) * (i/this.trailLength)
      const trailSize = this.width * (1 - i/this.trailLength) * 0.6
      if (!isValidNumber(trailX) || !isValidNumber(trailY) || !isValidNumber(trailSize)) continue
      ctx.beginPath()
      ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${COLORS.gold.r}, ${COLORS.gold.g}, ${COLORS.gold.b}, ${trailOpacity})`
      ctx.fill()
    }
    ctx.restore()
  }
}

const initMeteorCanvas = async () => {
  await nextTick()
  if (!meteorCanvas.value) return
  try {
    if (meteorAnimationId) {
      cancelAnimationFrame(meteorAnimationId)
      meteorAnimationId = null
    }
    meteorCtx = meteorCanvas.value.getContext('2d')
    if (!meteorCtx) return
    const w = window.innerWidth || 375
    const h = window.innerHeight || 667
    meteorCanvas.value.width = w
    meteorCanvas.value.height = h
    stars = []
    meteors = []
    initStars()
    initMeteors()
    animateMeteors()
  } catch (e) {}
}

const initStars = () => {
  const { width, height } = meteorCanvas.value || { width: window.innerWidth, height: window.innerHeight }
  for (let i = 0; i < METEOR_CONFIG.starCount; i++) {
    stars.push(new Star(width, height))
  }
}

const initMeteors = () => {
  const { width, height } = meteorCanvas.value || { width: window.innerWidth, height: window.innerHeight }
  for (let i = 0; i < METEOR_CONFIG.meteorCount; i++) {
    meteors.push(new Meteor(width, height))
  }
}

const animateMeteors = () => {
  if (!meteorCtx) return
  try {
    const { width, height } = meteorCanvas.value
    meteorCtx.fillStyle = 'rgba(0, 0, 0, 0.03)'
    meteorCtx.fillRect(0, 0, width, height)
    stars.forEach(star => {
      star.update()
      star.draw(meteorCtx)
    })
    meteors.forEach(meteor => {
      meteor.update(width, height)
      meteor.draw(meteorCtx)
    })
    meteorAnimationId = requestAnimationFrame(animateMeteors)
  } catch (e) {
    setTimeout(() => {
      if (meteorAnimationId) cancelAnimationFrame(meteorAnimationId)
      animateMeteors()
    }, 100)
  }
}

onMounted(() => {
  setTimeout(() => {
    initMeteorCanvas()
  }, 300)
  window.addEventListener('resize', () => {
    if (meteorAnimationId) cancelAnimationFrame(meteorAnimationId)
    setTimeout(initMeteorCanvas, 100)
  })
})

onUnmounted(() => {
  if (meteorAnimationId) cancelAnimationFrame(meteorAnimationId)
  window.removeEventListener('resize', initMeteorCanvas)
})
</script>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #fff;
  position: relative;
  overflow-x: hidden;
  background: #0a0812;
}

.meteor-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  filter: none;
  opacity: 0.9;
}

/* ✅ 这里我帮你彻底修复了！*/
.poster {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url('/birthday-bingbing/images/QunXiang.png') center/cover no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: inset 0 0 10vw rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  padding: 0 5vw;
  text-shadow: 0 0 0.8vw #000,
               0 0 1.5vw rgba(212, 175, 55, 0.9),
               0 0 3vw rgba(156, 39, 176, 0.7);
}

.poster h1 {
  font-size: 10vw;
  font-weight: 800;
  color: #f8f5e6;
  margin-bottom: 2vh;
  text-stroke: 0.5px #d4af37;
  -webkit-text-stroke: 0.5px #d4af37;
}

.divider {
  width: 60vw;
  height: 0.3vh;
  background: linear-gradient(90deg, 
    transparent, 
    #9c27b0, 
    #d4af37, 
    #9c27b0, 
    transparent);
  margin: 0 auto 1.5vh;
  box-shadow: 0 0 1.2vw rgba(156, 39, 176, 0.7);
}

.date {
  font-size: 3.5vw;
  color: #f0e6d2;
  margin-bottom: 1vh;
  letter-spacing: 0.2vw;
  font-weight: 500;
}

.slogan {
  font-size: 3vw;
  color: #f8f5e6;
  opacity: 0.95;
  font-weight: 500;
}

.message {
  width: 100vw;
  padding: 10vh 5vw;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  background: linear-gradient(180deg, 
    rgba(10, 8, 18, 0.7) 0%, 
    rgba(156, 39, 176, 0.05) 50%, 
    rgba(10, 8, 18, 0.7) 100%);
}

.card {
  width: 100%;
  max-width: 90vw;
  text-align: center;
  border: 1px solid rgba(156, 39, 176, 0.4);
  border-radius: 2vw;
  padding: 5vw;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 3vw rgba(156, 39, 176, 0.3);
  position: relative;
  z-index: 2;
}

.text {
  line-height: 2.2;
  font-size: 3.2vw;
  color: #f8f5e6;
  padding: 0 2vw;
  text-shadow: 0 0 1vw #000,
               0 0 1.5vw rgba(156, 39, 176, 0.8);
  font-weight: 500;
}

.sign {
  margin-top: 3vh;
  opacity: 0.95;
  text-align: right;
  font-size: 2.8vw;
  color: #f0e6d2;
}

.end {
  width: 100vw;
  padding: 10vh 5vw;
  text-align: center;
  position: relative;
  z-index: 1;
}

.btn {
  padding: 2.5vh 5vw;
  background: linear-gradient(180deg, 
    #d4af37 0%, 
    #9c27b0 50%, 
    #8b6906 100%);
  color: #fff;
  border: none;
  border-radius: 2vw;
  font-size: 3.2vw;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1vw 4vw rgba(156, 39, 176, 0.7),
              inset 0 0 1vw rgba(255, 255, 255, 0.4);
  width: 80vw;
  max-width: 90vw;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn:hover {
  transform: translateY(-0.5vh);
  box-shadow: 0 1.5vw 5vw rgba(156, 39, 176, 0.9),
              inset 0 0 1.5vw rgba(255, 255, 255, 0.5);
}

@media (max-width: 375px) {
  .poster h1 {
    font-size: 9vw;
    -webkit-text-stroke: 0.3px #d4af37;
  }
  .btn {
    padding: 2vh 4vw;
    font-size: 3vw;
  }
  .card {
    padding: 4vw;
  }
}
</style>