<template>
  <v-container fluid class="pt-5 pad">
    <h1 class="display-1 
      has-font-montserrat 
      text-xs-center
      mb-5"
    >
      Formulir Acara
    </h1>
    <v-form class='form' v-model='form'>
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
            :rules='roomRules'
          />
        </v-flex>
        <v-flex xs0 sm6>

        </v-flex>
        <v-flex xs12 sm6>
          <label @click='$refs.startTime.focus()' class="field-label">
            Waktu Mulai<span :style='textColor("danger")'>*</span>
          </label>
          <datetimepicker
            ref='startTime' 
            v-model='startTime'
            :min='new Date().toISOString()'
            :max='endTime ? endTime.toISOString() : undefined'
            clearable
            :rules='startTimeRules'
          >
          </datetimepicker>
        </v-flex>
        <v-flex xs12 sm6>
          <label @click='$refs.endTime.focus()' class="field-label">
            Waktu Selesai<span :style='textColor("danger")'>*</span>
          </label>
          <datetimepicker 
            :min='startTime ? startTime.toISOString() : new Date().toISOString()'
            ref='endTime' 
            v-model='endTime'
            clearable
            :rules='endTimeRules'
          >
          </datetimepicker>
        </v-flex>
        <v-flex xs12>
          <p>Keterangan: 
            <template v-if='avail === 0' :style='textColor("danger")'>
              Jadwal yang diajukan bentrok dengan acara lain
            </template>
            <template v-else-if='avail === 1' :style='textColor("success")'>
              Jadwal yang diajukan tersedia untuk digunakan
            </template>
            <template v-else-if='avail === 2' :style='textColor("warning")'>
              Jadwal yang diajukan tidak valid, mohon periksa kembali masukan anda
            </template>
          </p>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12>
          <label for='name' class="field-label">
            Nama Acara<span :style='textColor("danger")'>*</span>
          </label>
          <v-text-field 
            id='name'
            solo
            v-model='name'
            counter='50'
            :rules='nameRules'
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <label for="desc" class="field-label">
            Deskripsi Acara<span :style='textColor("danger")'>*</span>
          </label>
          <v-textarea
            id="desc"
            solo
            v-model='desc'
            counter='100'
            :rules='descRules'
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-btn :color='color("primary")'>
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import colorMixin from './../mixins/color';
import inputMixin from './../mixins/input';

import datetimepicker from './../components/subcomponents/date-time-picker';

export default {
  mixins: [
    colorMixin,
    inputMixin,
  ],

  components: {
    datetimepicker,
  },

  data: function() {
    return {
      room: null,
      roomList: [
        'Ruang 9123'
      ],

      form: null,

      startTime: null,
      endTime: null,
      name: '',
      desc: '',
      avail: null,

      startTimeRules: [
        v => !!v || 'Waktu mulai harus diisi' 
      ],
      endTimeRules: [
        v => !!v || 'Waktu selesai harus diisi'
      ],
      roomRules: [
        v => !!v || 'Ruangan harus diisi'
      ],
      nameRules: [
        v => !!v || 'Nama acara harus diisi',
        v => (v.length <= 50) || 'Nama acara harus kurang dari 50 karakter',
      ],
      descRules: [
        v => !!v || 'Deskripsi acara harus diisi',
        v => (v.length <= 100) || 'Deskripsi acara harus kurang dari 100 karakter'
      ]
    };
  },
  
  methods: {
    
  },
  
  computed: {
    schedule: function() {
      if (this.startTime && this.endTime && this.room) {
        return [this.startTime, this.endTime, this.room].join();
      } else {
        return null;
      }
    }
  },

  watch: {
    schedule: function() {
      if (this.schedule) {
        // test
      } 
    },
  },
};
</script>

<style lang="scss" scoped>
.pad {
  .flex {
    padding: .5rem;
  }
}

@media screen and (max-width: 599px) {
  .pad {
    .flex {
      padding: .25rem;
    }
  }
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
