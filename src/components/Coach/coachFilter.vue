<template>
  <h2>Find Your Coach!</h2>
  <span v-for="role in roles" :key="role" class="filter-coach">
    <input type="checkbox" checked :id="role" @change="setFilter($event)" />
    <label for="role">{{ role }}</label>
  </span>
</template>

<script>
export default {
  emits: ["filter-change"],
  data() {
    return {
      roles: ["frontend", "backend", "career"],
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    // update Filters after changing checkboxes
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      // store filters inside the updatedFilter
      const updatedFilter = {
        ...this.filters,
        [inputId]: isActive, // updated value for changed checkbox
      };
      this.filters = updatedFilter;
      //console.log(this.filters);
      // Emit updatedFilter object through filter-change
      this.$emit("filter-change", updatedFilter);
    },
  },
};
</script>

<style scoped>
span.filter-coach {
  margin-right: 1rem;
}
label {
  font-family: inherit;
  font-weight: bold;
}
</style>
