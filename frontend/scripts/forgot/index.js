const email = document.getElementById("email");
const newPass = document.getElementById("password");

async function forgotPass(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const change = document.getElementById("saveButton");

    change.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailText = email.value;
        const newPassText = newPass.value;

        console.log(emailText, newPassText);

        if(emailText && newPassText) {
            const data = {
                "email": emailText,
                "newPass": newPassText
            }

            try {
                await forgotPass("http://localhost:3000/api/forgot", data);
                alert("Password changed successfully!");
                window.location.href = './../pages/login.html';
            } catch (error) {
                alert("Failed to change password");
            }
        }
    })
});