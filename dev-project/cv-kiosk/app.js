//
// CV function based on tensorflow.js
//

// Define different variables to contain necessary DOM elements for manipulation later 
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const box = document.getElementById('boxIndex');
const pic = document.getElementById('wash-pic');
const clip = document.getElementById('wash-talk');
const fullScreenBtn = document.getElementById('full-screen');
const cvBtn = document.getElementById('cv-ft');
let model;

// Pause the video in the initial state, only play it when pass the CV function threshold
clip.pause();

// Full screen event assigned to the full-screen-feature button
fullScreenBtn.addEventListener('click', ()=>{
  document.documentElement.requestFullscreen();
});

// If exist the full screen mode, refresh the page to the initial state
// To exist full screen mode, admin just have to hit the "esc" button on your keyboard.
document.addEventListener('fullscreenchange', ()=>{
  if(window.innerHeight == screen.height){
    // If in full screen mode, hide the button so audiences will see the full screen of GW's portrait
    fullScreenBtn.style.display = 'none';
  }else{
    // Refresh the page and show the buttons (CV-feature button & Full-screen button) if admin exists the full-screen mode.
    location.reload();
  }
});

// CV-feature button, 2 states:
// (1) Initial: Show the button and the text in the button, the CV scripts will not be run, only if the admin click the button, the CV functions will then be triggered.
// (2) CV functions enabled: Once when hit the button, the button will be hidden, and will only be shown again if the admin decide to exist the full-screen mode.

cvBtn.addEventListener('click', () => {
  if(cvBtn.innerText === 'Enable CV'){
    // Access and turn on the pc default camera or external camera
    function startVideo(hasCamera, cameraId = null){
      if (hasCamera) {
        navigator.getUserMedia(
          {
            video: {
              deviceId: { exact: cameraId, width: 600, height: 400}
            }
          },
          stream => video.srcObject = stream,
          err => console.error(err)
        )
      }else{
        navigator.getUserMedia(
          {
            video: {width: 600, height: 400}
          },
          stream => video.srcObject = stream,
          err => console.error(err)
        )
      }
    }

    // .enumerateDevices() chained method create a promise obj and return all the available devices.
    navigator.mediaDevices.enumerateDevices().then((arr)=>{
      let devices = [...arr];

      // Filtering all devices based off user preference ( in our case, intel(R) RealSense(TM) Depth Camera 415  RGB)
      // * Note that different webcams may have different label names or metadata, the filtering callback functions can be customized to filter another metadata if needed.
      let rgbCamera = devices.filter(d=>d.label==='Intel(R) RealSense(TM) Depth Camera 415  RGB (8086:0ad3)');


      if (rgbCamera.length>0) {
          // If the D415 Intel RealSense Camera is connected, then access via its device ID
          startVideo(true, rgbCamera[0].deviceId);
      }else{
          // If not connected then use laptop default web cam instead
          startVideo(false);
      }  
    });

    const detectFaces = async () => {
      // Async & Await functions: wait for the CV model to be loaded successfully, then proceed other functions afterwards.
      const prediction = await model.estimateFaces(video, false);

      // Initiate a closerFace variable, the facial data object that are closer to the camera will then be assigned later
      let closerFace = undefined;
      // Draw facial 
      context.drawImage(video, 0, 0, 600, 400);

      if(prediction.length > 0){
        closerFace = await prediction.reduce((prev, current)=>{
          return 
            (prev.bottomRight[0]- prev.topLeft[0])*(prev.bottomRight[1]- prev.topLeft[1]) >
            (current.bottomRight[0]- current.topLeft[0])*(current.bottomRight[1]- current.topLeft[1])?
            prev : current
          
        }); 
      }

      if(closerFace){
        // Draw facial detection bounding boxes per dectected face
        context.beginPath();
        context.lineWidth = '4';
        context.strokeStyle = '#4B9CD3'
        context.rect(
          closerFace.topLeft[0],
          closerFace.topLeft[1],
          closerFace.bottomRight[0] - closerFace.topLeft[0],
          closerFace.bottomRight[1] - closerFace.topLeft[1]
          );
        context.stroke();

        // Drawing red dots to represent for each facial landmark (eyes, nose, ears, mouth)
        
        context.fillStyle = 'red';
        closerFace.landmarks.forEach((landmark) => {
          context.fillRect(landmark[0],landmark[1], 5, 5);
        });

        // Detect if the face is closed enough
        boxSide1 = closerFace.bottomRight[0]- closerFace.topLeft[0];
        boxSide2 = closerFace.bottomRight[1]- closerFace.topLeft[1];
        
      }
      return closerFace
    }

    video.addEventListener('loadeddata', async ()=>{
      model = await blazeface.load();

      // Initiate variables to count if the detected face pass or fail the CV functions, using these counts to determine if GW video will be played or not.
      let videoThreshold = 0;
      let stopPlayingThreshold = 20;

      let dectionLoop = setInterval(()=>{
          detectFaces().then((face)=>{
            if(face){

              let boundingBoxArea = (face.bottomRight[0]-face.topLeft[0])*(face.bottomRight[1]-face.topLeft[1]);
              let noseLocationXFromRight = (face.landmarks[2][0] - face.topLeft[0]) / (face.bottomRight[0]- face.topLeft[0]);

              // If bounding box area > 2500 px, meaning close enough, and if
              // the horizontal location of the nose landmark is roughly at 30% - 70% right of the bounding box's width, see below,
              //
              //  |---|\\\\\\\|---|
              //  |   |\\\\\\\|   |
              //  |   |\\\\\\\|   |  (Facial Detection Bounding Box Area)
              //  |---|\\\\\\\|---|   
              // 0%  30%     70%  100%
              //
              // meaning roughly faces directly in front of the camera. Start counting...
              // If the face continuously pass the threshold for 7 times every 100 milisec, 
              // then play the video

              if(boundingBoxArea > 2500 && 
                noseLocationXFromRight < 0.7 && 
                noseLocationXFromRight > 0.3
                ){
                
                // Initiate a stop playing counts (if the closest audience no longer face directly in front of the cam, or walk away from the frame, start counting...)
                // If the face continuously not passing the threshold for 20 times every 100 milisec, stop playing and bring back the GW portrait
                stopPlayingThreshold = 20;

                context.strokeStyle = 'red';
                  context.stroke();

                  videoThreshold++;

                  if(videoThreshold === 7){
                    // Reset the video playing threshold
                    videoThreshold = 0;

                    // Play the video - George Washington starts talking
                    //
                    // The initial GW video includes a class of "wash-talk-popOut", it will be removed after passing the threshold.
                    // This condition below checks if the video has been surfaced & if the portrait image has been faded away.
                    // If not, run the scripts to show the video & hide the portrait image.
                    if(clip.classList.value.includes('wash-talk-popOut')){
                      // Fade the GW portrait image away
                      pic.classList.remove('wash-pic-popIn')
                      pic.classList.add('wash-pic-popOut');

                      // Surface the GW video and start playing
                      clip.classList.remove('wash-talk-popOut');
                      clip.classList.add('wash-talk-popIn');
                      clip.play();
                    }

                  }
              
              // Detected faces but the closest one is still too far away or it does not face directly in front of the webcam
              // Start counting failing threshold times per milisec (> 20 times, then stop playing GW video)
              }else{
                // Face detected but too far or not directly face in front of the camera
                videoThreshold = 0;

                stopPlayingThreshold--;
                
                if(stopPlayingThreshold === 0){
                  // Reset the video playing stop threshold
                  stopPlayingThreshold = 20;
                  
                  // Surface the GW portrait
                  pic.classList.remove('wash-pic-popOut');
                  pic.classList.add('wash-pic-popIn');
                  
                  // Stop playing the video - George Washington reset to initial state
                  clip.classList.add('wash-talk-popOut');
                  clip.currentTime = 0;
                  clip.pause();

                }
              }
            // Web cam does not detect any face
            // Start counting failing threshold times per milisec (> 20 times, then stop playing GW video)
            }else{
              videoThreshold = 0;
              stopPlayingThreshold--;
              if(stopPlayingThreshold === 0){
                // Reset the video playing stop threshold
                stopPlayingThreshold = 10;
                // Stop playing the video - George Washington reset to initial state

                clip.classList.add('wash-talk-popOut');
                pic.classList.remove('wash-pic-popOut');
                pic.classList.add('wash-pic-popIn');
                clip.currentTime = 0;
                clip.pause();

              }
            }

          });
      }, 100);
    });

    // CV functions enabled, then hide the button. It will only be shown again if admin decide to exist the full-screen mode
    cvBtn.style.display = 'none';
  }

});
