let container = document.querySelector(`.album`);
let tracks = document.querySelector(`.playlist`);

let album = getAlbum();


if (!album){
    // Показать ошибку
    renderError();
}
else{
    // Вывод информации об альбоме
    renderAlbumInfo();
    // Вывод трека на страницу
    renderTraks();
    // Звуки
    setupAudio();
}


function getTime(time){
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);

    if (minutes < 10){
        minutes = '0' + minutes;
    }
    if (seconds < 10){
        seconds = '0' + seconds;
        
    }
    return `${minutes}:${seconds}`;
}


function getAlbum(){
    let search = new URLSearchParams(window.location.search);
    let i = search.get(`i`);        
    
    return albums[i];
}


function renderError(){
    container.innerHTML = `Ой, ошибочка вышла!`
    setTimeout(() => {
        window.location.pathname = `index.html?i=0`;
        window.location.search = ``;
    }, 50);
}


function renderAlbumInfo(){
    container.innerHTML += `
    <div class="card mb-3">
        <div class='row'>
            <div class='col-4'>
                <img src="${album.img}" alt="" class="img-fluid rounded-start">
            </div>
            <div class='col-8'>
                <div class="card-body">
                    <h5 class="card-title">
                        ${album.title}
                        <p class="card-text">${album.description}</p>
                        <p class="card-text">
                            <small class="text-muted">${album.year}</small>                                            
                        </p>
                    </h5>
                </div>    
            </div>
        </div>
    </div>`;
}


function renderTraks(){
    let playlist = album.tracks;

    for (let i=0; i<playlist.length; i++){
        let track = playlist[i];
        tracks.innerHTML += `
        <li class="list-group-item d-flex align-items-center track">
            <a class='button'>
                <img src="assets/free-icon-play-button-149668.png" class='img-play' alt="" height="30px">
                <img src="assets/free-icon-pause-button-3249396.png" class='img-pause d-none' alt="" height="30px">
            </a>
            <div>
                <div class='ms-3' style="width: 200px;">${track.title}</div>
                <div class='ms-3'>${track.author}</div>
            </div>
            <div class="progress me-2" role="progressbar" style="width: 100%;" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${track.durationSeconds}">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
            <div class='time ms-auto'>${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>`;
    }

}

function setupAudio() {
    let trackNodes = document.querySelectorAll(`.track`);
    let buttons = document.querySelectorAll(`.button`);
    let tracks = album.tracks;

    let ranges = document.querySelectorAll(`.progress-bar`);

    for (let i=0; i< trackNodes.length; i++){
        let button = buttons[i]; 
        let node = trackNodes[i];
        let range = ranges[i];
        let trackObject = tracks[i];
        
        let track = node.querySelector(`.audio`);
        let timeN = node.querySelector(`.time`);
        let imgPause = node.querySelector(`.img-pause`);
        let imgPlay = node.querySelector(`.img-play`);

        button.addEventListener(`click`, function(){
            function updateProgress() {
                // Нарисовать актуальное время
                if (getTime(track.currentTime) != timeN.innerHTML){
                    timeN.innerHTML = getTime(track.currentTime);
                    range.style.width = `${Math.floor(track.currentTime / trackObject.durationSeconds * 100)}%`;
                }
                // Нужно ли вызвать её ещё раз?
                if (trackObject.isPlaying) {
                    requestAnimationFrame(updateProgress);
                }
                
              }
            if (trackObject.isPlaying){
                trackObject.isPlaying = false;
                track.pause();
                
                imgPause.classList.add(`d-none`);
                imgPlay.classList.remove(`d-none`);
            }

            else{
                trackObject.isPlaying = true;
                track.play();

                imgPause.classList.remove(`d-none`);
                imgPlay.classList.add(`d-none`);

                updateProgress();
            }

        });
    }

}