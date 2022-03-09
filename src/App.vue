<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer v-if="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue"

export default {
  components: {
    Header,
    Footer
  },
};
</script>
<style>
</style>
