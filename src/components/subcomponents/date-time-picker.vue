<template>
  <div>
    <v-menu
      v-model='open'
      :close-on-content-click='false'
      transition="slide-y-transition"
      :nudge-bottom='45'
      :nudge-left='12.5'
      class='pa-0'
      v-if='!show'
      allow-overflow
    >
      <template v-slot:activator='{ on }'>
        <v-text-field
          :value='formattedDate'
          :label='label'
          :prepend-inner-icon='icon'
          :append-icon='(clearable && value) ? "clear" : undefined'
          @click:append='clear'
          :placeholder='placeholder'
          readonly
          v-on='on'
          solo
          color="input"
          :rules='rules'
        ></v-text-field>
      </template>
      <div>
        <v-layout column>
          <v-flex class="primary pa-1">
            <p id="datetime" class="display-1 white--text">{{ display ? display : '&nbsp;' }}</p>
          </v-flex>
          <v-layout row>
            <v-flex>
              <v-date-picker
                scrollable
                no-title
                v-model='date'
                color="primary"
                locale="id"
                :min='minDate'
                :max='maxDate'
                :show-current='false'
              >
              </v-date-picker>
            </v-flex>
            <v-flex :style='{ 
              "background": $vuetify.theme.dark ? "#424242" : "white" 
            }'
            class='pad-top'
            >
              <timepicker 
                ref='time'
                v-model='time'
                
                :minHour='minHour'
                :minMinute='minMinute'
                :maxHour='maxHour'
                :maxMinute='maxMinute'
              >
              </timepicker>
            </v-flex>
          </v-layout>
        </v-layout>
      </div>
    </v-menu>
    <v-dialog 
      v-model='open'
      v-else
    >
      <template v-slot:activator='{ on }'>
        <v-text-field
          :value='formattedDate'
          :label='label'
          :prepend-inner-icon='icon'
          :append-icon='(clearable && value) ? "clear" : undefined'
          @click:append='clear'
          :placeholder='placeholder'
          readonly
          v-on='on'
          solo
          :rules='rules'
        ></v-text-field>
      </template>
      <v-card>
        <v-layout column>
          <v-flex class="primary pa-1">
            <p id="datetime" class="display-1 text-xs-center">
              <span class="white--text" v-html='mobileDisplay'></span>
            </p>
          </v-flex>
          <v-flex>
            <v-tabs
              centered
              grow
            >
              <v-tab>
                <v-icon>
                  event
                </v-icon>
              </v-tab>
              <v-tab-item eager>
                <v-date-picker
                  scrollable
                  no-title
                  v-model='date'
                  color="primary"
                  locale="id"
                  full-width
                  :min='minDate'
                  :max='maxDate'
                  :show-current='false'
                >
                </v-date-picker>
              </v-tab-item>
              <v-tab>
                <v-icon>
                  timer
                </v-icon>
              </v-tab>
              <v-tab-item eager>
                <timepicker 
                  ref='time'
                  v-model='time'
                  :minHour='minHour'
                  :minMinute='minMinute'
                  :maxHour='maxHour'
                  :maxMinute='maxMinute'
                >
                </timepicker>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import colorMixin from './../../mixins/color';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';

import timepicker from './time-picker';

export default {
  props: {
    value: {
      type: Date, // don't ask
      default: null,
    },

    label: {
      type: String,
    },

    icon: {
      type: String,
      default: '',
    },

    min: {
      type: Date,
      default: null,
    },

    max: {
      type: Date,
      default: null,
    },

    clearable: {
      type: Boolean,
      default: false,
    },

    rules: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  mixins: [
    colorMixin,
  ],

  components: {
    timepicker,
  },

  data: function() {
    return {
      open: false,

      date: null,
      time: null,

      display: null,
    };
  },

  created: function() {
    if (this.value && this.value instanceof Date) {
      this.date = format(this.value, 'YYYY-MM-D');
      this.time = `${this.value.getHours()}:${this.value.getMinutes()}`;
    }
  },

  computed: {
    show: function() {
      return window.innerWidth < 600;
    },

    minDate: function() {
      if (this.min && this.min instanceof Date) {
        const date = this.min;
        date.setDate(date.getDate() - 1);
        return date.toISOString();
      }

      return null;
    },

    maxDate: function() {
      return this.max && this.max instanceof Date ?
        this.max.toISOString() :
        null;
    },

    formattedDate: function() {
      return this.value ? 
        format(this.value, 'dddd, D MMMM YYYY -- HH:mm', { locale: id }) : 
        '';
    },

    datetime: function() {
      return [this.date, this.time].join();
    },

    mobileDisplay: function() {
      if (!this.display) {
        return '&nbsp;';
      }

      const arr = this.display.split('|');
      return arr[0] + '<br />' + arr[1] + '<br />' + arr[2];
    },

    minHour: function() {
      if (this.min && this.date) {
        const date = new Date(this.date);
        const min = new Date(this.min);
        min.setDate(min.getDate() + 1);
        if (this.isSame(date, min)) {
          return min.getHours();
        }
      }

      return undefined;
    },

    maxHour: function() {
      if (this.max && this.date) {
        const date = new Date(this.date);
        const max = new Date(this.max);
        if (this.isSame(date, max)) {
          return max.getHours();
        }
      }

      return undefined;
    },

    minMinute: function() {
      if (this.min && this.date) {
        const date = new Date(this.date);
        const min = new Date(this.min);
        min.setDate(min.getDate() + 1);
        if (this.isSame(date, min)) {
          return min.getMinutes();
        }
      }

      return undefined;
    },

    maxMinute: function() {
      if (this.max && this.date) {
        const date = new Date(this.date);
        const max = new Date(this.max);
        if (this.isSame(date, max)) {
          return max.getMinutes();
        }
      }

      return undefined;
    },
  },

  watch: {
    date: function() {
      if (this.date && !this.time) {
        this.$refs.time.setDefaultTime();
      }
    },

    time: function() {
      if (this.time && !this.date) {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        this.date = format(date, 'YYYY-MM-D');
      }
    },

    datetime: function() {
      this.formatDateTime();
    },
  },

  methods: {
    focus: function() {
      this.open = true;
    },

    formatDateTime: function() {
      if (this.date && this.time) {
        const date = new Date(this.date);
        const time = this.time.split(':');
        date.setHours(time[0]);
        date.setMinutes(time[1]);

        if (window.innerWidth >= 600) {
          this.display = format(date, 'ddd, D MMM YYYY - HH:mm', { locale: id });
        } else {
          this.display = format(date, 'dddd|D MMMM YYYY|HH:mm', { locale: id });
        }

        this.$emit('input', date);
      } else {
        this.display = '';
      }
    },

    isSame: function(d1, d2) {
      return (d1.getDate() === d2.getDate()
        && d1.getMonth() === d2.getMonth()
        && d1.getFullYear() === d2.getFullYear());
    },

    clear: function() {
      this.date = null;
      this.time = null;

      this.$refs.time.clear();
      this.$emit('input', null);
    },
  }
};
</script>

<style lang='scss' scoped>
.pad-top {
  padding-top: 1.8rem;
}

#datetime {
  margin: 0;
  padding: 1rem;
}
</style>
