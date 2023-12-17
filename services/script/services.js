
 
    const videoData = [
        {
            title: "Taj Mahal",
            description: "A mausoleum mosque, combines elements of Indian, Persian, and Arab architectural styles, located in Agra, India, on the banks of the Yamuna River.",
            url: "https://www.shutterstock.com/shutterstock/videos/1030571789/preview/stock-footage-taj-mahal-a-mausoleum-mosque-combines-elements-of-indian-persian-and-arab-architectural-styles.webm"
        },
        {
            title: "Buland Darwaza",
            description: "Buland Darwaza, or the 'Door of Victory', was built in 1575 by Mughal emperor Akbar to commemorate his victory over Gujarat. It is the main entrance to the Jama Masjid at Fatehpur Sikri, which is 43 km from Agra, India. Buland Darwaza is the highest gateway in the world and is an example of Indian architecture.",
            url: "https://www.shutterstock.com/shutterstock/videos/1057255396/preview/stock-footage-a-gimbal-stabilized-shot-walking-east-in-the-buland-darwaza-gate-at-fatephur-sikri-near-agra-india.webm"
        },
        {
            title: "Statue of Unity(Sardar Vallabhbhai Patel)",
            description:"                        Sardar Vallabhbhai Patel was an Indian politician who served as the first Home Minister of India and the first Deputy Prime Minister of India. He was a barrister and a very active member of the Indian National Congress. His actual date of birth was never formally recorded.",
            url: "https://www.shutterstock.com/shutterstock/videos/1024024013/preview/stock-footage-statue-of-unity.webm"
        },
        {
            title: "Kedarnath",
            description:"Legend has it that the original Pandavas built the temple of Kedarnath and the present temple was established by Adi Shankaracharya, who restored the glory of the shrine in the 8th century A.D. The temple is said to be more than 1,200 years old and one among the 12 jyotirlingas in India.",
            url: "https://www.shutterstock.com/shutterstock/videos/1087926935/preview/stock-footage-kedarnath-india-many-people-visit-the-famous-kedarnath-temple-with-himalayan.webm"
        },
        {
            title: "Lotus Temple",
            description:"The Lotus Temple was consecrated and opened to the public in December 1986. It was designed by Iranian architect Fariborz Sahba, who won acclaim for the project even before the temple was completed. It subsequently received several awards.",
            url: "https://www.shutterstock.com/shutterstock/videos/1097382021/preview/stock-footage-new-delhi-delhi-india-aerial-drone-shot-of-lotus-temple-a-buddhist-temple-pagoda-in.webm"
        },
        {
            title: "Dakshineswar Kali Temple",
            description:"The temple was built in 1855 by Rani Rashmoni, a Zamindar, philanthropist and a devotee of Kali Maa. The temple is known for its association with Ramakrishna and Ma Sarada Devi, mystics of 19th century Bengal. The Temple complex on the bank of river Hooghly, West Bengal.",
            url: "https://www.shutterstock.com/shutterstock/videos/1099789427/preview/stock-footage-dakshineswar-kali-temple-timelapse-day-to-night-sunset-time-lapse-of-a-hindu-mandir-located-at.webm"
        },
        {
            title: "Gateway of India",
            description:"The monument was erected to commemorate the landing of King George V and Queen Mary at Apollo Bunder on their visit to India in 1911. Built in Indo-Saracenic style, the foundation stone for the Gateway of India was laid on 31 March 1911. The structure is an arch made of basalt, 26 metres (85 feet) high.",
            url: "https://www.shutterstock.com/shutterstock/videos/1098932683/preview/stock-footage-aerial-shot-of-the-gateway-of-india-in-mumbai-during-covid-lockdown-in-india.webm"
        },
        {
            title: "India Gate (Delhi Memorial)",
            description:"History of National War Memorial. The iconic India Gate in Lutyen's Delhi was constructed in 1931 by erstwhile British empire to commemorate the Battle Casualty (Fatal) of India during World War I as well as Third Anglo-Afghan War. It stands tall as a must visit monument for visitors in New Delhi.",
            url: "https://www.shutterstock.com/shutterstock/videos/1101179533/preview/stock-footage-new-delhi-india-dec-awesome-aerial-drone-pov-of-the-delhi-memorial-or-india-gate-that-is-a.webm"
        },
        {
            title: "Red Fort",
            description:"The Red Fort Complex was built as the palace fort of Shahjahanabad – the new capital of the fifth Mughal Emperor of India, Shah Jahan. Named for its massive enclosing walls of red sandstone, it is adjacent to an older fort, the Salimgarh, built by Islam Shah Suri in 1546, with which it forms the Red Fort Complex.",
            url: "https://www.shutterstock.com/shutterstock/videos/1099936813/preview/stock-footage-an-aerial-shot-from-the-top-of-the-red-fort-lal-qila-with-the-indian-flag-in-new-delhi-india.webm"
        },
        {
            title: "Global Vipassana Pagoda temple",
            description:"The Global Vipassana Pagoda is a Meditation dome hall with a capacity to seat around 8,000 Vipassana meditators (the largest such meditation hall in the world) near Gorai, in the north western part of Mumbai, Maharashtra, India. The pagoda was inaugurated by Pratibha Patil, then President of India, on 8 February 2009.",
            url: "https://www.shutterstock.com/shutterstock/videos/1100663711/preview/stock-footage-global-vipassana-pagoda-temple-in-mumbai-india-aerial-drone-view-k.webm"
        },
    ];
  function createVideoElement(video) {
    const videoHtml = `
        <div class="row">
            <div class="col-md-6">
                <video class="embed-responsive embed-responsive-16by9" loop muted>
                    <source src="${video.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text">${video.description}</p>
                        <a href="#" class="btn btn-primary">Explore</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-4">
    </div>
    `;

    return videoHtml;
}


function addHoverListeners() {
    const videoElements = document.querySelectorAll('.embed-responsive');

    videoElements.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}


function renderVideos() {
    const galleryContainer = document.getElementById("videoGallery");

    videoData.forEach(video => {
        const videoElement = createVideoElement(video);
        galleryContainer.innerHTML += videoElement;
    });

   
    addHoverListeners();
}

renderVideos();



