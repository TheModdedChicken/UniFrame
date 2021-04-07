const { desktopCapturer } = require('electron');

function getAvailableSources () {
    desktopCapturer.getSources({types: ['window', 'screen']}).then(async sources => {
        for (var i = 0; i < sources.length; i++) {
            
        }
    })
}

function captureAudioOfSource () {
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
        if (error) throw error
        for (let i = 0; i < sources.length; ++i) {
           if (sources[i].name === 'Your Window Name here!') {
              navigator.webkitGetUserMedia({
                 audio: {
                    mandatory: {
                      chromeMediaSource: 'desktop'
                    }
                },
                video: false
              }, handleStream, handleError)
              return
           }
        }
    })
}
  
function handleStream (stream) {
    const video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
}
  
function handleError (e) {
    console.log(e)
}