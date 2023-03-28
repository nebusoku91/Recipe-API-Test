const apiEndpoint = "https://api.edamam.com/api/recipes/v2?type=public&app_id=66c1bd49&app_key=9d51d748dfa4cfff2d039a54568dfd2a";

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const searchQuery = searchForm.querySelector("input[name='query']").value;

  const searchEndpoint = `${apiEndpoint}&q=${encodeURIComponent(searchQuery)}`;

  fetch(searchEndpoint)
    .then(response => response.json())
    .then(data => {
      const recipeResults = document.getElementById("recipe-results");
      recipeResults.innerHTML = "";
      data.hits.forEach(hit => {
        const recipe = hit.recipe;
        const recipeHtml = `
          <h2>${recipe.label}</h2>
          <img src="${recipe.image}" alt="${recipe.label}">
          <p>Calories: ${recipe.calories.toFixed(0)}</p>
          <p>Ingredients:</p>
          <ul>
            ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join("")}
          </ul>
        `;
        recipeResults.insertAdjacentHTML("beforeend", recipeHtml);
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});
