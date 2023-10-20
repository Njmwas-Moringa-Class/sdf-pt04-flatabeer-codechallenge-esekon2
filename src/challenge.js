document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000"; // first we need to declare the base URL for the API.
    console.log("API base URL:", baseUrl); // Verify we can access the API base URL.
  
    // This is a function to fetch and display beer details.
    const fetchAndDisplayBeer = (beerId) => {
      console.log("Can we see the ber datails:"); // Log that beer details are being fetched.
      fetch(`${baseUrl}/beers/${beerId}`)
        .then((response) => response.json())
        .then((beerData) => {
          console.log("Lets see if beer data can be retrieved:", beerData); // Log the retrieved beer data.
          const beerName = document.getElementById("beer-name");
          const beerDescription = document.getElementById("beer-description");
          const beerImage = document.getElementById("beer-image");
          const reviewList = document.getElementById("review-list");
  
          beerName.textContent = beerData.name;
          beerDescription.textContent = beerData.description;
          beerImage.src = beerData.image_url;
  
          console.log("Are the beer datail displayed on the page: "); // are the details are being displayed.
          reviewList.innerHTML = "";
          beerData.reviews.forEach((review) => {
            const li = document.createElement("li");
            li.textContent = review;
            reviewList.appendChild(li);
          });
        });
    };
  
    // We nned to show the beer menu, a function for ths is required
    const fetchAndDisplayBeerMenu = () => {
      console.log("Fetching beer menu..."); // Check that beer menu data is being fetched.
      fetch(`${baseUrl}/beers`)
        .then((response) => response.json())
        .then((beers) => {
          console.log("Check the beer menu:", beers); // To check the retrieved beer menu.
          const beerList = document.getElementById("beer-list");
          beerList.innerHTML = ""; 
  
          beers.forEach((beer) => {
            const li = document.createElement("li");
            li.textContent = beer.name;
            li.addEventListener("click", () => {
              fetchAndDisplayBeer(beer.id);
            });
            beerList.appendChild(li);
          });
          
          // We want to select and display the first beer when the menu is loaded.
          if (beers.length > 0) {
            fetchAndDisplayBeer(beers[0].id);
          }
        });
    };
  
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newReview = document.getElementById("review").value;
      const reviewList = document.getElementById("review-list");
      const li = document.createElement("li");
      li.textContent = newReview;
      reviewList.appendChild(li);
      document.getElementById("review").value = "";
      console.log("Updated review:"); // Console Log to check if a new review is added.
    });
  
   
    fetchAndDisplayBeerMenu();
  });
  