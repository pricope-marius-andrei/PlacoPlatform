import { getCookie } from '../utils/cookies.js';

const projectSelected = document.getElementById('ads_selector');
const addProjectButton = document.getElementById('add_project_button');

addProjectButton.addEventListener('click', async () => {

    const projectId = projectSelected.value;
    const searchParams = new URLSearchParams(window.location.search);
    const workerId = searchParams.get('id');
    const token = getCookie('token');

    await fetch(`http://localhost:3000/api/offer`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            idAd: projectId,
            idWorker: workerId
        }),
    })
        .then(response => response.json())
        .then(async (data) => {console.log(data);
            await fetch(`http://localhost:3000/api/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    worker_id: workerId,
                    created_at: new Date(),
                    id_offer: data.offer.idOffer,
                    ad_id: projectId
                }),
            }).then(() => alert('Added to the project.'))
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                alert('Failed to add to the project.');
            });
        })
        .catch((error) => {
            alert('Failed to add to the project.');
        });

    
});