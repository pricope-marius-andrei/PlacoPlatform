import { getCookie } from "../utils/cookies.js";

const title = document.getElementById("title-input");
const description = document.getElementById("description-input");
const category = document.getElementById("category-input");
const addPhoto = document.getElementById("upload-photo");

async function createNewAd(url, data) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if(response.status === 401 || response.status === 403 || response.status === 500) {
        window.location.href = '/frontend/pages/index.html';
        return null;
    }

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const createAd = document.getElementById("create-ad-button");

    createAd.addEventListener('click', async (e) => {
        e.preventDefault();

        const titleText = title.value;
        const descriptionText = description.value;
        const categoryText = category.value;
        const imageInput = addPhoto.files[0];

        if(titleText && descriptionText && categoryText && imageInput) {
            const reader = new FileReader();

            reader.onloadend = async () => {

                const imgBase64 = reader.result.split(',')[1];

                const data = {
                    "title": titleText,
                    "description": descriptionText,
                    "category": categoryText,
                    "img" : imgBase64
                }

                await createNewAd("http://localhost:3000/api/client", data)
                .then(() => {alert('Anuntul a fost creat cu succes!'); window.location.reload(); }).catch(() => {alert('Anuntul nu a putut fi creat!')});
            };
            reader.readAsDataURL(imageInput);
        }
    })
});