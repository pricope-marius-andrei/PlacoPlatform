import { getCookie } from "../utils/cookies.js";

const skillsList = document.getElementById("skills_list");

document.addEventListener("DOMContentLoaded", async () => {

    const searchParams = new URLSearchParams(window.location.search);
    const workerId = searchParams.get("id");
    const token = getCookie("token");

    const getSkills = async () => {
        
        const response = await fetch(`http://localhost:3000/api/worker/skills/${workerId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.json();
    }

    const skills = await getSkills();

    console.log(skills);

    skills.map((skill) => {
        
        const skillContainer = document.createElement('div');
        skillContainer.className = "skill"
        skillContainer.id = skill.id_client;

        const category = document.createElement('h2');
        category.innerText = skill.category;

        const description = document.createElement('p');
        description.innerText = skill.description;

        const img = document.createElement('img');
        img.className = "workImg";
        img.src= `data:image/jpeg;base64,${skill.img}`;

        skillContainer.appendChild(category);
        skillContainer.appendChild(description);
        skillContainer.appendChild(img);

        skillsList.appendChild(skillContainer);
    
    })
})