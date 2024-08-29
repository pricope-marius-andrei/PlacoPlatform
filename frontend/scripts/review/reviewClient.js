import { getCookie } from "../utils/cookies.js";

const commentsList = document.getElementById("comments_list");
const starsList = document.getElementById("reviews");

let sum = 0;

document.addEventListener("DOMContentLoaded", async () => {

    const searchParams = new URLSearchParams(window.location.search);
    const workerId = searchParams.get("id");
    const token = getCookie("token");

    const getReviews = async () => {
        
        const response = await fetch(`http://localhost:3000/api/review/${workerId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.json();
    }

    const reviews = await getReviews();

    console.log(reviews);

    reviews.map((review) => {
        
        const reviewContainer = document.createElement('div');
        reviewContainer.className = "comment";

        const reviewComment = document.createElement('p');
        reviewComment.innerText = review.comment;

        sum += review.stars;

        const reviewStars = document.createElement('div');
        reviewStars.className = "stars";

        for (let i = 0; i < review.stars ; i++) {
            const fullStar = document.createElement('i');
            fullStar.className = "fa-solid fa-star fa-xl";
            fullStar.style.color = "#FFD43B";
            reviewStars.appendChild(fullStar);
        }

        for (let i = 0; i < 5 - review.stars; i++) {
            const emptyStar = document.createElement('i');
            emptyStar.className = "fa-regular fa-star fa-xl";
            emptyStar.style.color = "#FFD43B";
            reviewStars.appendChild(emptyStar);
        }

        
        reviewContainer.appendChild(reviewStars);
        reviewContainer.appendChild(reviewComment);

        commentsList.appendChild(reviewContainer);
    
    })

    const reviewsNumber = reviews.length;
    const averageRating = sum / reviewsNumber;

    const roundedRating = Math.round(averageRating); 

    for (let i = 0; i < roundedRating; i++) {
        const fullStar = document.createElement('i');
        fullStar.className = "fa-solid fa-star fa-2xl";
        fullStar.style.color = "#FFD43B";
        starsList.appendChild(fullStar);
    }
    
    const emptyStarsCount = 5 - roundedRating;
    for (let i = 0; i < emptyStarsCount; i++) {
        const emptyStar = document.createElement('i');
        emptyStar.className = "fa-regular fa-star fa-2xl";
        emptyStar.style.color = "#FFD43B";
        starsList.appendChild(emptyStar);
    }
    

})