import { getCookie } from "../utils/cookies.js";

document.addEventListener('DOMContentLoaded', async () => {

    const users = await fetch('http://localhost:3000/api/admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('token'),
        }
    })

    const usersList = await users.json();
    const usersManager = document.getElementById('users');
    usersManager.style = "height:100vh; weight: 100%; overflow: scroll; display: flex; flex-direction: column; backgroundColor: var(--white); drop-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); padding: 10px; margin: 10px; border-radius: 10px;";

    usersList.forEach(user => {

        const userContainer = document.createElement('div');
        userContainer.className = "user_container";
        userContainer.style = "text-align:center; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 10px; margin: 10px; border-radius: 10px; backgroundColor: var(--white); drop-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"
        

        const userText = document.createElement('span');
        userText.className = "user_text";
        userText.innerText = user.email;

        const userType = document.createElement('span');
        userType.className = "user_type";
        userType.style = "color: black; padding: 5px; margin: 5px; border-radius: 5px;"

        if(user.type == 0) {
            userType.innerText = "Admin";
        } else if(user.type == 1) {
            userType.innerText = "Client";
        }
        else if(user.type == 2) {
            userType.innerText = "Worker";
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = "delete_button";
        deleteButton.innerText = "Delete";
        deleteButton.style = "width:fit-content; background-color: var(--error-color); color: var(--white); border: none; padding: 5px; margin: 5px; border-radius: 5px; cursor: pointer;"
        deleteButton.onclick = async () => {
        
            try {
            await fetch(`http://localhost:3000/api/admin`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: user.id})
            });
            alert("User deleted successfully!");
            window.location.reload();
            }
            catch (error) {
                alert("Failed to delete user");
            
            }
        }


        userContainer.appendChild(userText);
        userContainer.appendChild(userType);
        userContainer.appendChild(deleteButton);

        usersManager.appendChild(userContainer);
    });

});