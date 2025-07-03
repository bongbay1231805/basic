let minuts = document.getElementById('minuts')
let seconds = document.getElementById('seconds')
const video = document.querySelector('.video')
const controlButton = document.querySelector('.icons')

let totalSeconds = 0


video.addEventListener('ended' ,()=>{
    controlButton.classList.add('stop')
})
video.addEventListener('play' ,()=>{
    controlButton.classList.remove('stop')
    setTime()
})



function playVid(){
    video.play()
}

function pauseVid(){
    video.pause()
    controlButton.classList.add('stop')
}


function setTime(){

   let interval = setInterval(()=>{

  
        totalSeconds++
    
        if(totalSeconds > Math.floor(video.duration)){
            totalSeconds = 1
        }

        if(totalSeconds >= Math.floor(video.duration)){
            clearInterval(interval)
        }
        


        document.querySelector('.fa-pause').addEventListener('click' ,()=>{
            clearInterval(interval)
        })


        minuts.innerHTML = pad(parseInt(totalSeconds /60) )
        seconds.innerHTML = pad(totalSeconds %60)
    },1000)
}

function pad(val){
    let valString = val +""

    if(valString.length <2){
        return "0" + valString
    }else{
        return valString
    }
}