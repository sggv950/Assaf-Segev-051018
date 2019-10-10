<template>
  <div id="app">
    <nav-bar></nav-bar>
    <error-modal @modal-checked="handleToggleError" :isError="isError"></error-modal>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ErrorModal from "@/components/ErrorModal";

export default {
  components: {
    NavBar,
    ErrorModal
  },
  methods: {
    handleToggleError() {
      this.$store.dispatch({ type: "handleToggleError" });
    }
  },
  computed: {
    isError() {
      return this.$store.state.isError;
    }
  }
};
</script>

<style lang="scss">
</style>
