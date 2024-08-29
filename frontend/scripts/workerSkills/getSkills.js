import { getCookie } from "../utils/cookies.js";

document.addEventListener('DOMContentLoaded', async () => {
    const skillsList = document.getElementById("skills_list");

    async function fetchSkills() {
        const token = getCookie('token');
        const response = await fetch("http://localhost:3000/api/worker/skills", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response);

        const skills = await response.json();
        return skills;
    }

    function populateSkills(skills) {
        skills.forEach((skill, index) => {
            const skillElement = document.createElement('div');
            skillElement.className = "skill";
            skillElement.id = skill.id_skill;

            const categorySkill = document.createElement('h2');
            categorySkill.className = "category-skill";
            categorySkill.innerText = skill.category;

            const descriptionSkill = document.createElement('p');
            descriptionSkill.className = "description-skill";
            descriptionSkill.innerText = skill.description;

            const imgSkill = document.createElement('img');
            imgSkill.className = "img-skill";
            imgSkill.src = `data:image/jpeg;base64,${skill.img}`;
            imgSkill.style.width = "100%";

            skillElement.appendChild(categorySkill);
            skillElement.appendChild(descriptionSkill);
            skillElement.appendChild(imgSkill);

            skillsList.appendChild(skillElement);
        });
    }

    const skills = await fetchSkills();
    console.log(skills);
    populateSkills(skills);
});