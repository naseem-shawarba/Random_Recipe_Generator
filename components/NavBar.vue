<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>
        <a href="/" class="title">{{ title }}</a>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      title: "Random Recipe Generator",
    };
  }
};
</script>

<style scoped>
.title {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
}
</style>
