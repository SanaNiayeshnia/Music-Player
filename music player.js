let songs=[
    {title:"Ashley",
     singer:"Halsey",
     src: "media/01 Ashley.mp3",
     cover:"media/covers/Manic.png", 
     backColor:"#D1C4E9"
     },

     {title:"Golden",
     singer:"Harry Styles",
     src: "media/01 Golden.mp3",
     cover:"media/covers/Fine Line.png",
     backColor:"#90CAF9"
     },

     {title:"Love Again",
     singer:"Dua Lipa",
     src: "media/Dua Lipa - Love again.mp3",
     cover:"media/covers/future nostalgia.png",
     backColor:"#F8BBD0"
     }
    
]

let music=document.getElementById("music");
let cover=document.getElementById("musicCover");
let title=document.getElementById("musicTitle");
let singer=document.getElementById("musicSinger");
let currentTime=document.getElementById("currentTime");
let duration=document.getElementById("duration");
let progressBar=document.getElementById("progressBar");
let playPause=document.getElementById("playPause");
let nextSong=document.getElementById("nextSong");
let previousSong=document.getElementById("previousSong");

let musicIndex=0;
loadSong();

//loading a song
function loadSong(){
    music.setAttribute("src", songs[musicIndex].src);
    cover.setAttribute("src", songs[musicIndex].cover);
    title.innerHTML=songs[musicIndex].title;
    singer.innerHTML=songs[musicIndex].singer;
    document.body.style.backgroundColor=songs[musicIndex].backColor;
}

//setting duration and currentTime
function setTimeFields($){
    //calculating
    let time;
    if($===currentTime){
         time= Math.floor(music.currentTime);
    }
    else{
        time= Math.floor(music.duration);
    }
   let hour=Math.floor(time/3600);
   time= time%3600;
   let min=Math.floor(time/60);
   let sec=time%60;
 
   //setting 
   if(hour!=0){
    if(min>=10){
        if(sec>=10){
            $.innerHTML=hour+":"+min+":"+sec;
        }
        else{
            $.innerHTML=hour+":"+min+":0"+sec;
        }
    }
    else{
        if(sec>=10){
            $.innerHTML=hour+":0"+min+":"+sec;
        }
        else{
            $.innerHTML=hour+":0"+min+":0"+sec;
        }
    }
   }
   else {
    if(min>=10){
        if(sec>=10){
            $.innerHTML=min+":"+sec;
        }
        else{
            $.innerHTML=min+":0"+sec;
        }
    }
    else{
        if(sec>=10){
            $.innerHTML="0"+min+":"+sec;
        }
        else{
            $.innerHTML="0"+min+":0"+sec;
        }
    }
    
   }
}


//play and pause
playPause.addEventListener("click", playPauseHandler);
let isPlaying=false;
function playPauseHandler(){
    if(!isPlaying){
        music.play();
        isPlaying=true;
        playPause.setAttribute("class", "fa-solid fa-pause");
        playPause.setAttribute("title","pause");
        //setting progressBar
        progressBar.setAttribute("max",music.duration);

        //during the playing
        setInterval(function(){
            setTimeFields(currentTime);
            progressBar.setAttribute("value", music.currentTime);
        }, 1000);
        setTimeFields(duration);
    
        //when the music ends
       music.onended= function(){
        isPlaying=false;
        playPause.setAttribute("class", "fa-solid fa-play");
        playPause.setAttribute("title","play");
       }
    }
    else {
        music.pause();
        isPlaying=false;
        playPause.setAttribute("class", "fa-solid fa-play");
        playPause.setAttribute("title","play");
    }
  
}
//playing the next song
nextSong.addEventListener("click", playNextSong);
function playNextSong(){
musicIndex++;
if(musicIndex>songs.length-1)
musicIndex=0;

isPlaying=false;
playPause.setAttribute("class", "fa-solid fa-play");
playPause.setAttribute("title","play");
loadSong();
duration.innerHTML="";
}

//playing the previous song
previousSong.addEventListener("click", playPreviousSong);
function playPreviousSong(){
musicIndex--;
if(musicIndex<0)
musicIndex=songs.length-1;

isPlaying=false;
playPause.setAttribute("class", "fa-solid fa-play");
playPause.setAttribute("title","play");
loadSong();
duration.innerHTML="";

}


//click on progressBar
progressBar.addEventListener("click", changeTheCurrentTime);
function changeTheCurrentTime(event){
    console.log(event);
music.currentTime= (event.offsetX * progressBar.max) / progressBar.offsetWidth;
}
