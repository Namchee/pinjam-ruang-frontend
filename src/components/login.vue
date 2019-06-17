<template>
  <v-app v-bind='{ "dark": this.$store.state.dark }'>
    <div class="wrapper" 
      :class='{ "dark": this.$store.state.dark }'
    >
      <v-layout row wrap>
        <v-flex lg4 sm3 xs1></v-flex>
        <v-flex lg4 sm6 xs10>
          <h1 class="display-2 
            display-1-sm-and-down 
            has-font-montserrat 
            text-xs-center"
          >
            Login
          </h1>
          <v-form class="mt-4">
            <v-container>
              <v-layout row>
                <v-flex xl3 lg2 xs0 sm1></v-flex>
                <v-flex xl6 lg8 xs12 sm10>
                  <div>
                    <label for="username" 
                      class="field-label"
                    >
                      Username
                    </label>
                    <v-text-field
                      ref="username"
                      id="username"
                      v-model='username'
                      solo
                      type='text'
                      :color='color("background")'
                      required 
                    />
                  </div>
                  <div>
                    <label for="password"
                      class="field-label"
                    >
                      Password
                    </label>
                    <v-text-field 
                      id="password"
                      v-model='password' 
                      v-bind='passwordReveal'
                      :color='color("background")'
                      solo
                      required
                    />
                  </div>
                  <div>
                    <v-checkbox label="Remember Me"
                      class="has-font-montserrat font-weight-medium"
                      :color='color("primary")'
                    /> 
                  </div>
                  <div>
                    <v-btn block :color='color("primary")'>
                      Login
                    </v-btn>
                  </div>
                </v-flex>
                <v-flex xl3 lg2 xs0 sm1></v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-flex>
        <v-flex lg4 sm3 xs1></v-flex>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
import colorMixin from './../mixins/color';
import inputMixin from './../mixins/input';

export default {
  mixins: [
    colorMixin,
    inputMixin,
  ],

  data: function() {
    return {
      username: '',
      password: ''
    };
  },

  mounted: function() {
    this.$refs.username.focus();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-image: linear-gradient(
    -225deg,
    #E3FDF5 0%, 
    #FFE6FA 100%);

  &.dark {
    background: linear-gradient(to bottom, 
      rgba(255,255,255,0.15) 0%, 
      rgba(0,0,0,0.75) 100%), 
      radial-gradient(at top center, 
        rgba(255,255,255,0.1) 0%, 
        rgba(0,0,0,0.70) 120%) #989898; 
    background-blend-mode: multiply,multiply;
  }
}

.v-input--selection-controls {
  margin: 0;
  padding: 0;
}
</style>
