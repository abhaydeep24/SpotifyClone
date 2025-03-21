console.log("lets wirte java Script")

let currentSong=new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(/songs/)[1]);
        }
    }
    return songs
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60); // Ensure only two-digit seconds
    
    // Ensure two-digit format for seconds
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    
    return `${minutes}:${formattedSeconds}`;
}

const playMusic = (track)=>{
// let audio= new Audio("/songs/"+track)
currentSong.src="/songs/"+track
currentSong.play()
play.src="svg's/pause.svg"
document.querySelector(".songinfo").innerHTML=track
document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}

async function main() {
// to get the list of all the songs
    let songs = await getSongs()
    console.log(songs)

// show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert"  src="svg's/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Abhaydeep Singh</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="svg's/play.svg" alt="">
                            </div> </li>`;
    }

// attach an event listener to every song
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
})

// attack an event listener to play, next and previous
play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src="svg's/pause.svg"
    }
    else {
        currentSong.pause()
        play.src="svg's/play.svg"
    }
})

// listen for time update
currentSong.addEventListener("timeupdate",()=>{
    console.log(currentSong.currentTime,currentSong.duration);
    document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%";
})
// add an event listener to seekbar
document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left=percent + "%";
    currentSong.currentTime=((currentSong.duration)*percent)/100
})

// add event listener for hamberger
document.querySelector(".hamberger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0%"
})

// add event listener for close button
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0%"
})

}
main() 