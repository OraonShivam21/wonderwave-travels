let page=1;
let container=document.getElementById('card-container');
let paginationWrapper=document.getElementById('pagination');
let searchInput = document.getElementById('search-input');


let itemsPerPage = 2;
let allData = [];

// fetching

function fetchdata(url, queryParams = "") {
    fetch(url + queryParams)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            allData = data;
            pagination(allData.length);
            updatePage(allData);
        })
        .catch((err) => {
            console.log(err);
        });
}

//creation of cards

function createCard(packageData)
{
container.innerHTML="";
packageData.forEach((data)=>{
    let card=getCard(data);
    container.append(card);
})
}

function getCard(data)
{
    let card=document.createElement('div');
    card.className='card';

    let image=document.createElement('div');
    image.className="card-image";
    let img=document.createElement('img');
    img.src=data.image;
    img.alt=data.title;
    image.append(img);
    card.append(image);

    let cardbody=document.createElement('div');
    cardbody.className="card-body";

    let title=document.createElement('div');
    title.className="card-title";
    title.textContent=data.title;

    let description=document.createElement('div');
    description.className="card-description";
    description.textContent=data.description;

    let duration=document.createElement('div');
    duration.className="card-duration";
    duration.textContent=data.duration;

    let destination=document.createElement('div');
    destination.className="card-destination";
    destination.textContent=data.destination;

    let price=document.createElement('div');
    price.className="card-price";
    price.textContent=`${data.price} ${data.currency}`;

    cardbody.append(title);
    cardbody.append(description);
    cardbody.append(destination);
    cardbody.append(duration);
    cardbody.append(price);
    card.append(cardbody);
    return card;
}

//pagination

function pagination(total) {
    let totalPage = Math.ceil(total / itemsPerPage);
    paginationWrapper.innerHTML = "";
    for(let i = 1; i <= totalPage; i++) {
        let btn = document.createElement('button');
        btn.className = 'pagination-button';
        btn.textContent = i;
        btn.addEventListener('click', function () {
            page = i;
            updatePage(allData);
        });
        paginationWrapper.appendChild(btn);
    }
}

function updatePage(allData) {
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let currentPageData = allData.slice(startIndex, endIndex);
    createCard(currentPageData);
}

//searching
function performSearch() {
    let searchTerm = searchInput.value.trim().toLowerCase();
    let filteredData = allData.filter((data) =>
        data.destination.toLowerCase().indexOf(searchTerm) !== -1
    );
   // createCard(filteredData);
    pagination(filteredData.length);
    updatePage(filteredData);
}

let searchButton=document.getElementById('search-button');
searchButton.addEventListener('click',()=>performSearch());


//sorting
function sortAndRender(data) {
    if (currentSort === 'lowToHigh') {
        data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (currentSort === 'highToLow') {
        data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

   // createCard(data);
    pagination(data.length);
    updatePage(data);
}

document.getElementById('sort-low-to-high').addEventListener('click', function () {
    currentSort = 'lowToHigh';
    sortAndRender(allData);
});

document.getElementById('sort-high-to-low').addEventListener('click', function () {
    currentSort = 'highToLow';
    sortAndRender(allData);
});


fetchdata(`https://wonderwave-api.onrender.com/packages`);