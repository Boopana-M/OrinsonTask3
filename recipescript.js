document.addEventListener("DOMContentLoaded", function () {
    const recipeList = document.getElementById("recipe-list");
    const searchInput = document.getElementById("search");
    const filters = document.querySelectorAll(".filter");

    fetch("recipes.json")
        .then(response => response.json())
        .then(data => displayRecipes(data));

    function displayRecipes(recipes) {
        recipeList.innerHTML = "";
        recipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
            `;
            recipeCard.addEventListener("click", () => {
                window.location.href = `recipe.html?id=${recipe.id}`;
            });
            recipeList.appendChild(recipeCard);
        });
    }

    searchInput.addEventListener("input", () => {
        fetch("recipes.json")
            .then(response => response.json())
            .then(data => {
                const filtered = data.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchInput.value.toLowerCase())
                );
                displayRecipes(filtered);
            });
    });

    filters.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            fetch("recipes.json")
                .then(response => response.json())
                .then(data => {
                    const filtered = category === "all" ? data : data.filter(recipe => recipe.category === category);
                    displayRecipes(filtered);
                });
        });
    });
});
