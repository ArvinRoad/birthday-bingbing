<template>
  <!-- 路由出口：所有页面渲染在这里 -->
  <router-view></router-view>
</template>

<script setup>
// 根组件仅作为路由容器
</script>

<style>
/* 全局基础样式（手机端优先） */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent; /* 去除手机点击高亮 */
}
html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background: #000;
  touch-action: pan-y; /* 禁止缩放，仅允许垂直滚动 */
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>