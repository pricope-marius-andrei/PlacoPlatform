import { getCookie } from "../utils/cookies.js";

const workerList = document.getElementById('list');

document.addEventListener("DOMContentLoaded", async () => {

    const searchParams = new URLSearchParams(window.location.search);
    const token = getCookie("token");
    const id = searchParams.get("id");

    const getOffers = async () => {
        const response = await fetch(`http://localhost:3000/api/offer/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.json();
    }

    const offersList = await getOffers();

    console.log(offersList);
    
    offersList.map(async (offer)=> {

        const workerImg = document.createElement('img');
        workerImg.className="worker_img"

       await fetch(`http://localhost:3000/api/worker/details/${offer.idWorker}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(async (response) => {            
            const workerDetails = await response.json();
            workerImg.src = `data:image/jpeg;base64,${workerDetails.img}`;
        })


        const workerContainer = document.createElement('div');
        workerContainer.className = "worker_container";
    
        const anchorTag = document.createElement('a');
        anchorTag.href=`../pages/public_worker_profile.html?id=${offer.idWorker}`;
    
       
        anchorTag.appendChild(workerImg);
    
    
        const workerOffer = document.createElement('span');
        workerOffer.className = "worker_offer";
        workerOffer.innerText = offer.offerValue;

        
        workerContainer.appendChild(anchorTag);
        workerContainer.appendChild(workerOffer);
    
        const divButtons = document.createElement('div');
        if(offer.accepted_status === false) {
            if(offer.offerValue !== null) {
            
                const iconAccept = document.createElement('i');
                iconAccept.className = "fa-solid fa-circle-check fa-2xl";
                iconAccept.style = "color: #ffffff;"
            
                const acceptButton = document.createElement('button');
                acceptButton.className = "accept_button";
                acceptButton.appendChild(iconAccept);
                acceptButton.onclick = async () => {
                    await fetch(`http://localhost:3000/api/offer/accept/${offer.idOffer}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }).then( async ()  => {   
                        await fetch(`http://localhost:3000/api/notifications`, {
                        
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                worker_id: offer.idWorker,
                                created_at: new Date(),
                                accepted_status: true,
                                ad_id: offer.idAd
                            })
                        })
                        window.location.reload();
                    })
                    .catch((error) => { console.error('Error:', error); });
                }
            
            
                const iconReject = document.createElement('i');
                iconReject.style = "color: #ffffff;"
                iconReject.className ="fa-solid fa-eraser fa-2xl";
            
                const rejectButton = document.createElement('button'); 
                rejectButton.onclick = async () => {
                    await fetch(`http://localhost:3000/api/offer/${offer.idOffer}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }).then( async ()  => {   
                        await fetch(`http://localhost:3000/api/notifications`, {
                        
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                worker_id: offer.idWorker,
                                created_at: new Date(),
                                accepted_status: false,
                                ad_id: offer.idAd
                            })
                        })
                        window.location.reload();
                    })
                    .catch((error) => { console.error('Error:', error); });
                }
            
                rejectButton.className = "reject_button";
                rejectButton.appendChild(iconReject);
            
                divButtons.appendChild(acceptButton);
                divButtons.appendChild(rejectButton);
                workerContainer.appendChild(divButtons);
            }
            else {
                const iconPending = document.createElement('i');
                iconPending.style = "color: #ffffff;"
                iconPending.className ="fa-solid fa-clock fa-2xl";
            
                const pendingButton = document.createElement('button');
            
                pendingButton.className = "pending_button";
                pendingButton.appendChild(iconPending);
            
                divButtons.appendChild(pendingButton);
                workerContainer.appendChild(divButtons);
            }
        }
        else 
        {
            const iconReview = document.createElement('i');
            iconReview.className = "fa-solid fa-handshake fa-2xl";
            iconReview.style = "color: #090834;"
            
            const reviewButton = document.createElement('a');
            reviewButton.className = "review_button";
            reviewButton.href = `./reviws_client.html?id=${offer.idWorker}&idOffer=${offer.idOffer}&idAd=${offer.idAd}`;
            reviewButton.appendChild(iconReview);

            workerContainer.appendChild(reviewButton);
        }
    
        workerList.appendChild(workerContainer);
    })


   
})