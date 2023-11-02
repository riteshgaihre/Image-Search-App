const apiKey = "vgXHErb4YGTJbYGqp3VFhhNchx56j_BFj36zmCvQSHI";
const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const imageContainer = document.querySelector(".image-container");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&client_id=${apiKey}&query=${inputData}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if(page ===1){
        imageContainer.innerHTML = "";
    }
    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const a = document.createElement("a");
        a.href = result.links.html;
        a.target = "_blank";
        a.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(a);
        imageContainer.appendChild(imageWrapper);

        
        
    })
    page++;
    if(page>1){
        showMore.style.display = "block";
    }



}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();

})
showMore.addEventListener("click",()=>{
    searchImages();
})