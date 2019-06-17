<template>
	<v-container
    text-xs-center
    fluid
    class='has-font-open-sans'
  >
    <v-card class='pt-5 elevation-5'>
      <v-card-text>
        <p class="title font-weight-bold">Copyright &copy; ftis-admin {{ new Date().getFullYear() }}</p>
        <p class="caption">Made with <v-icon color="red" small>mdi-heart</v-icon> by Namchee</p>
        <p>
          <v-btn flat icon :ripple='false'>
            <v-icon color='light-blue lighten-3'>
              language
            </v-icon>
          </v-btn>
          <v-btn flat icon :ripple='false'>
            <v-icon color='blue darken-1'>
              mdi-facebook
            </v-icon>
          </v-btn>
          <v-btn flat icon :ripple='false'>
            <v-icon color='pink lighten-1'>
              mdi-instagram
            </v-icon>
          </v-btn>
          <v-btn flat icon :ripple='false'>
            <v-icon color='grey darken-1'>
              mdi-github-circle
            </v-icon>
          </v-btn>
        </p>
      </v-card-text>
    </v-card>
    
    
  </v-container>
</template>

<script>
import colorMixin from './../mixins/color';

export default {
  mixins: [
    colorMixin,
  ],
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}

.v-btn--icon {
  width: unset;
  filter: grayscale(1);
  opacity: 0.5;

  &:hover {
    filter: grayscale(0);
    opacity: 1;

    &::before {
      background: transparent;
    }
  }
}
</style>
