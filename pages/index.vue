<template>
  <div class="mx-2">
    <div>
      <RandomRecipeForm class="mb-4"/>
    </div>

    <div class="d-flex justify-center" v-if="isLoading">
      <v-progress-circular :size="150" :width="8" indeterminate class="mt-12" color="blue-darken-1">
      </v-progress-circular>
    </div>
    <div v-else-if="hasError">
      <v-alert colored-border type="error" elevation="2">
        {{ errorMessage }}
      </v-alert>
    </div>

    <div class="mt-0 pt-0 d-flex justify-center" v-else>
      <RandomRecipeCard />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters([
      'hasError', 'errorMessage', 'isLoading'
    ])

};
</script>
