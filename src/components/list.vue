<template>
  <v-container class='mt-2 text-xs-center wrapper'>
    <p class='display-1 has-font-montserrat mb-5'>
      Daftar Acara
    </p>
    <v-layout row wrap>
      <v-flex xs0 sm2 xl3></v-flex>
      <v-flex xs12 sm8 xl6>
        <v-card>
          <v-card-title>
            <v-text-field
              solo
              v-model='search'
              prepend-inner-icon='search'
              placeholder='Cari berdasarkan nama acara...'
              hide-details
            ></v-text-field>
            <v-btn flat>
              Filter
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers='headers'
            :items='items'
          >
            <template #items='props'>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.startTime }}</td>
              <td>{{ props.item.endTime }}</td>
              <td>{{ props.item.room }}</td>
              <td>{{ props.item.userName }}</td>
            </template>
          </v-data-table>
        </v-card>
        
      </v-flex>
      <v-flex xs0 sm2 xl3></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import datetimepicker from './../components/subcomponents/date-time-picker';

export default {
  components: {
    datetimepicker
  },

  data: function() {
    return {
      search: '',
      headers: [
        {
          text: 'Nama Acara',
          value: 'name',
          sortable: true,
        },
        {
          text: 'Waktu Mulai',
          value: 'startTime',
          sortable: true,
        },
        {
          text: 'Waktu Selesai',
          value: 'endTime',
          sortable: true,
        },
        {
          text: 'Ruangan',
          value: 'room',
          sortable: true,
        },
        {
          text: 'Penanggung Jawab',
          value: 'userName',
          sortable: true,
        },
      ],
      items: [
        {
          name: 'Test acara',
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          room: '9121',
          userName: 'Saya',
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 600px) {
  .wrapper {
    .flex {
      padding: 0 16px;
    }
  }
}
</style>
