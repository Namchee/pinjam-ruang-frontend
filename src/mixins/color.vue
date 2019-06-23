<script>
export default {
  methods: {
    color: function(theme) {
      const themeDark = theme.concat('-dark');

      if (this.$store.state.dark && this.$vuetify.theme[themeDark]) {
        return themeDark;
      }

      return theme;
    },

    textColor: function(color) {
      const processed = this.color(color);

      return {
        color: this.$vuetify.theme[processed],
      };
    }
  }
}
</script>
