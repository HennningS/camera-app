const constraints = {
  video: true,
  audio: false
};

async function getCameraStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (err) {
    console.error(err);
  }
}

async function displayCameraStream() {
  const stream = await getCameraStream();
  const video = document.getElementById('video');
  video.srcObject = stream;
  video.play();
}

let facingMode = 'environment';

async function getCameraStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: facingMode
      },
      audio: false
    });
    return stream;
  } catch (err) {
    console.error(err);
  }
}

const switchCameraButton = document.getElementById('switchCamera');
switchCameraButton.addEventListener('click', async () => {
  const video = document.getElementById('video');
  const facingMode = video.facingMode;
  const constraints = {
    audio: false,
    video: {
      facingMode: facingMode === 'user' ? 'environment' : 'user'
    }
  };
  video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
});

const takePictureButton = document.getElementById('takePicture');
takePictureButton.addEventListener('click', () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.style.display = 'none';
  canvas.style.display = 'block';
  takePictureButton.style.display = 'none'; // hide "Take Picture" button
  switchCameraButton.style.display = 'none'; // hide "Switch Camera" button
  const takeAnotherButton = document.createElement('button');
  takeAnotherButton.textContent = 'Take Another';
  takeAnotherButton.addEventListener('click', () => {
    video.style.display = 'block';
    canvas.style.display = 'none';
    takeAnotherButton.style.display = 'none'; // hide "Take Another" button
    usePictureButton.style.display = 'none'; // hide "Use Picture" button
    takePictureButton.style.display = 'block'; // show "Take Picture" button again
    switchCameraButton.style.display = 'block'; // show "Switch Camera" button again
  });
  const usePictureButton = document.createElement('button');
  usePictureButton.textContent = 'Use Picture';
  usePictureButton.addEventListener('click', () => {
    // Do something with the captured image
  });
  document.body.appendChild(takeAnotherButton);
  document.body.appendChild(usePictureButton);
});

displayCameraStream(); // display camera stream on page load
