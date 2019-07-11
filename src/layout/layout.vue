<template>
  <div>
    <Navbar class='navbar'></Navbar>
    <v-content class='content'> 
      <router-view class='section'></router-view>
    </v-content>
  </div>
</template>

<script>
import Navbar from './navbar';
import Footer from './footer';

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.content {
  //padding-top: 10vh;
  overflow: auto;
}

.section {
  padding: 1.5rem;
}
</style>
