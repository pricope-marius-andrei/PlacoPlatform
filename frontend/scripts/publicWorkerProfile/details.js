import { getCookie } from "../utils/cookies.js";

const workerImg = document.getElementById("worker_img");
const contact = document.getElementById("contact");
const description = document.getElementById("description");


// /api/worker/details

document.addEventListener("DOMContentLoaded" ,async () => {

    const token = getCookie('token');
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    const getWorkerDetails = async () => {
        const response = await fetch(`http://localhost:3000/api/worker/details/${id}`, {
            method: "GET",
            headers: {
                  'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.json();
    }

    const details = await getWorkerDetails();

    contact.textContent = details.contact;
    description.textContent = details.description;
    workerImg.src = `data:image/jpeg;base64,${details.img}`;
})