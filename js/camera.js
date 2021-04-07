async function listCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter((device) => device.kind === "videoinput");
  console.log(cameras);

  return cameras;
}

let stream;
async function onSelectCamera(ele) {
  const deviceId = ele.value;

  if (deviceId === "None") {
    document.querySelector("#video-display").srcObject = undefined;
    return;
  }

  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: {
        exact: deviceId,
      },
    },
  });

  document.querySelector("#video-display").srcObject = stream;
}

async function takePhoto() {
  const settings = stream.getVideoTracks()[0].getSettings();
  const capture = document.querySelector("#capture");

  capture.width = settings.width;
  capture.height = settings.height;

  const ctx = capture.getContext("2d");
  const img = new Image();

  ctx.drawImage(
    document.querySelector("#video-display"),
    0,
    0,
    capture.width,
    capture.height
  );

  return capture.toDataURL("image/png");
}

async function saveImage(imageStr, fileName) {
  const ele = document.createElement("a");
  ele.href = imageStr.replace("image/png", "application/octet-stream");
  ele.download = fileName;
  document.body.appendChild(ele);
  ele.click();
  document.body.removeChild(ele);
}

(async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (err) {
    if (err.toString().includes("Permission denied")) {
      alert(
        "Access to the camera has to be granted for this application to function."
      );
    } else {
      console.log(err);
    }
  }
  const cameras = await listCameras();
  document.querySelector("#camera-select").innerHTML =
    "<option>None</option>" +
    cameras.map(
      (camera) => `<option value=${camera.deviceId}>${camera.label}</option>`
    );
})();
