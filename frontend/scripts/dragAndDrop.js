const inputPhoto = document.getElementById("upload-photo");
const imgView = document.getElementById("img-view");
const dropArea = document.getElementById("drop-area");

inputPhoto.addEventListener("change", uploadPhoto);

function uploadPhoto() {
    let imgLink = URL.createObjectURL(inputPhoto.files[0]);
    dropArea.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
}

dropArea.addEventListener("dragover", function (e)  {
    e.preventDefault();
})

dropArea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputPhoto.files = e.dataTransfer.files;
    uploadPhoto();
})