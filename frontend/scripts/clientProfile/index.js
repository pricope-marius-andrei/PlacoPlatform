import { getCookie } from "../utils/cookies.js";

document.addEventListener('DOMContentLoaded', async () => {
    const adsList = document.getElementById("ads_list");

    async function fetchAds() {
        const token = getCookie('token');
        const response = await fetch("http://localhost:3000/api/client", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.status === 401 || response.status === 403 || response.status === 500) {
            window.location.href = '/frontend/index.html';
            return null;
        }
        
        const ads = await response.json();
        return ads;
    }

    function populateAds(ads) {
        ads.forEach((ad, index) => {
            
            const adElement = document.createElement('div');
            adElement.className = "ad";
            adElement.id = ad.id_add;

            const imgAd = document.createElement('img');
            imgAd.className = "img_ad";
            imgAd.src = `data:image/jpeg;base64,${ad.img}`; 

            const titleAd = document.createElement('h1');
            titleAd.className = "title_ad";
            titleAd.innerText = ad.title; 

            const viewButton = document.createElement('a');
            viewButton.className = "solid-button";
            viewButton.innerText = "View";
            viewButton.href = `./adpage.html?id=${adElement.id}`;

            adElement.appendChild(imgAd);
            adElement.appendChild(titleAd);
            adElement.appendChild(viewButton);

            adsList.appendChild(adElement);
        });
    }

    const ads = await fetchAds();
    populateAds(ads);
    
});