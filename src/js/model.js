import { async } from "regenerator-runtime";
import * as config from "./config.js";
import { getJsonFromUrl } from "./helper.js";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: config.RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJsonFromUrl(`${config.API_URL}/${id}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.recipe.bookmarked = Boolean(state.bookmarks.some(recipe => recipe.id === state.recipe.id));
  } catch (error) {
    throw error;
  }
};

export const updateRecipeServings = function (newServings) {
  if (!state.recipe) return;
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = ingredient.quantity * newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings;
}

export const loadSearchResults = async function (query) {
  try {
    const data = await getJsonFromUrl(`${config.API_URL}/?search=${query}`);
    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = +page;
  const start = (page - 1) * config.RESULTS_PER_PAGE;
  const end = page * config.RESULTS_PER_PAGE;
  return state.search.results.slice(start, end);
}

export const addBookmark = function (recipe = state.recipe) {
  state.recipe.bookmarked = true;
  state.bookmarks.push(recipe);
}

export const removeBookmark = function (id = state.recipe.id) {
  const index = state.bookmarks.indexOf(recipe => recipe.id === id);
  state.recipe.bookmarked = false;
  state.bookmarks.splice(index, 1);
}
