async function getAllJobs(url) {
    
    const response = await fetch(url, {
        method: "GET",
    })

    return response.json();
}

function searchByTitle(searchTerm, data) {
    // Filter data based on the search term
    const filteredData = data.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return filteredData;
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await getAllJobs("http://localhost:3000/api/client/ads");
    let jobs = data;

    const searchInput = document.getElementsByClassName('search-input');
    const listAnnouncements = document.getElementsByClassName("list-announcements");

    searchInput[0].addEventListener('input', (e) => {
        jobs = searchByTitle(e.target.value,data);
        listAnnouncements[0].innerHTML = '';
        jobs.forEach(job => {
            const announcement = document.createElement('div');
                announcement.className = "announcement";
                announcement.id = job.id_add;
                
                const view = document.createElement('div');
                view.className = "view";
                announcement.appendChild(view);
                
                const img = document.createElement('img');
                img.src= job.img;
                img.alt="img";
    
                const infoContainer = document.createElement('div');
                infoContainer.className = "info-container";
    
                const title = document.createElement('h1');
                title.textContent = job.title;
                title.className = "title"
                
                const description = document.createElement('p');
                description.textContent = job.description;
    
                view.appendChild(img);
                infoContainer.appendChild(title);
                infoContainer.appendChild(description);
    
                view.appendChild(infoContainer);
    
                const info = document.createElement('div');
                info.className = "info";
    
                // const salary = document.createElement('span');
                // salary.textContent = job.salary + " lei";
    
                const applyButton = document.createElement('a');
                applyButton.className = "solid-button";
                applyButton.href = `public_adpage.html?id=${job.id_add}`;
                applyButton.textContent= "View more";
    
                // info.appendChild(salary);
                info.appendChild(applyButton);
                // info.appendChild(detailsButton);
    
                announcement.appendChild(info);
    
                listAnnouncements[0].appendChild(announcement)
            });
    
    });

    // Create and append filtered announcements
    data.forEach(job => {
        const announcement = document.createElement('div');
            announcement.className = "announcement";
            announcement.id = job.id_add;
            
            const view = document.createElement('div');
            view.className = "view";
            announcement.appendChild(view);
            
            const img = document.createElement('img');
            img.src= job.img;
            img.alt="img";

            const infoContainer = document.createElement('div');
            infoContainer.className = "info-container";

            const title = document.createElement('h1');
            title.textContent = job.title;
            title.className = "title"
            
            const description = document.createElement('p');
            description.textContent = job.description;

            view.appendChild(img);
            infoContainer.appendChild(title);
            infoContainer.appendChild(description);

            view.appendChild(infoContainer);

            const info = document.createElement('div');
            info.className = "info";

            // const salary = document.createElement('span');
            // salary.textContent = job.salary + " lei";

            const applyButton = document.createElement('a');
            applyButton.className = "solid-button";
            applyButton.href = `public_adpage.html?id=${job.id_add}`;
            applyButton.textContent= "View more";

            // info.appendChild(salary);
            info.appendChild(applyButton);
            // info.appendChild(detailsButton);

            announcement.appendChild(info);

            listAnnouncements[0].appendChild(announcement)
        });
    });
