<template>
  <section class="search-component-container">
    <search-input
      @newSearchInput="debounceHandleNewInput"
      :isPickingItem="isPickingItem"
      class="search-input"
    ></search-input>
    <search-output
      v-if="citiesSuggestions.length > 0"
      :cities="citiesSuggestions"
      class="search-output"
      @cityPick="handlePickCity"
    ></search-output>
  </section>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import SearchOutput from "@/components/SearchOutput";
import _ from "lodash";

export default {
  components: {
    SearchInput,
    SearchOutput
  },
  data() {
    return {
      textFromInput: "",
      isPickingItem: false
    };
  },
  methods: {
    handleNewInput(newInput) {
      this.isPickingItem = false;
      this.$store.dispatch({
        type: "handleCitiesAutocomplete",
        input: newInput
      });
    },
    handlePickCity(city) {
      this.isPickingItem = true;
      this.$store.dispatch({ type: "handleMainForecast", city });
    }
  },
  computed: {
    citiesSuggestions() {
      return this.$store.getters.citiesSuggestions;
    }
  },
  created() {
    this.debounceHandleNewInput = _.debounce(this.handleNewInput, 1000);
  }
};
</script>

<style lang="scss" scoped>
.search-component-container {
  max-width: 350px;
  margin: 30px auto;
  @media (min-width: 640px) {
    max-width: 600px;
  }
}

.search-input {
  @media (min-width: 640px) {
    width: 600px;
  }
}
.search-output {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #ced4da;
  z-index: 50;
  width: 100%;
  @media (min-width: 640px) {
    width: 600px;
  }
}
</style>