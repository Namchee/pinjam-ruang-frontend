<template>
  <div>
    <v-toolbar :color='color("accent")' :style='`height:${height}`' fixed app>
      <v-toolbar-side-icon 
        class="hidden-sm-and-up" 
        @click='drawer = !drawer'>
      </v-toolbar-side-icon>
      <v-toolbar-title 
        class="has-font-pt 
          subheading-xs-only
          font-weight-bold"
        >
        ://ftis-admin/pinjam-ruang
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          v-for='link in links'
          class='btn__nav-link' 
          :ripple='false' 
          :key='link.to'
          flat
          :to='link.to'
        >
        {{ link.caption }}
        </v-btn>
      </v-toolbar-items>
      <v-btn
        outline 
        class='hidden-xs-only'
      >
        {{ user ? 'Logout' : 'Login' }}
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model='drawer'
      absolute
      temporary
    >
      <v-list>
        <template v-if='user'>
          <v-list-tile two-line avatar v-if='user'>
            <v-list-tile-content>
              <v-list-tile-title class="title">
                {{ userName }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ userIsAdmin ? 'Administrator' : 'Regular User' }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-else>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>
                mdi-login
              </v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="title">
              Login
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-divider></v-divider>

        <v-list-tile
          v-for='link in links'
          :key='link.to'
          avatar
        >
          <v-list-tile-avatar>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ link.mobileCaption }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if='user'>
          <v-divider></v-divider>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>
                mdi-logout
              </v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
import colorMixin from "./../mixins/color";
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    height: {
      type: Number,
      default: 10,
    }
  },

  mixins: [
    colorMixin
  ],

  data: function() {
    return {
      drawer: false,

      links_raw: [
        {
          to: '/home',
          caption: 'Home',
          mobileCaption: 'Home',
          login: false,
          icon: 'home',
        },
        {
          to: '/manage',
          caption: 'Manage',
          mobileCaption: 'Manage Acara',
          login: true,
          icon: 'assignment',
        },
        {
          to: 'List',
          caption: 'List',
          mobileCaption: 'List of Acara',
          login: false,
          icon: 'view_list',
        },
        {
          to: 'Request',
          caption: 'Requests',
          mobileCaption: 'Requests\' Status',
          login: true,
          icon: 'gavel',
        },
        {
          to: 'Settings',
          caption: 'Settings',
          mobileCaption: 'Profile Settings',
          login: true,
          icon: 'settings',
        }
      ]
    };  
  },

  computed: { 
    ...mapState('userState', ['user']),
    ...mapGetters('userState', ['userName', 'userIsAdmin']),

    links: function() {
      return this.links_raw.filter(link => link.login ? this.user : true);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__title:not(:first-child) {
    margin-left: .5rem;
}

.v-btn.btn__nav-link {
    &::after {
        content: '';
        height: 3px;
        background: #363636;
        width: 0;
        transition: width .25s ease;
        position: absolute;
        bottom: 0;
    }

    &.theme--dark::after {
        background: hsl(0, 0, 96%);
    }

    &.v-btn--active {
        &::before {
          background: transparent;
        }
        
        &::after {
            width: 80%;
        }
    }

    &:hover {
        &::before {
            background: transparent;
        }

        &::after {
            width: 100%;
        }
    }
}
</style>
