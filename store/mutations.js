export default {
  setRecipe(state, { recipe }) {
    state.recipe = recipe || {};
  },
  setOrigins(state, { origins }) {
    state.origins = origins || [];
  },
  setCategories(state, { categories }) {
    state.categories = categories || [];
  },
  setError(state, { error }) {
    state.error = error || "";
  },
  setLoading(state, { loading }) {
    state.loading = loading || false;
  },
};
