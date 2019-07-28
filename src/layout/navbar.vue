<template>
  <div>
    <v-app-bar
      fixed
      :color='$vuetify.theme.dark ? "" : "primary"'
      :hide-on-scroll='mobileNav'
      dark
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
        hidden-sm-and-down
        mr-3"
      >
        <v-btn 
          v-for='link in links'
          class='btn__nav-link text-uppercase' 
          :key='link.to'
          text
          :to='link.to'
          :ripple='false'
        >
        {{ link.caption }}
        </v-btn>
      </v-toolbar-items>
      <template v-if='user'>
        <v-menu
          v-model='profile'
          offset-y
          nudge-bottom="10"
          :close-on-content-click='false'
        >
          <template #activator='{ on }'>
            <v-btn text fab small v-on='on'>
              <v-icon>
                person
              </v-icon>
            </v-btn>
          </template>
          <v-card class="profile" outlined flat>
            <v-card-text class="pa-0">
              <v-list class="py-0">
                <v-list-item class="py-2">
                  <v-list-item-avatar>
                    <v-avatar size="48" color="primary white--text">
                      <template v-if='user.avatar'>
                        <img :src='user.avatar' :alt='user.name' />
                      </template>
                      <template v-else>
                        <span class="title">
                          {{ userAlias }}
                        </span>
                      </template>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ user.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-weather-night
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Dark Mode
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch color="info">

                    </v-switch>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item @click=''>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-logout
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="subtitle-1">
                        Logout
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
      <template v-else>
        <v-btn
          outlined
          class="hidden-sm-and-down ml-2">
          Logout
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
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
import { mapState, mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      profile: false,
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
    },

    userAlias: function() {
      if (this.user && this.user.name) {
        const username = this.user.name.split(' ');
        return `${username[0].substring(0, 1)}${username[1].substring(0, 1)}`;
      }

      return '';
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
  &::before {
    background-color: rgba(255, 255, 255, 0.350); 
  }

  color: hsl(0, 0, 96%);
}

.profile--active {
  box-shadow: 0 0 2.5px 3.5px rgba(255, 255, 255, 0.4);
}
</style>
