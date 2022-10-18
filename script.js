// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let itemphotosArray = [];

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


//Create elements for Links & Photos, Add to the DOM
function displayPhotos() {
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
          href: photo.links.html,
          target: '_blank',
        });
        
        // Create <img src="" alt="" /> for photo
        const img = document.createElement('img');
        setAttributes(img, {
          src: photo.urls.regular,
          alt: photo.alt_description,
          title: photo.alt_description,
        });

        // Put img inside a, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}

// Connection to Unsplash API - getting photos from Unsplash API
const count = 10;
const apiKey = '2DbZPvfACWzuZR46FSb1nPoibvTpllrsr6_PHagHh20';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('Error during fetching photos: ', error);
    }
}

//

window.addEventListener('scroll', () => {
    console.log('scrolled');
})

// On load
getPhotos();