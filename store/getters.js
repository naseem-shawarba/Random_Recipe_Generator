export default {
  hasError: ({error}) => !!error,
  errorMessage: ({error}) =>  error,
  isLoading: ({loading}) => loading,
  recipeImageURL: ({recipe}) => recipe.strMealThumb,
  recipeName: ({recipe}) => recipe.strMeal,
  recipeCategory: ({recipe}) => recipe.strCategory,
  recipeOrigin: ({recipe}) => recipe.strArea,
  recipeIngredientsAndMeasures: ({recipe}) => {
    // strMeasure1 strIngredient1
    const ingredientsAndMeasures = [];
    for (let i = 1; i <= 20; i++) {
      const measure = recipe[`strMeasure${i}`];

      const ingredient = recipe[`strIngredient${i}`];
      if (measure && ingredient) {
        ingredientsAndMeasures.push(`${measure} ${ingredient}`);
      }
    }
    return ingredientsAndMeasures;
  },
  recipeInstructions: ({recipe}) =>  recipe.strInstructions,
  recipeOrigins: ({origins}) =>  origins,
  recipeCategories: ({categories}) =>
    categories.filter((category) => category !== "Pork"),

  recipeCookingVideoURL: ({recipe}) => recipe.strYoutube,

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
