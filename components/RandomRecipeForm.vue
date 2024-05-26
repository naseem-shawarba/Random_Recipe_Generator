<template>
  <div>
    <v-row>
      <v-col class="d-flex" cols="12" xl="5" lg="5" md="5" sm="6" xs="12">
        <v-select
          :clearable="true"
          v-model="origin"
          :items="recipeOrigins"
          label="Origin"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" xl="5" lg="5" md="5" sm="6" xs="12">
        <v-select
          :clearable="true"
          v-model="category"
          :items="recipeCategories"
          label="Category"
        ></v-select>
      </v-col>
      <v-col class="d-flex mt-3" cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
        <v-btn @click="generate" block>Generate</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      category: null,
      origin: null,
    };
  },
  created() {
    this.generate();
    this.fetchOriginsAndCategories();
  },

  methods: {
    generate() {
      this.$store.dispatch("generate", {
        category: this.category,
        origin: this.origin,
      });
    },
    fetchOriginsAndCategories(){
      this.$store.dispatch("fetchOriginsAndCategories");
    }
  },
  computed: mapGetters([
      'recipeOrigins','recipeCategories'
    ])
};
</script>
