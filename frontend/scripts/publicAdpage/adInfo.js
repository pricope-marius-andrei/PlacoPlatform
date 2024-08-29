import { getCookie } from "../utils/cookies.js";

const description = document.getElementById('description');
const title = document.getElementById('title');
const makeOfferButton = document.getElementById('makeOfferButton');
const offer = document.getElementById('offer');
const adImg = document.getElementById('ad_img');

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = getCookie('token');
    
    const getAdInfo = async () => {
        const id = searchParams.get('id');
        
    
        const response = await fetch(`http://localhost:3000/api/ad/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }); 
    
        return response.json();
    }

    const makeOffer = async () => {
        const idAd = searchParams.get('id');
        const idWorker = getCookie('userId');
        const offerValue = parseInt(offer.value);

        console.log(offerValue);

        const offerDetails = {
            "idAd" : idAd,
            "idWorker": idWorker,
            "offerValue": offerValue,
        }

        try
        {
            await fetch(`http://localhost:3000/api/offer`, {
                method: "PUT",
                body: JSON.stringify(offerDetails),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Oferta a fost facuta cu succes!');
            window.location.reload();
        } 
        catch (error) {
            alert('Oferta nu a putut fi facuta!');
        }
        
    }

    const adInfo = await getAdInfo();

    description.textContent = adInfo[0].description;
    title.textContent = adInfo[0].title;
    adImg.src = adInfo[0].img;

    makeOfferButton.onclick = makeOffer;

})


