import { getCookie } from "../../utils/cookies.js";

const email = document.getElementById("email-input");
const currentPass = document.getElementById("currentPass-input");
const newPass = document.getElementById("newPass-input");

async function changePass(url, data) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const change = document.getElementById("btnSave");

    change.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailText = email.value;
        const currentPassText = currentPass.value;
        const newPassText = newPass.value;

        if(emailText && currentPassText && newPassText) {
            const data = {
                "email": emailText,
                "currentPass": currentPassText,
                "newPass": newPassText
            }

            try {
                await changePass("http://localhost:3000/api/user/password", data);
                alert("Password changed successfully!");
                window.location.reload();
            } catch (error) {
                alert("Failed to change password");
            }
        }
    })
});