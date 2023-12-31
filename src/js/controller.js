import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) module.hot.accept();

const recipeController = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const updateRecipeServingsController = function (newServings) {
  model.updateRecipeServings(newServings);
  recipeView.update(model.state.recipe);
}

const searchController = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    painationController(1);
  } catch (error) {
    console.log(error);
  }
}

const painationController = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

const bookmarkController = function () {
  model.state.recipe.bookmarked ? model.removeBookmark() : model.addBookmark();
  recipeView.update(model.state.recipe);
}

const init = function () {
  recipeView.addHandlerRender(recipeController);
  searchView.addHandlerRender(searchController);
  paginationView.addHandlerRender(painationController);
  resultsView.addClickResultsHandler();
  recipeView.updateServingsHandler(updateRecipeServingsController);
  recipeView.bookmarkHandler(bookmarkController);
}

init();