import { getCookie } from "../utils/cookies.js";

const contact = document.getElementById("contact");
const details = document.getElementById("description-input");
const img = document.getElementById("upload-photo");

async function detailsWorker(url, data) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const change = document.getElementById("saveButton");

    change.addEventListener('click', async (e) => {
        e.preventDefault();

        const contactText = contact.value;
        const detailsText = details.value;
        const imgFile = img.files[0];

        if(contactText && detailsText && imgFile) {
            const reader = new FileReader();

            reader.onloadend = async () => {
                
                const imgBase64 = reader.result.split(',')[1];

                const data = {
                    "contact": contactText,
                    "description": detailsText,
                    "img": imgBase64
                }

                try {
                    await detailsWorker("http://localhost:3000/api/worker/details", data);
                    alert('Informatiile au fost modificate cu succes!')
                } catch (error) {
                    alert('Informatiile nu au putut fi modificate!');
                }
            };
            reader.readAsDataURL(imgFile);
        }
        else {
            alert('Completati toate campurile!');
        }
    })
});