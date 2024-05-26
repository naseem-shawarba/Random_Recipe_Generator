export default {
  hasError: (state) => !!state.error,
  errorMessage: (state) => state.error,
  isLoading: (state) => state.loading,
  recipeImageURL: (state) => state.recipe.strMealThumb,
  recipeName: (state) => state.recipe.strMeal,
  recipeCategory: (state) => state.recipe.strCategory,
  recipeOrigin: (state) => state.recipe.strArea,
  recipeIngredientsAndMeasures: (state) => {
    // strMeasure1 strIngredient1
    const ingredientsAndMeasures = [];
    for (let i = 1; i <= 20; i++) {
      const measure = state.recipe[`strMeasure${i}`];

      const ingredient = state.recipe[`strIngredient${i}`];
      if (measure && ingredient) {
        ingredientsAndMeasures.push(`${measure} ${ingredient}`);
      }
    }
    return ingredientsAndMeasures;
  },
  recipeInstructions: (state) => state.recipe.strInstructions,
  recipeOrigins: (state) => state.origins,
  recipeCategories: (state) =>
    state.categories.filter((category) => category !== "Pork"),

  recipeCookingVideoURL: (state) => state.recipe.strYoutube,

  recipeCookingVideoURLForIframe: (state, getters) => {
    const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
    const recipeCookingVideoURL = getters.recipeCookingVideoURL;

    if (!recipeCookingVideoURL) {
      return null;
    }
    const url = recipeCookingVideoURL.split(
      /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
    );

    const YId = url[2]?.split(/[^0-9a-z_/\\-]/i)[0] ?? url[0];
    if (YId === url[0]) {
      // "not a youtube link"
      return null;
    }
    const topOfQueue = youtubeEmbedTemplate.concat(YId);
    return topOfQueue;
  },
};
