<template>
  <section>
    <b-navbar class="nav-bar-container" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/weather">Weather App</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="nav-links">
          <b-nav-item to="/weather">Weather</b-nav-item>
          <b-nav-item to="/favorites">Favorites</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-form-radio-group
          id="btn-radios-1"
          @change="toggle"
          v-model="selected"
          :options="options"
          buttons
          name="radios-btn-default"
        ></b-form-radio-group>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selected: "Metric",
      options: [
        { text: "°C", value: "Metric" },
        { text: "°F", value: "Imperial" }
      ]
    };
  },
  methods: {
    toggle(unit) {
      this.$store.dispatch({ type: "handleTempUnit", unit });
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-collapse {
  justify-content: space-between;
}
</style>