<template>
  <div class="search-input-container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="warning"
      @dismiss-count-down="countDownChanged"
    >Use Eglish Letters Only</b-alert>
    <p>type the name of the city for forecast:</p>
    <div class="search-input-area">
      <b-form-input v-model="text" @input="handleInput" placeholder="example: Tel Aviv"></b-form-input>
      <b-spinner v-if="spin" class="input-spinner" variant="info" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: ["isPickingItem"],
  data() {
    return {
      text: "",
      inputFocused: false,
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  methods: {
    handleInput() {
      if (this.text && !this.text.match(/^[a-zA-Z ]+$/)) {
        return this.showAlert();
      } else if (!this.text) {
        return;
      } else {
        this.$store.dispatch({ type: "handleSpinIcon", isActive: true });
        this.$emit("newSearchInput", this.text);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  computed: {
    spin() {
      return this.$store.state.isSpinIconActive;
    }
  },
  watch: {
    isPickingItem() {
      if (this.isPickingItem) this.text = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.search-input-container {
  max-width: 600px;

  @media (min-width: 640px) {
    margin: 0 auto;
  }

  p {
    text-align: left;
    padding-left: 10px;
    margin: 0;
  }
}

.focusText {
  font-size: 20px;
}

.search-input-area {
  position: relative;
}

.input-spinner {
  position: absolute;
  top: 10%;
  right: 10px;
  width: 30px;
  height: 30px;
  border-width: 2px;
}
</style>