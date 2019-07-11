<script>
export default {
  methods: {
    textColor: function(color) {
      const processed = this.$vuetify.theme.dark ?
        this.$vuetify.theme.themes.dark[color] :
        this.$vuetify.theme.themes.light[color];

      return {
        color: processed,
      };
    }
  }
}
</script>
