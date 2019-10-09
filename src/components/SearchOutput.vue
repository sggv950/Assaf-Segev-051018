<template>
  <div class="search-output-container" v-if="cities">
    <ul>
      <li
        v-for="city in cities"
        :key="city.key"
        @click="handlePickCity(city)"
      >{{city.LocalizedName}}, {{city.Country.LocalizedName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["cities"],
  methods: {
    handlePickCity(city) {
      console.log("picked city",city);
      this.$emit("cityPick", city);
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 5px;
  &:not(:last-child) {
    border-bottom: 1px solid #ced4da;
  }
}
</style>