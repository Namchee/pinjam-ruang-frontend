<template>
  <div>
    <v-app-bar
      fixed
      :color='$vuetify.theme.dark ? "" : "primary"'
      :hide-on-scroll='mobileNav'
      dark
      app
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up" 
        @click='drawer = !drawer'
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title 
        class="has-font-pt
          font-weight-bold"
        >
        pinjam-ruang
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="nav-item--desktop
        hidden-sm-and-down"
      >
        <v-btn 
          v-for='link in links'
          class='btn__nav-link' 
          :ripple='false' 
          :key='link.to'
          text
          :to='link.to'
        >
        {{ link.caption }}
        </v-btn>
      </v-toolbar-items>
      <v-btn
        outlined
        class='hidden-sm-and-down ml-3'
      >
        {{ user ? 'Logout' : 'Login' }}
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      color="background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);"
      v-model='drawer'
      fixed
      temporary
    >
      <v-list>
        <template v-if='user'>
          <v-list-item two-line v-if='user'>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ userName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ userIsAdmin ? 'Administrator' : 'Regular User' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item >
            <v-list-item-avatar>
              <v-icon>
                mdi-login
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                Login
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list-item
          v-for='link in links'
          :key='link.to'
          :to='link.to'
        >
          <v-list-item-avatar>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ link.mobileCaption }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-if='user'>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>
                mdi-logout
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
          to: '/list',
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
      ]
    };  
  },

  computed: { 
    ...mapState('userState', ['user']),
    ...mapGetters('userState', ['userName', 'userIsAdmin']),

    links: function() {
      return this.links_raw.filter(link => link.login ? this.user : true);
    },

    mobileNav: function() {
      return window.innerWidth < 600;
    }
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__title:not(:first-child) {
    margin-left: .2rem;
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
            width: 75%;
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

.nav-item--desktop {
  &.v-toolbar__items {
    & > * {
      width: 7rem;
    }
  }
}

.v-list-item--active.theme--dark {
  color: hsl(0, 0, 96%); 
}
</style>
