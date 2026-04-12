<template>
  <div class="page">
    <audio autoplay loop src="https://music.163.com/song/media/outer/url?id=1868535933.mp3" />

    <section class="poster">
      <div class="overlay"></div>
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

    <!-- 彩蛋页 -->
    <section class="end">
      <button class="btn" @click="show = true">✨ 点击领取小幸运</button>
      <div v-show="show" class="modal">
        <h2>遇见你，是我最珍贵的摩拉</h2>
        <p>生日快乐，刘冰冰</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.page {
  width: 100%;
  min-height: 100vh;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #fff;
  background: #000;
}

.poster {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url('/public/images/QunXiang.png') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* 黑金渐变遮罩，增强文字清晰度和质感 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(10, 8, 6, 0.55) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  padding: 0 20px;
}

.poster h1 {
  font-size: 64px;
  font-weight: 800;
  color: #f0e6d2;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
  margin-bottom: 20px;
}

.divider {
  width: 300px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  margin: 0 auto 15px;
}

.date {
  font-size: 20px;
  color: #d4af37;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.slogan {
  font-size: 18px;
  color: #f0e6d2;
  opacity: 0.9;
}

.message {
  width: 100%;
  padding: 100px 20px;
  background: linear-gradient(180deg, #000 0%, #0c0a09 50%, #000 100%);
  display: flex;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.text {
  line-height: 2.2;
  font-size: 17px;
  color: #f0e6d2;
  padding: 0 10px;
}

.sign {
  margin-top: 25px;
  opacity: 0.7;
  text-align: right;
  font-size: 15px;
  color: #d4af37;
}

.end {
  width: 100%;
  padding: 100px 20px;
  background: #000;
  text-align: center;
}

.btn {
  padding: 16px 36px;
  background: linear-gradient(180deg, #d4af37 0%, #b8860b 100%);
  color: #000;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
}

.modal {
  margin-top: 35px;
  animation: fade 0.6s forwards;
}

.modal h2 {
  color: #d4af37;
  font-size: 24px;
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(212, 175, 55, 0.4);
}

.modal p {
  font-size: 17px;
  color: #f0e6d2;
}

@keyframes fade {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* =================================== */
/* 手机端完美适配 */
/* =================================== */
@media (max-width: 768px) {
  .poster h1 {
    font-size: 48px;
  }
  .divider {
    width: 220px;
  }
  .date {
    font-size: 17px;
  }
  .slogan {
    font-size: 16px;
  }
  .text {
    font-size: 16px;
  }
  .btn {
    padding: 14px 30px;
    font-size: 16px;
  }
}
</style>