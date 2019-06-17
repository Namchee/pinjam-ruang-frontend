<template>
  <div>
    <v-menu
      v-model='open'
      lazy
      :close-on-content-click='false'
      transition="slide-y-transition"
      full-width
      min-width="290px"
      allow-overflow
      v-if='!show'
      :nudge-bottom='45'
    >
      <template #activator='{ on }'>
        <v-text-field
          :value='value'
          ref='time'
          :prepend-icon='icon'
          :label='label'
          @keyup.enter.native='tryToGuess'
          v-on='on'
          solo
        />
      </template>
      <v-time-picker
        scrollable 
        color="teal lighten-2"
        :value='value'
        @input='inputTime'
      />
    </v-menu>
    <v-dialog
      v-model='open'
      lazy
      full-width
      width="290px"
      v-else
    >
      <template #activator='{ on }'>
        <v-text-field
          :value='value'
          ref='date'
          :prepend-icon='icon'
          :label='label'
          @keyup.enter.native='tryToGuess'
          v-on='on'
          solo
        />
      </template>
      <v-time-picker 
        scrollable 
        color="teal lighten-2"
        :value='value'
        @input='inputTime'
      />
    </v-dialog>
  </div>
</template>

<script>
import colorMixin from './../../mixins/color';

export default {
  props: {
    value: {
      type: Date | String,
      required: true,
    },

    label: {
      type: String,
    },

    icon: {
      type: String,
      default: '',
    }
  },

  mixins: [
    colorMixin,
  ],

  data: function() {
    return {
      open: false,
    };
  },

  computed: {
    show: function() {
      return window.innerWidth < 600;
    },
  },

  methods: {
    inputTime: function(e) {
      this.closePicker();
      this.$emit('input', e);
    },

    openPicker: function() {
      this.open = true;
    },

    closePicker: function() {
      this.open = false;
    },

    tryToGuess: function() {
      const time = this.$refs.time.lazyValue;
      const pattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

      this.$refs.time.blur();
      this.closePicker();

      if (pattern.test(time)) {
        this.$emit('input', time);
      } else {
        this.$refs.time.lazyValue = this.value;
      }
    },
  }
};
</script>

<style>
</style>
