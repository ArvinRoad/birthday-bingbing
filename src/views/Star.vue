<template>
  <div class="star-page">
    <div class="global-gradient"></div>

    <canvas ref="starCanvas" id="starCanvas"></canvas>

    <div class="birthday-box">
      <h1 class="birthday-title">生日快乐！🎂</h1>
      <p class="birthday-wish">
        愿你岁岁年年，平安喜乐<br>
        所有美好和温柔都如约而至～
      </p>

      <!-- ✅ 这里我帮你修好了！-->
      <img :src="`${baseUrl}images/ZongLiLiHui.png`" class="birthday-img" alt="生日图片" />

      <p class="birthday-wish">—— 遇见你，是我最珍贵的摩拉 ✨</p>
      <button class="back-btn" @click="goBack">🔙 返回主页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const playGlobalAudio = inject('playGlobalAudio')
const router = useRouter();
const goBack = () => {
  playGlobalAudio()
  router.push('/');
};

// ✅ 关键修复：在这里定义 baseUrl，模板里直接用
const baseUrl = import.meta.env.BASE_URL;

const starCanvas = ref(null);
let ctx = null;
let particles = [];
let animationId = null;

const CONFIG = {
  particleCount: 120,
  minSize: 0.8,
  maxSize: 3,
  minSpeed: 0.02,
  maxSpeed: 0.1,
  color: 'rgba(212, 175, 55, {opacity})'
};

class StarParticle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
    this.speedX = (Math.random() - 0.5) * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed;
    this.speedY = (Math.random() - 0.5) * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed;
    this.opacity = Math.random();
    this.opacitySpeed = Math.random() * 0.005 + 0.001;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
    this.opacity += this.opacitySpeed;
    if (this.opacity > 1 || this.opacity < 0) {
      this.opacitySpeed *= -1;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.color.replace('{opacity}', this.opacity);
    ctx.fill();
  }
}

const initCanvas = () => {
  if (!starCanvas.value) return;
  ctx = starCanvas.value.getContext('2d');
  resizeCanvas();
  initParticles();
  animate();
};

const resizeCanvas = () => {
  if (!starCanvas.value) return;
  starCanvas.value.width = window.innerWidth;
  starCanvas.value.height = window.innerHeight;
};

const initParticles = () => {
  particles = [];
  const { width, height } = starCanvas.value;
  for (let i = 0; i < CONFIG.particleCount; i++) {
    particles.push(new StarParticle(width, height));
  }
};

const animate = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, starCanvas.value.width, starCanvas.value.height);
  particles.forEach(particle => {
    particle.update(starCanvas.value.width, starCanvas.value.height);
    particle.draw(ctx);
  });
  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  playGlobalAudio()
  initCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', initParticles);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('resize', initParticles);
});
</script>

<style scoped>
.star-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.global-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(212, 175, 55, 0.05) 0%,
    rgba(184, 134, 11, 0.1) 50%,
    rgba(100, 75, 5, 0.05) 100%
  );
  z-index: 1;
  pointer-events: none;
}

#starCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.birthday-box {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 8vh 5vw;
  color: #fff;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.birthday-title {
  font-size: 7vw;
  margin-bottom: 3vh;
  color: #d4af37;
  text-shadow: 0 0 2vw rgba(212, 175, 55, 0.7);
}

.birthday-wish {
  font-size: 3.5vw;
  margin-bottom: 4vh;
  line-height: 1.8;
  color: #f0e6d2;
  padding: 0 3vw;
  text-shadow: 0 0 0.5vw rgba(212, 175, 55, 0.5);
}

.birthday-img {
  width: 80vw;
  max-width: 90vw;
  border-radius: 3vw;
  box-shadow: 0 0 3vw rgba(212, 175, 55, 0.5),
              0 0 5vw rgba(0, 0, 0, 0.7);
  margin-bottom: 3vh;
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.back-btn {
  margin-top: 5vh;
  padding: 2.5vh 5vw;
  background: linear-gradient(180deg, 
    #d4af37 0%, 
    #b8860b 50%, 
    #8b6906 100%);
  color: #000;
  font-size: 3.2vw;
  font-weight: bold;
  border: none;
  border-radius: 2vw;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1vw 3vw rgba(212, 175, 55, 0.4),
              inset 0 0 1vw rgba(255, 255, 255, 0.2);
  width: 80vw;
  max-width: 90vw;
}

.back-btn:hover {
  transform: translateY(-0.5vh);
  box-shadow: 0 1.5vw 4vw rgba(212, 175, 55, 0.5),
              inset 0 0 1.5vw rgba(255, 255, 255, 0.3);
}

@media (max-width: 375px) {
  .birthday-title {
    font-size: 6vw;
  }
  .birthday-wish {
    font-size: 3vw;
  }
}
</style>