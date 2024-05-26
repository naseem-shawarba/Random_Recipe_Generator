export default {
  hasError({error}) {
    return !!error
  },
  errorMessage({error}) {
    return error
  },
  isLoading({loading}) {
    return loading
  },
  recipeImageURL(state) {
    return state.recipe.strMealThumb;
  },
  recipeName(state) {
    return state.recipe.strMeal;
  },
  recipeCategory(state) {
    return state.recipe.strCategory;
  },
  recipeOrigin(state) {
    return state.recipe.strArea;
  },
  recipeIngredientsAndMeasures(state) {
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
  recipeInstructions(state) {
    return state.recipe.strInstructions;
  },
  recipeOrigins({origins}) {
    return origins;
  },
  recipeCategories(state) {
    return state.categories.filter(
      (category) => category !== "Pork"
    );
  },

  recipeCookingVideoURL(state) {
    return state.recipe.strYoutube;
  },

  recipeCookingVideoURLForIframe(state, getters) {
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
