let nameImg=document.getElementById('name');
let imageUrl=document.getElementById('image');
let button=document.getElementById('btnImage');
let continer=document.getElementById('imgBox');

let url="https://66e7e69db17821a9d9da6ed1.mockapi.io/Image";


button.addEventListener('click',()=>{
    fetch(url,{
        method: 'POST',

        body:JSON.stringify({
           name: nameImg.value,
           image:imageUrl.value
        }),

        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then((response) => response.json())
    .then((data) =>{
       console.log(data);
       let card = document.createElement('div');
        card.className = 'col-lg-3 m-2 divBox '; 
        continer.appendChild(card);

        let header=document.createElement('h1');
        header.textContent=data.name;
        card.appendChild(header);



       let image= document.createElement('img');
       image.src=data.image;
       image.className='img';
       card.appendChild(image);

       let button=document.createElement('button');
       button.textContent="delete"
        card.appendChild(button);



       
})

})