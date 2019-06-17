<script>
export default {
  methods: {
    color: function(theme) {
      return this.$store.state.dark ?
        theme.concat('-dark') :
        theme;
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
