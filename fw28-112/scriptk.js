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
    description.textContent=`${data.description}.`;

    let dura_price=document.createElement('div')
    dura_price.className="duration-price";

    let duration=document.createElement('div');
    duration.className="card-duration";
    duration.textContent=`duration- ${data.duration} days`;

    let destination=document.createElement('div');
    destination.className="card-destination";
    destination.textContent=data.destination;

    let price=document.createElement('div');
    price.className="card-price";
    price.textContent=`${data.price} ${data.currency}`;


    //
    let edit_buttons_container=document.createElement('div');
    edit_buttons_container.className="edit-buttons-container";

    let delete_button=document.createElement('button');
    delete_button.className="delete-button";
    delete_button.textContent="delete";
    delete_button.addEventListener('click',(e)=>{
        e.preventDefault();
         deleteCard(data);
    })
    let edit_button=document.createElement('button');
    edit_button.className="edit-button";
    edit_button.textContent="edit";
    edit_button.addEventListener('click',(e)=>{
        e.preventDefault();
        editCard(data);
    })

    edit_buttons_container.append(delete_button);
    edit_buttons_container.append(edit_button);
    cardbody.append(title);
    cardbody.append(description);
    cardbody.append(destination);
    dura_price.append(duration);
    dura_price.append(price);
    cardbody.append(dura_price);
    cardbody.append(edit_buttons_container);
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


//edit card

let editCard=async (packagedata)=>
{
    let durations=document.getElementById("edit-duration");
    let prices=document.getElementById("edit-price");
    durations.value=packagedata.duration;
    prices.value=packagedata.price;
    let save=document.querySelector(".save-button");
    save.addEventListener('click',async()=>{
        let res=await fetch(`${'https://wonderwave-api.onrender.com/packages'}/${packagedata.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                duration: durations.value,
                price: prices.value
            })
        })
        let data=await res.json();
        alert('data updated successfully');
        fetchdata(`https://wonderwave-api.onrender.com/packages`);
    })
}

// delete card

let deleteCard=async (packagedata)=>{
    let res=await fetch(`${'https://wonderwave-api.onrender.com/packages'}/${packagedata.id}`,{
        method: 'DELETE'
    })
    let data=await res.json();
    alert('package deleted successfully');
    fetchdata(`https://wonderwave-api.onrender.com/packages`);
}



// add card

let addbtn= document.querySelector('.add-button');
addbtn.addEventListener('click',()=>{
    createPackage();
})


let createPackage=async()=>{
let addtitle=document.getElementById('add-title');
let adddesc=document.getElementById('add-description');
let adddest=document.getElementById('add-destination');
let adddur=document.getElementById('add-duration');
let addprice=document.getElementById('add-price');
let addimage=document.getElementById('add-image');
let addcurr=document.getElementById('add-currency');


    let obj={
        title: addtitle.value,
        description: adddesc.value,
        destination: adddest.value,
        duration: adddur.value,
        price: addprice.value,
        image: addimage.value,
        currency: addcurr.value
    }

    let res=await fetch(`https://wonderwave-api.onrender.com/packages`,{
        method: 'POST',
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(obj)
    });
    let data=await res.json();
    alert('package created');
    fetchdata(`https://wonderwave-api.onrender.com/packages`);
}


fetchdata(`https://wonderwave-api.onrender.com/packages`);