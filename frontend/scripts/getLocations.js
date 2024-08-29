// import data from '../scripts/data/location.json'

const select = document.querySelector('select');



async function getLocations () {
    return fetch('../scripts/data/location.json')
    .then(response => response.json())
    .then(data => {
            // Work with the JSON data here
            data.map((option) => {
                const optionTag = document.createElement('option');
                optionTag.value = option.name;
                optionTag.innerHTML = option.name;
                select.appendChild(optionTag)
        }
        )
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
}

getLocations()

// data.map((option) => {
//     console.log(option);
// })
