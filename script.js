let page=1;
let container=document.getElementById('card-container');
let paginationwrapper=document.getElementById('pagination');

function fetchdata(url, queryParams="")
{
    fetch(url + '&' +queryParams)
    .then((res)=>{
        pagination(res.headers.get("X-Total-Count"),2,queryParams);
        return res.json();
    })
    .then((data)=>{
        createCard(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

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

function pagination(total,limit,queryParams)
{
    let totalpage=Math.ceil(total/limit);
    paginationwrapper.innerHTML="";
    for(let i=1;i<=totalpage;i++)
    {
        let btn=document.createElement('button');
        btn.className="pagination-button";
        btn.textContent=i;
        btn.addEventListener('click', function() {
            page = i;
            fetchdata(`https://wonderwave-api.onrender.com/packages?_page=${page}&_limit=2`,queryParams);
        });
        paginationwrapper.appendChild(btn);
    }
}


fetchdata(`https://wonderwave-api.onrender.com/packages?_page=${page}&_limit=2`);