import { getCookie } from "../utils/cookies.js";

const adsSelector = document.getElementById("ads_selector");

document.addEventListener("DOMContentLoaded", async () => {

    const getClientAds = async () => {
        const token = getCookie('token');
        const response = await fetch("http://localhost:3000/api/client", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const ads = await response.json();
        return ads;
    }

    const ads = await getClientAds();

    console.log(ads);

    ads.map((ad) => {
        const selectOption = document.createElement('option');
        selectOption.value = ad.id_add;
        selectOption.textContent = ad.title;

        adsSelector.append(selectOption);
    })

})

