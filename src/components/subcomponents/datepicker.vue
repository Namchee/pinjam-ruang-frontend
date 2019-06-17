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
          :value='formattedDate'
          ref='date'
          :prepend-icon='icon'
          :label='label'
          @keyup.enter.native='tryToGuess'
          v-on='on'
          solo
        />
      </template>
      <v-date-picker 
        scrollable 
        color="teal lighten-2"
        landscape
        :value='value'
        @input='inputDate'
        locale="id"
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
          :value='formattedDate'
          ref='date'
          :prepend-icon='icon'
          :label='label'
          @keyup.enter.native='tryToGuess'
          v-on='on'
          solo
        />
      </template>
      <v-date-picker 
        scrollable 
        color="teal lighten-2"
        :value='value'
        @input='inputDate'
        locale="id"
      />
    </v-dialog>
  </div>
</template>

<script>
import colorMixin from './../../mixins/color';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import isValid from 'date-fns/is_valid';

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

    formattedDate: function() {
      return this.value ? 
        format(this.value, 'dddd, D MMMM YYYY', { locale: id }) : 
        '';
    }
  },

  methods: {
    inputDate: function(e) {
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
      const parsed = Date.parse(this.$refs.date.lazyValue);

      this.$refs.date.blur();
      this.closePicker();

      if (parsed) {
        this.$emit('input', format(parsed, 'YYYY-MM-DD'));
      } else {
        this.$refs.date.lazyValue = format(this.value, 'dddd, D MMMM YYYY', { locale: id });
      }
    },
  }
};
</script>

<style>
</style>
