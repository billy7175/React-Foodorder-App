<template>
  <div>
    <header class="header">
      <router-link :to="{ name: 'login'}">로그인</router-link>
      <router-link :to="{ name: 'signup'}">회원가입</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  /* border:1px solid red; */
}
</style>
