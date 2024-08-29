const email = document.getElementById("emailRegister");
const phone = document.getElementById("phoneRegister");
const password1 = document.getElementById("password_first");
const password2 = document.getElementById("password_second");

async function createNewAccount(url, data) {
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })

    const res = response.json();
    return res;
}

function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function handleSuccessfulAuth(res) {
    document.cookie = 'token='+ res.token + "; path=/";
    const tokenData = JSON.parse(atob(res.token.split('.')[1]));
    document.cookie = 'userId='+ tokenData.id + "; path=/";
    document.cookie = 'logged='+ 1 + "; path=/";
    document.cookie = 'typeOfUser='+ tokenData.type + "; path=/";
    window.location.href = "../index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('registerButton');
    const selectType = document.getElementById('userType');

    registerButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailText = email.value;
        const phoneText = phone.value;
        const password1Text = password1.value;
        const password2Text = password2.value;
        const selectedType = selectType.value;

        let typeValue = 1;
        if (selectedType === 'Client') {
            typeValue = 1;
        } else if (selectedType === 'Worker') {
            typeValue = 2;
        }

        if(containsOnlyDigits(phoneText) === false) {
            alert('Numarul de telefon trebuie sa contina doar cifre!');
            return;
        }

        if(password1Text !== password2Text) {
            alert('Parolele nu coincid!');
            return;
        }

        if(emailText && phoneText && password1Text && password2Text && selectedType) {
            const data = {
                "email": emailText,
                "phone": phoneText,
                "password1": password1Text,
                "password2": password2Text,
                "type": typeValue
            }

            try {
                const res = await createNewAccount("http://localhost:3000/api/register", data);
                console.log(res);
                if (res.token) {
                    handleSuccessfulAuth(res);
                } else {
                    alert('Autentificare esuata: ' + res.error);
                }
            }
            catch (err) {
                alert('Autentificare esuata: ' + err);
            }
        }
        else 
        {
            alert('Toate campurile sunt obligatorii!');
        }
    });
});
