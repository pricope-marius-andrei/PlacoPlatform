import { getCookie } from "../utils/cookies.js";

const description = document.getElementById('description');
const title = document.getElementById('title');
const adImg = document.getElementById('ad_img');

document.addEventListener("DOMContentLoaded", async () => {
    const getAdInfo = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        const token = getCookie('token');
    
        const response = await fetch(`http://localhost:3000/api/ad/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }); 
    
        return response.json();
    }

    const adInfo = await getAdInfo();
    description.textContent = adInfo[0].description;
    title.value = adInfo[0].title;
    adImg.src = adInfo[0].img;

})


