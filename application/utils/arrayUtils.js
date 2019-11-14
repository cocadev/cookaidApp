export function getUniqueArray(arg) {
  const tempObject = {};
  arg.map(item => {
    tempObject[item.recipe_title] = item;
  })
  return Object.keys(tempObject).map(key => tempObject[key]);
}
