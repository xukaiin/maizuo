<template>
  <div class="wrapp" style="width: 250px">
    <div class="load-2">
      <div class="k-line k-line6b-1"></div>
      <div class="k-line k-line6b-2"></div>
      <div class="k-line k-line6b-3"></div>
      <div class="k-line k-line6b-4"></div>
      <div class="k-line k-line6b-5"></div>
    </div>
  </div>
</template>

<style scoped>
.wrapp {
  padding: 20px 60px 20px;
  border-radius: 5px;
  text-align: center;
}
.wrapp:last-child {
  margin-right: 0;
}
.k-line {
  display: inline-block;
  margin-right: 3px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #4b9cdb;
}
.k-line6b-1 {
  animation: k-loadingB 1.5s 0.1s infinite;
  background-color: #4b9cdb;
}
.k-line6b-2 {
  animation: k-loadingB 1.5s 0.2s infinite;
  background-color: #4b9cdb;
}
.k-line6b-3 {
  animation: k-loadingB 1.5s 0.4s infinite;
  background-color: #4b9cdb;
}
.k-line6b-4 {
  animation: k-loadingB 1.5s 0.8s infinite;
  background-color: #4b9cdb;
}
.k-line6b-5 {
  animation: k-loadingB 1.5s 1.2s infinite;
  background-color: #4b9cdb;
}
@keyframes k-loadingB {
  0% {
    width: 15px;
  }
  50% {
    width: 35px;
  }
  100% {
    width: 15px;
  }
}
</style>
