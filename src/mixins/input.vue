<script>
export default {
  data: function() {
    return {
      showPassword: false,
    };
  },

  computed: {
    passwordReveal: function() {
      return {
        'append-icon': this.showPassword ? 'visibility_off' : 'visibility',
        'append-icon-cb': () => this.showPassword = !this.showPassword,
        'type': this.showPassword ? 'text' : 'password',
      };
    }
  },
};
</script>
