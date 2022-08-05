const menuBTN = document.querySelector(".burger");
const menuList = document.querySelector(".header__menu");
const imgTick = document.querySelector(".burger__tick");
const imgCross = document.querySelector(".burger__cross");

document.addEventListener("click", function(event) {
    if (event.target === menuBTN) {
        menuList.classList.toggle("menu--active");
        menuList.classList.toggle("menu--hidden");
        menuList.classList.remove("hidden");
        if (menuList.classList.contains("menu--active")) {
            imgTick.classList.add("hidden");
            imgCross.classList.remove("hidden");
        } else {
            imgCross.classList.add("hidden");
            imgTick.classList.remove("hidden");
        }
    } else if (event.target === menuList || menuList.contains(event.target)) {
        return false;
    } else {
        menuList.classList.remove("menu--active");
        menuList.classList.add("menu--hidden");
        imgCross.classList.add("hidden");
        imgTick.classList.remove("hidden");
    }
});
