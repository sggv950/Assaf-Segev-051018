<template>
  <div>
    <b-modal @change="toggleChange" :visible="isError" ok-only title="Oops, Somthing went wrong...">
      <p class="my-4">Please refresh the page.</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["isError"],
  methods: {
    toggleChange() {
      this.$emit("modal-checked");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>