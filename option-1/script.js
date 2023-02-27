const video = document.getElementById("video");
const switchCameraButton = document.getElementById("switchCameraButton");
const takePictureButton = document.getElementById("takePictureButton");
const picture = document.getElementById("picture");

let currentCamera = "environment"; // "environment" = back camera, "user" = front camera

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: currentCamera
    }
  });
  video.srcObject = stream;
  await video.play();
}

switchCameraButton.addEventListener("click", async () => {
  currentCamera = currentCamera === "environment" ? "user" : "environment";
  await setupCamera();
});

takePictureButton.addEventListener("click", async () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const url = canvas.toDataURL("image/png");
  const img = new Image();
  img.src = url;
  picture.innerHTML = "";
  picture.appendChild(img);
  picture.style.display = "block";
  takePictureButton.style.display = "none";
  switchCameraButton.style.display = "none";
  const takeNewPictureButton = document.createElement("button");
  takeNewPictureButton.textContent = "Take New Picture";
  takeNewPictureButton.addEventListener("click", () => {
    picture.style.display = "none";
    takePictureButton.style.display = "block";
    switchCameraButton.style.display = "block";
    video.style.display = "block"; // Show the camera preview again
    setupCamera();
  });
  const newDiv = document.createElement("div");
  newDiv.appendChild(takeNewPictureButton);
  picture.appendChild(newDiv);
  video.style.display = "none";
});

async function init() {
  await setupCamera();
}

init();
