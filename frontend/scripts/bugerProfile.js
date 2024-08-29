burger = document.getElementById("burger");

burger.addEventListener("click", () => {
    let listBurger = document.getElementById("tablinksHamburger");
    if(listBurger.style.display == "flex")
    {
        listBurger.style.display = "none";
    }
    else 
    {
        listBurger.style.display = "flex";
        listBurger.style.position = "absolute";
    }
});