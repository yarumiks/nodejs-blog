const toTop = document.querySelector(".to-top");


window.addEventListener('scroll', topF)

 function topF() {
    if (window.scrollY > 300) {
        toTop.style.display = "flex";
    } else {
        toTop.style.display = "none";
    }
 }

 toTop.addEventListener('click', () => {
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })
 })
