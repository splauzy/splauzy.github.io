let albumsNode = document.querySelector(`.albums`);

for (let i=0; i<albums.length; i++){
    let album = albums[i];
    albumsNode.innerHTML += `<div class='col-6 col-md'>
    <a href="album.html?i=${i}" class="text-decoration-none">
        <div class="card mb-3">
            <img src="${album.img}" alt="" class="card-img-top">
            <div class="card-body">
                <p class="card-text text-dark">${album.title}</p>                 
            </div>
        </div>
    </a>
    </div>`;
}