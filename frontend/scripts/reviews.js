
let reviewsNumber = 100;
let totalRating = 320;
const reviewsContainer = document.getElementById('reviews');

console.log(reviewsContainer);

for(let i = 0; i < totalRating / reviewsNumber; i++)
{
    const fullStar = document.createElement('i');
    fullStar.className = "fa-solid fa-star fa-2xl";
    fullStar.style = "color: #FFD43B;";

    const span = document.createElement('span');
    span.appendChild(fullStar);
    reviewsContainer.appendChild(span);
}

for(let i = 0; i < 5 - totalRating / reviewsNumber - 1; i++)
{
    const halfStar = document.createElement('i');
    halfStar.className = "fa-regular fa-star fa-2xl";
    halfStar.style = "color: #FFD43B;";

    const span = document.createElement('span');
    span.appendChild(halfStar);
    reviewsContainer.appendChild(span);   
}