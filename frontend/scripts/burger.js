let burger = document.getElementById("burger");


burger.addEventListener("click", () => {
    let listBurger = document.getElementById("linksHomePageHamburger");

    if(listBurger.className == "showBurger")
    {
        listBurger.className = "hideBurger";
    }
    else 
    {
        listBurger.className = "showBurger";
    }
});


