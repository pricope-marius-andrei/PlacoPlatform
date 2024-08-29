function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=0; path=/';
}

function logout() {
    const cookiesToDelete = ['token', 'userId', 'typeOfUser', 'logged'];
    cookiesToDelete.forEach(deleteCookie);
    window.location.href = "./../index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});