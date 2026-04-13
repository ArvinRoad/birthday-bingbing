<template>
  <div class="star-page">
    <audio ref="audioRef" loop src="https://music.163.com/song/media/outer/url?id=1868535933.mp3" />
    
    <canvas ref="starCanvas" id="starCanvas"></canvas>

    <div class="birthday-box">
      <h1 class="birthday-title">生日快乐！🎂</h1>
      <p class="birthday-wish">
        愿你岁岁年年，平安喜乐<br>
        所有美好和温柔都如约而至～
      </p>
      <img src="/birthday-bingbing/images/ZongLi_LiHui.png" class="birthday-img" alt="生日图片" />
      <p class="birthday-wish">—— 遇见你，是我最珍贵的摩拉 ✨</p>
      <button class="back-btn" @click="goBack">🔙 返回主页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// 音频播放（适配手机端）
const audioRef = ref(null)
const playAudio = () => {
  audioRef.value?.play().catch(err => console.log('音频需点击触发：', err))
}

// 路由返回
const router = useRouter();
const goBack = () => {
  playAudio()
  router.push('/');
};

// 星光粒子（手机端性能优化版）
const starCanvas = ref(null);
let ctx = null;
let particles = [];
let animationId = null;

// 手机端优化配置
const CONFIG = {
  particleCount: 120, // 减少粒子数量，避免卡顿
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
  playAudio() // 挂载时尝试播放（需用户先点击）
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
  background: #000;
}

#starCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.birthday-box {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 50px 20px;
  color: #fff;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.birthday-title {
  font-size: 48px;
  margin-bottom: 20px;
  color: #d4af37;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
}

.birthday-wish {
  font-size: 24px;
  margin-bottom: 30px;
  line-height: 1.8;
  color: #f0e6d2;
  padding: 0 10px;
}

.birthday-img {
  width: 80%;
  max-width: 600px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  margin-bottom: 20px;
}

.back-btn {
  margin-top: 40px;
  padding: 16px 36px;
  background: linear-gradient(180deg, #d4af37 0%, #b8860b 100%);
  color: #000;
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
  width: 80%;
  max-width: 300px;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
}

/* 手机端适配 */
@media (max-width: 768px) {
  .birthday-title {
    font-size: 32px;
    margin-bottom: 15px;
  }
  .birthday-wish {
    font-size: 18px;
    line-height: 1.6;
  }
  .birthday-img {
    width: 90%;
    border-radius: 15px;
  }
  .back-btn {
    padding: 14px 28px;
    font-size: 15px;
    width: 80%;
    max-width: 280px;
    margin-top: 30px;
  }
}

/* 超小屏适配 */
@media (max-width: 375px) {
  .birthday-title {
    font-size: 28px;
  }
  .birthday-wish {
    font-size: 16px;
  }
  .back-btn {
    width: 90%;
    padding: 12px 24px;
  }
}
</style>