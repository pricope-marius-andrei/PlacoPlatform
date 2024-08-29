import {getCookie} from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', async () => {
    const workList = document.getElementById('ads_list');
    const token = getCookie('token');
    await fetch('http://localhost:3000/api/worker/work', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(async (response) => {
        const works = await response.json();
            works.map(async (work) => {
                const adInfo = await fetch(`http://localhost:3000/api/ad/${work.idAd}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });

                const ad = await adInfo.json();

                const adElement = document.createElement('div');
                adElement.className = "ad";
                adElement.id = ad[0].id_add;

                const imgAd = document.createElement('img');
                imgAd.className = "img_ad";
                imgAd.src = ad[0].img; 

                const titleAd = document.createElement('h1');
                titleAd.className = "title_ad";
                titleAd.innerText = ad[0].title; 

                const viewButton = document.createElement('a');
                viewButton.className = "solid-button";
                viewButton.innerText = "View";
                viewButton.href = `./public_adpage.html?id=${adElement.id}`;

                adElement.appendChild(imgAd);
                adElement.appendChild(titleAd);
                adElement.appendChild(viewButton);

                workList.append(adElement);
            })
        }
    )
});