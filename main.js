// Select DOM elements
let nameImg = document.getElementById('name');
let imageUrl = document.getElementById('image');
let button = document.getElementById('btnImage'); 
let container = document.getElementById('show'); 

let url = "https://66e7e69db17821a9d9da6ed1.mockapi.io/Image";

button.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (nameImg.value.trim() === '' || imageUrl.value.trim() === '') {
        alert('Please fill all inputs!');
        return;
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: nameImg.value,
            image: imageUrl.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(() => {
        getImages(); 
    })
 
});

function getImages() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = ''; 
            data.forEach(imageData => {
                let card = document.createElement('div');
                card.className = 'col-md-4  divBox'; 

                let header = document.createElement('h1');
                header.textContent = imageData.name;
                card.appendChild(header);

                let image = document.createElement('img');
                image.src = imageData.image;
                image.className = 'img';
                card.appendChild(image);

                let deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.className = 'btn btn-danger';
                deleteButton.addEventListener('click', () => deleteImage(imageData.id, card));
                card.appendChild(deleteButton);

                container.style.display='flex';
                container.style.flexWrap='wrap';
                container.style.gap='4px'
               
                container.appendChild(card);
            });
        })
}

function deleteImage(id, card) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        card.remove(); 
    })
}

getImages();
