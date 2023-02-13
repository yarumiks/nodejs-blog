const heart = document.querySelectorAll('#heart')
 
 
heart.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.textContent === "favorite_border"){
            button.textContent = "favorite"
            button.style.color = "red"
          } else {
            button.textContent = "favorite_border"
            button.style.color = "#595959"
           
          }
    }) 
});

    



