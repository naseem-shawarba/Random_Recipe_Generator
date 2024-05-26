async function fetchOrigins({ commit }) {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    const response = await fetch(url);
    const responseData = await response.json();
    if (!responseData.meals) {
      throw new Error("No origins found :(");
    }
    const origins = responseData.meals.map((category) => category.strArea);
    commit("setOrigins", { origins });
  } catch (error) {
    commit("setError", { error });
  }
}
async function fetchCategories({ commit }) {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    const response = await fetch(url);
    const responseData = await response.json();
    if (!responseData.meals) {
      throw new Error("No categories found :(");
    }
    const categories = responseData.meals.map((category) => category.strCategory);
    commit("setCategories", { categories });
  } catch (error) {
    commit("setError", { error });
  }
}

async function getrandomRecipeIDWithoutFilters({ commit }) {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";

    const response = await fetch(url);
    const responseData = await response.json();
    if (!responseData.meals) {
      throw new Error("couldn't find an ID of a random recipe :(");
    }
    return responseData.meals[0].idMeal;

  } catch (error) {
    commit("setError", { error });
    return null;
  }
}
async function getRecipeIDsByURL({ commit }, { url }) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (!responseData.meals) {
      return [];
    }
    return responseData.meals.map((recipe) => recipe.idMeal);
  } catch (error) {
    commit("setError", { error });
    return null;
  }
}
async function getRandomRecipeID({ commit }, { category, origin }) {
  try {
    let recipeIDsByCategory;
    if (category) {
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      recipeIDsByCategory = await getRecipeIDsByURL({ commit }, { url });
      if (!recipeIDsByCategory) {
        return null;
      }
    } else {
      recipeIDsByCategory = [];
    }

    let recipeIDsByOrigin;
    if (origin) {
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${origin}`;
      recipeIDsByOrigin = await getRecipeIDsByURL({ commit }, { url });
      if (!recipeIDsByOrigin) {
        return null;
      }
    } else {
      recipeIDsByOrigin = [];
    }

    let commonElements = [];
    if (!category && !origin) {
      // random id
      const rID = await getrandomRecipeIDWithoutFilters({ commit });
      if (!rID) {
        return null;
      }
      commonElements.push(rID);
    } else if (!category) {
      commonElements = recipeIDsByOrigin;
    } else if (!origin) {
      commonElements = recipeIDsByCategory;
    } else {
      commonElements = recipeIDsByOrigin.filter((id) =>
        recipeIDsByCategory.includes(id)
      );
    }

    if (commonElements.length === 0) {
      throw new Error("no recipes available :(");
    }
    const randomIDIndex = Math.floor(Math.random() * commonElements.length);
    return commonElements[randomIDIndex];
  } catch (error) {
    commit("setError", { error });
    return null;
  }
}
async function fetchRecipeByID({ commit }, { id }) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const responseData = await response.json();
    if (!responseData.meals) {
      throw new Error("Recipe not found :(");
    }
    const recipe = responseData.meals[0];
    commit("setRecipe", { recipe });
  } catch (error) {
    commit("setError", { error });
  }
}

async function generate({ commit, dispatch }, { category, origin }) {
  // Unfortunately, the API does not offer a direct method to retrieve a random recipe
  // by providing origin, category, or both simultaneously. However, it does support
  // fetching a random recipe and fetching all recipe IDs belonging to a specific origin
  // or category. To achieve the desired functionality, this function first fetches all
  // recipe IDs associated with the provided origin and all recipe IDs associated with
  // the provided category separately.
  //
  // Then, it identifies the recipe IDs that are common to both lists, indicating recipes
  // that belong to both the specified origin and category. From these shared IDs, a
  // random ID is selected. Finally, this ID is used to fetch the corresponding recipe
  // from the API.

  commit("setLoading", { loading: true });
  commit("setError", { error: "" });

  const id = await getRandomRecipeID({ commit }, { category, origin });
  if (id) {
    await fetchRecipeByID({ commit }, { id });
  }
  commit("setLoading", { loading: false });
}

async function fetchOriginsAndCategories({ commit }) {
  commit("setLoading", { loading: true });
  commit("setError", { error: "" });
  await fetchOrigins({ commit });
  await fetchCategories({ commit });
  commit("setLoading", { loading: false });
}

export default {
  generate,
  fetchOriginsAndCategories,
};
