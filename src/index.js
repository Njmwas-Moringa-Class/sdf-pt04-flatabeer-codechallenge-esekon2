// When the page is fully loaded, we begin here.
document.addEventListener("DOMContentLoaded", () => {

    // First, we define the base URL for the API.
    const baseUrl = "http://localhost:3000";
    console.log("API base URL:", baseUrl);
    // Next, we create a function to fetch and display beer details.
    const fetchAndDisplayBeer = (beerId) => {
    // Inside this function, we start by fetching beer data from the API.
    fetch(`${baseUrl}/beers/${beerId}`)
        .then((response) => response.json())
        .then((beerData) => {
            // Then, we retrieve references to HTML elements for displaying beer information.
            const beerName = document.getElementById("beer-name");
            const beerDescription = document.getElementById("beer-description");
            const beerImage = document.getElementById("beer-image");
            const reviewList = document.getElementById("review-list");

            // We update the webpage to show beer details, including name, description, and image.
            beerName.textContent = beerData.name;
            beerDescription.textContent = beerData.description;
            beerImage.src = beerData.image_url;

            // We clear the existing reviews and add new reviews to the list.
            reviewList.innerHTML = "";
            beerData.reviews.forEach((review) => {
                const li = document.createElement("li");
                li.textContent = review;
                reviewList.appendChild(li);
            });
        });
};
    // Moving on, we create a function to fetch and display the beer menu.
    const fetchAndDisplayBeerMenu = () => {
        // Within this function, we initiate a fetch to obtain the list of available beers from the API.
        fetch(`${baseUrl}/beers`)
        .then((response) => response.json())
        .then((beers) => {
            // We get a reference to the HTML element that will serve as the beer menu.
            const beerList = document.getElementById("beer-list");
            // We clear any existing menu items.
            beerList.innerHTML = "";

            // We iterate through the list of beers and create a menu item for each.
            beers.forEach((beer) => {
                const li = document.createElement("li");
                li.textContent = beer.name;

                // We add an event listener to each menu item to display beer details when clicked.
                li.addEventListener("click", () => {
                    fetchAndDisplayBeer(beer.id);
                });

                // Finally, we add the menu item to the beer menu.
                beerList.appendChild(li);
            });

            // We automatically select and display the first beer when the menu is loaded, if available.
            if (beers.length > 0) {
                fetchAndDisplayBeer(beers[0].id);
            }
        });
};

    // We proceed to handle the review form.
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault(); // We prevent the default form submission.

        // We retrieve the new review text from the input field.
        const newReview = document.getElementById("review").value;
        const reviewList = document.getElementById("review-list");

        // We display the new review in the list and clear the input field.
        const li = document.createElement("li");
        li.textContent = newReview;
        reviewList.appendChild(li);
        document.getElementById("review").value = ""; // We clear the review input field.
    });

    // As part of the initial setup, we fetch and display the beer menu when the page loads.
    fetchAndDisplayBeerMenu();

});
