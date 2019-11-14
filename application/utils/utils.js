import ConfigApp from "./ConfigApp";
import CacheManager from "./CacheManager";
import {getTargetLanguage, translatePromptStringArray, translateRecipe} from "./Translating";

export function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export function getSpoonacularTypeOrDiet(categoryTitle) {
  let result = {
    diet: null,
    type: null,
    keyword: "",
  };
  if (categoryTitle) {
    switch (categoryTitle.toLowerCase()) {
      case "gluten free":
      case "ketogenic":
      case "vegetarian":
      case "lacto-vegetarian":
      case "ovo-vegetarian":
      case "vegan":
      case "pescetarian":
      case "paleo":
      case "primal":
      case "whole30":
      case "vegetarian (lacto/ovo)":
        result.diet = categoryTitle;
        break;
      case "main course":
      case "side dish":
      case "dessert":
      case "appetizer":
      case "salad":
      case "bread":
      case "breakfast":
      case "soup":
      case "beverage":
      case "sauce":
      case "marinade":
      case "fingerfood":
      case "snack":
      case "drink":
        result.type = categoryTitle;
        break;

      default:
        result.keyword = categoryTitle;
    }
  }
  if (!result.type && !result.diet) {
    result.keyword = categoryTitle || "";
  }
  return result;
}

export function randomItemFromArray(array) {
  if (!array || !Array.isArray(array)) {
    return null;
  }
  let value = array[Math.floor(Math.random()*array.length)];
  if (value && value.toLowerCase() === "lacto ovo vegetarian") {
    return "Vegetarian (Lacto/Ovo)";
  }
  if (value && value.toLowerCase() === "chines") {
    return "Chinese";
  }
  return value;
}

export function convertRecipesSpoonacularToCookAid(recipes, cuisine, diet = null, type = null, needTranslate = true) {
  return new Promise(async (resolve, reject) => {
    try {
      const newRecipes = recipes.map(item => {
        if (!item) return item;
        let newItem = {};
        newItem.isSpoonacular = true;
        newItem.id = item.id;
        newItem.recipe_id = item.id ? item.id.toString() : '';
        newItem.recipe_title = item.title;
        newItem.recipe_image = `https://spoonacular.com/recipeImages/${item.id}-${'636x393'}.jpg`;
        newItem.recipe_image_lower = `https://spoonacular.com/recipeImages/${item.id}-${'312x231'}.jpg`;
        CacheManager.prefetch(newItem.recipe_image_lower)
          .then(() => {
            return CacheManager.prefetch(newItem.recipe_image);
          })

        newItem.recipe_time = item.readyInMinutes;
        newItem.recipe_cals = item && item.nutrition && item.nutrition[0] ? Math.round(item.nutrition[0].amount) : '';
        if (item && item.nutrition && item.nutrition.nutrients) {
          const filtedCal = item.nutrition.nutrients.filter(i => i.title && i.title.toLowerCase() === "calories");
          if (filtedCal && filtedCal[0]) {
            newItem.recipe_cals = Math.round(filtedCal[0].amount);
          }
        }

        newItem.recipe_servings = item.servings;
        newItem.recipe_description = "";
        newItem.recipe_video = "";

        if (item.missedIngredients) {
          newItem.recipe_ingredients = item.missedIngredients.map(item => {
            item.image = item.image.replace("100x100", "500x500");
            return item;
          });
        }


        newItem.recipe_directions = generateMethod(item);

        newItem.recipe_notes = "";
        newItem.recipe_featured = "no";
        newItem.recipe_status = "Publish";
        newItem.category_title = diet || type || randomItemFromArray(item.diets) || randomItemFromArray(item.dishTypes) || "";
        newItem.chef_title = cuisine || randomItemFromArray(item.cuisines) || "";
        newItem.creditsText = item.creditsText;
        newItem.sourceUrl = item.sourceUrl;
        return newItem;
      });

      if (!needTranslate) {
        return resolve(newRecipes)
      }
      const promises = newRecipes.map(item => {
        return translateRecipe(item);
      });
      Promise.all(promises)
        .then(results => {
          return resolve(results);
        })
        .catch(err => {
          console.log('translateRecipe error', err)
          return resolve(newRecipes);
        })
      const targetLanguage = getTargetLanguage();
      let arrayRecipeTitle = newRecipes.map(recipe => recipe['recipe_title']);
      let translatedRecipeTitles = await translatePromptStringArray(arrayRecipeTitle, targetLanguage);
      translatedRecipeTitles.map((item, index) => {
        newRecipes[index] = Object.assign(newRecipes[index], {
          recipe_title: item,
          recipe_title_translated: targetLanguage
        })
      });
      return resolve(newRecipes);
    } catch (e) {
      console.log('error convert', e);
      return reject(e);
    }

  })
}
export async function preLoadRecipeImage(recipes) {
  const length = recipes.length;
  for (let i = 0; i< length; i++) {
    const item = recipes[i];
    await CacheManager.prefetch(item.recipe_image_lower);
  }
}

function generateIngredients(item) {
  if (!item || (item && !item.missedIngredients)) {
    return "";
  }
  if (item && item.missedIngredients && !Array.isArray(item.missedIngredients)) {
    return item.missedIngredients;
  }
  const mapped = item.missedIngredients.map((ingredient) => {
    return `<li>${ingredient.originalString || ingredient.original}</li>`
  })
  return `<ul>${mapped.join("")}</ul>`;
}

function generateMethod(item) {
  if (!item || !item.analyzedInstructions || !item.analyzedInstructions[0] || !item.analyzedInstructions[0].steps) {
    return "";
  }
  if (item.analyzedInstructions[0].steps && !Array.isArray(item.analyzedInstructions[0].steps)) {
    return item.analyzedInstructions[0].steps;
  }
  const mapped = item.analyzedInstructions[0].steps.map(step => {
    return `<li>${step.step || ""}</li>`
  })
  return `<ol>${mapped.join("")}</ol>`;
}

export function cachingCategoriesImage(categories) {
  if (!categories || categories && !Array.isArray(categories)) {
    return;
  }
  categories.map(async (item) => {
    await CacheManager.prefetch(ConfigApp.URL + 'images/' + item.category_image);
  })
}

export function cachingCuisineImage(cuisine) {
  if (!cuisine || cuisine && !Array.isArray(cuisine)) {
    return;
  }
  cuisine.map(async (item) => {
    await CacheManager.prefetch(ConfigApp.URL + 'images/' + item.chef_image);
  })
}

export function getRandomArray(array, maxNumber) {
  if (!array || array && !Array.isArray(array)) {
    return null;
  }
  const used = [];
  const result = [];

  do {
    const random = Math.floor(Math.random() * array.length);
    if (!used.includes(random)) {
      used.push(random);
      result.push(array[random])
    }
  } while (result.length < maxNumber);
  return result;
}

export function findDuplicateInArray(arg) {
  return arg.filter(function(a){
    return arg.indexOf(a) !== arg.lastIndexOf(a)
  });
}

export function getArrayStringFromXML(xmlString) {
  /*const response = '<ArrayOfstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">\n' +
    '    <string>首 个 文字</string>\n' +
    '    <string>2 个 文本</string>\n' +
    '    <string>2 个 文本</string>\n' +
    '    <string>2 个 文本</string>\n' +
    '</ArrayOfstring>';*/

  const re = /<string>(.*)<\/string>/gm;
  const result = [];
  let m;
  do {
    m = re.exec(xmlString);
    if (m) {
      result.push(m[1]);
    }
  } while (m);
  return result;
}
