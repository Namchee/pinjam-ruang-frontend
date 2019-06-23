<template>
  <v-container class='wrapper'>
    <v-layout>
      <v-flex xs5 align-center>
        <v-layout column align-center class='hour cool'>
          <v-btn flat icon
            @click='incrementHour()'
            @mousedown='plusHour = true' 
            @mouseup='plusHour = false'
            @mouseleave='plusHour = false'
            class='control control-up'
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <v-text-field 
            class='display-2 time' 
            hide-details 
            type="number"
            :color='color("background")'
            v-model='hour'
            @change='testHour'
          >
          </v-text-field>
          <v-btn flat icon
            @click='decrementHour()'
            @mousedown='minusHour = true' 
            @mouseup='minusHour = false'
            @mouseleave='minusHour = false'
            class='control control-down'
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs2 class='divider'>
        <p class='display-2'>:</p>
      </v-flex>
      <v-flex xs5>
        <v-layout column align-center class='minute cool'>
          <v-btn flat icon
            @click='incrementMinute()'
            @mousedown='plusMinute = true' 
            @mouseup='plusMinute = false'
            @mouseleave='plusMinute = false'
            class='control control-up'
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <v-text-field
            class='display-2 time' 
            hide-details
            type="number"
            :color='color("background")'
            v-model='minute'
            @change='testMinute'
          >
          </v-text-field>
          <v-btn flat icon
            @click='decrementMinute()'
            @mousedown='minusMinute = true' 
            @mouseup='minusMinute = false'
            @mouseleave='minusMinute = false'
            class='control control-down'
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import colorMixin from './../../mixins/color';

export default {
  props: {
    value: {
      type: Date | null,
      requried: true,
    },

    minHour: {
      type: Number,
      default: 0,
    },

    maxHour: {
      type: Number,
      default: 23,
    },

    hourStep: {
      type: Number,
      default: 1,
    },

    minMinute: {
      type: Number,
      default: 0,
    },

    maxMinute: {
      type: Number,
      default: 59,
    },

    minuteStep: {
      type: Number,
      default: 1,
    },
  },

  mixins: [
    colorMixin,
  ],

  data: function() {
    return {
      hour: null,
      minute: null,

      plusHour: false,
      minusHour: false,
      plusMinute: false,
      minusMinute: false,

      next: 0,
      delay: 150,
    };
  },
  
  created: function() {
    requestAnimationFrame(this.watcher);

    if (this.value && this.value instanceof Date) {
      this.hour = value.getHours();
      this.minute = value.getMinutes();
    } 
  },

  mounted: function() {
    const hour = document.querySelector('.hour');
    const minute = document.querySelector('.minute');

    hour.addEventListener('wheel', (e) => {
      e.preventDefault();

      const wheelDown = this.determineScrollDirection(e);
      if (wheelDown) {
        this.decrementHour();
      } else {
        this.incrementHour();
      }
    });

    minute.addEventListener('wheel', (e) => {
      e.preventDefault();

      const wheelDown = this.determineScrollDirection(e);
      if (wheelDown) {
        this.decrementMinute();
      } else {
        this.incrementMinute();
      }
    });
  },

  watch: {
    time: function() {
      if (this.hour !== null && this.minute !== null) {
        this.$emit('input', `${this.hour}:${this.minute}`);
      }
    },
  },

  computed: {
    time: function() {
      return [this.hour, this.minute].join();
    },
  },

  methods: {
    clear: function() {
      this.hour = null;
      this.minute = null;
    },

    watcher: function(time) {
      requestAnimationFrame(this.watcher);
      if (time < this.next) {
        return;
      }
      this.next = time + this.delay;
      if (this.plusHour) {
        this.incrementHour();
      }
      if (this.minusHour) {
        this.decrementHour();
      }
      if (this.plusMinute) {
        this.incrementMinute();
      }
      if (this.minusMinute) {
        this.decrementMinute();
      }
    },

    determineScrollDirection: function(e) {
      let delta;

      if (e.wheelDelta) {
        delta = e.wheelDelta;
      } else {
        delta = -1 * e.deltaY;
      }

      return delta < 0;
    },

    setDefaultHour: function() {
      this.hour = new Date().getHours();
      if (this.hour > this.maxHour) {
        this.hour = this.maxHour;
      }
      if (this.hour < this.minHour) {
        this.hour = this.minHour;
      }
    },
    
    setDefaultMinute: function() {
      this.minute = new Date().getMinutes();
      if (this.minute > this.maxMinute) {
        this.minute = this.maxMinute;
      }
      if (this.minute < this.minMinute) {
        this.minute = this.minMinute;
      }
    },

    setDefaultTime: function() {
      this.setDefaultHour();
      this.setDefaultMinute();
    },

    testHour: function() {
      if (this.hour > this.maxHour) {
        this.hour = this.maxHour;
      }
    },

    testMinute: function() {
      if (this.minute > this.maxMinute) {
        this.minute = this.maxMinute;
      }
    },

    incrementHour: function() {
      if (typeof this.hour !== 'number') {
        this.setDefaultHour();
        if (typeof this.minute !== 'number') {
          this.setDefaultMinute();
        }

        return;
      }

      this.hour += this.hourStep;
      if (this.hour > this.maxHour) {
        this.hour = this.maxHour;
      } 
    },

    decrementHour: function() {
      if (typeof this.hour !== 'number') {
        this.setDefaultHour();
        if (typeof this.minute !== 'number') {
          this.setDefaultMinute();
        }

        return;
      }

      this.hour -= this.hourStep;
      if (this.hour < this.minHour) {
        this.hour = this.minHour;
      }
    },

    incrementMinute: function() {
      if (typeof this.hour !== 'number') {
        this.setDefaultHour();
        if (typeof this.minute !== 'number') {
          this.setDefaultMinute();
        }

        return;
      }

      this.minute += this.minuteStep;
      if (this.minute > 59) {
        if (this.hour < this.maxHour) {
          this.minute = 0;
          this.hour++;
        } else {
          this.minute = this.maxMinute;
        }
      }

      if (this.hour === this.maxHour && this.minute > this.maxMinute) {
        this.minute = this.maxMinute;
      }
    },

    decrementMinute: function() {
      if (typeof this.hour !== 'number') {
        this.setDefaultHour();
        if (typeof this.minute !== 'number') {
          this.setDefaultMinute();
        }

        return;
      }

      this.minute -= this.minuteStep;
      if (this.minute < 0) {
        if (this.hour > this.minHour) {
          this.hour--;
          this.minute = 60 + this.minute;
        } else {
          this.minute = this.minMinute;
        }
      }

      if (this.hour === this.minHour && this.minute < this.minMinute) {
        this.minute = this.minMinute;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 12.5rem;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
}
</style>