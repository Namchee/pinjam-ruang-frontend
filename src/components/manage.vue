<template>
  <v-container fluid class="pt-5" grid-list-lg>
    <h1 class="display-1 
      has-font-montserrat 
      text-xs-center
      mb-5"
    >
      Formulir Acara
    </h1>
    <v-form class='form'>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <label for="room" class="field-label">
            Ruangan<span :style='textColor("danger")'>*</span>
          </label>
          <v-select
            id="room"
            :items='roomList'
            color='info'
            v-model='room'
            solo
          />
        </v-flex>
        <v-flex xs0 sm6>

        </v-flex>
        <v-flex xs12 sm6>
          <label @click='$refs.startDate.openPicker()' class="field-label">
            Tanggal Mulai<span :style='textColor("danger")'>*</span>
          </label>
          <datepicker ref='startDate' v-model='startDate' />
        </v-flex>
        <v-flex xs12 sm6>
          <label @click='$refs.startTime.openPicker()' class="field-label">
            Waktu Mulai<span :style='textColor("danger")'>*</span>
          </label>
          <timepicker ref='startTime' v-model='startTime' />
        </v-flex>
        <v-flex xs12 sm6>
          <label @click='$refs.endDate.openPicker()' class="field-label">
            Tanggal Selesai<span :style='textColor("danger")'>*</span>
          </label>
          <datepicker ref='endDate' v-model='endDate' />
        </v-flex>
        <v-flex xs12 sm6>
          <label @click='$refs.endTime.openPicker()' class="field-label">
            Waktu Selesai<span :style='textColor("danger")'>*</span>
          </label>
          <timepicker ref='endTime' v-model='endTime' />
        </v-flex>
        <v-flex xs12>
          <p>Keterangan: </p>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12>
          <label for='name' class="field-label">
            Nama Acara<span :style='textColor("danger")'>*</span>
          </label>
          <v-text-field id='name' solo></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import colorMixin from './../mixins/color';
import inputMixin from './../mixins/input';

import datepicker from './../components/subcomponents/datepicker';
import timepicker from './../components/subcomponents/timepicker';

export default {
  mixins: [
    colorMixin,
    inputMixin,
  ],

  components: {
    datepicker,
    timepicker,
  },

  data: function() {
    return {
      room: null,
      roomList: [
        'Ruang 9123'
      ],

      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
    };
  },
  
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.pad {
  padding-left: 10rem;
  padding-right: 10rem;
}

.form {
  margin-right: auto;
  margin-left: auto;
  width: 50vw;
}

@media screen and (min-width: 600px) {
  .form {
    padding: 16px;
  }
}

@media screen and (max-width: 599px) {
  .form {
    width: 70vw;
  }
}
</style>
