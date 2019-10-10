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
      this.$emit("cityPick", city);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-output-container {
  max-width: 350px;

  @media (min-width: 640px) {
    width: 600px;
    max-width: 600px;
  }
}

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