// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const errorElement = document.getElementById('error');
const headingElement = document.getElementById('heading');

let itemphotosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Check if alll images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true; //switch off loader after first loading 
        imagesCount = 5;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`
    }
}


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


//Create elements for Links & Photos, Add to the DOM
function displayPhotos() {
    errorElement.hidden = true;
    headingElement.hidden = false;
    imagesLoaded = 0; //reset loaded images
    totalImages = photosArray.length; //set length of total loaded images

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

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put img inside a, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}

// Connection to Unsplash API - getting photos from Unsplash API
let imagesCount = 1;
const apiKey = '7ovcltzXJT6J2Ibq9kQJT76Fzik4V4zpIPvLy3jbemQ';
// const apiKey = '2DbZPvfACWzuZR46FSb1nPoibvTpllrsr6_PHagHh20';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`;

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        errorElement.hidden = false;
        headingElement.hidden = true;
        loader.hidden = true;
    }
}

//Check to see if scrolling near bootom of page, Load More photos

window.addEventListener('scroll', () => {
    //check if window hight + scroll is greater then body height - 1000
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }

})

// On load
getPhotos();