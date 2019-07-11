<template>
  <v-container fluid class="wrapper">
    <v-layout row class="divider">
      <v-flex xs12 md8>
        <v-form class="form" v-model="form">
          <v-layout row wrap>
            <v-flex xs12 class="display-1 has-font-open-sans mb-4">
              Formulir Acara
            </v-flex>
            <v-flex xs12 sm6>
              <label for="room" class="field-label">
                Ruangan
                <span :style='textColor("danger")'>*</span>
              </label>
              <v-select
                id="room"
                :items="roomList"
                color="info"
                v-model="room"
                solo
                :rules="roomRules"
              ></v-select>
            </v-flex>
            <v-flex sm6 class="hidden-xs-only"></v-flex>
            <v-flex xs12 sm6>
              <label @click="$refs.startTime.focus()" class="field-label">
                Waktu Mulai
                <span :style='textColor("danger")'>*</span>
              </label>
              <datetimepicker
                ref="startTime"
                v-model="startTime"
                :min="new Date().toISOString()"
                :max="endTime ? endTime.toISOString() : undefined"
                clearable
                :rules="startTimeRules"
              ></datetimepicker>
            </v-flex>
            <v-flex xs12 sm6>
              <label @click="$refs.endTime.focus()" class="field-label">
                Waktu Selesai
                <span :style='textColor("danger")'>*</span>
              </label>
              <datetimepicker
                :min="startTime ? startTime.toISOString() : new Date().toISOString()"
                ref="endTime"
                v-model="endTime"
                clearable
                :rules="endTimeRules"
              ></datetimepicker>
            </v-flex>
            <v-flex xs12>
              <p>
                Keterangan:
                <template
                  v-if="avail === 0"
                  :style='textColor("danger")'
                >Jadwal yang diajukan bentrok dengan acara lain</template>
                <template
                  v-else-if="avail === 1"
                  :style='textColor("success")'
                >Jadwal yang diajukan tersedia untuk digunakan</template>
                <template
                  v-else-if="avail === 2"
                  :style='textColor("warning")'
                >Jadwal yang diajukan tidak valid, mohon periksa kembali masukan anda</template>
              </p>
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <label for="name" class="field-label">
                Nama Acara
                <span :style='textColor("danger")'>*</span>
              </label>
              <v-text-field 
                id="name" 
                solo 
                v-model="name" 
                counter="50" 
                :rules="nameRules"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <label for="desc" class="field-label">
                Deskripsi Acara
                <span :style='textColor("danger")'>*</span>
              </label>
              <v-textarea id="desc" solo v-model="desc" counter="100" :rules="descRules"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-btn color="primary">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex md4 class="hidden-xs-only sticky-container">
        <v-card raised class="pa-2 sticky">
          <v-card-title class="disclaimer-title">
            <h1 class="headline 
              has-font-open-sans 
              text-uppercase 
              mb-4">
              Disclaimer
            </h1>
          </v-card-title>
          <v-card-text>
            <ol>
              <li>
                Pastikan bahwa jadwal yang diajukan tidak bentrok dengan jadwal kelas
              </li>
            </ol>
            <br>

            <p :style='textColor("warning")'>
              Apabila acara yang diajukan melanggar aturan diatas,
              administrator berhak untuk membatalkan acara secara
              sepihak tanpa pemberitahuan terlebih dahulu
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import colorMixin from "./../mixins/color";
import inputMixin from "./../mixins/input";

import datetimepicker from "./../components/subcomponents/date-time-picker";

export default {
  mixins: [colorMixin, inputMixin],

  components: {
    datetimepicker
  },

  data: function() {
    return {
      room: null,
      roomList: ["Ruang 9123"],

      form: null,

      startTime: null,
      endTime: null,
      name: "",
      desc: "",
      avail: null,

      startTimeRules: [v => !!v || "Waktu mulai harus diisi"],
      endTimeRules: [v => !!v || "Waktu selesai harus diisi"],
      roomRules: [v => !!v || "Ruangan harus diisi"],
      nameRules: [
        v => !!v || "Nama acara harus diisi",
        v => v.length <= 50 || "Nama acara harus kurang dari 50 karakter"
      ],
      descRules: [
        v => !!v || "Deskripsi acara harus diisi",
        v => v.length <= 100 || "Deskripsi acara harus kurang dari 100 karakter"
      ]
    };
  },

  methods: {},

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
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  & > .layout > .flex {
    padding: 2.25rem;
  }
}

.form {
  .flex {
    padding: .75rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.sticky-container {
  border: 2px solid;
  position: relative;
}

.sticky {
  position: sticky;
  top: 0;
  display: block;
  z-index: 10000;
}

.disclaimer-title {
  justify-content: center;
}
</style>
