import { getCookie } from "../utils/cookies.js";

async function getDetailsWorker(url) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    console.log(response.status);
    if (response.status === 401 || response.status === 403 || response.status === 500) {
        window.location.href = '/frontend/index.html';
        return null;
    }

    return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const workerDetails = await getDetailsWorker("http://localhost:3000/api/worker/details");

        document.getElementById('contact').value = workerDetails.contact ? workerDetails.contact : '';
        document.getElementById('description-input').value = workerDetails.description ? workerDetails.description : '';

        const dropArea = document.getElementById("drop-area");
        const inputImg = document.getElementById("upload-photo");
        dropArea.style.backgroundImage = workerDetails.img ? `url(${`data:image/jpeg;base64,${workerDetails.img}`})` : '';
    
        const imgView = document.getElementById("img-view");
        if(workerDetails.img)
            imgView.textContent = "";

    } catch (error) {
        alert('Informatiile nu au putut fi furnizate!');
    }
});