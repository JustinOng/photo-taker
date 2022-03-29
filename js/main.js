function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const INCREMENT = 1;
const X_LIMIT = 50;
const Y_LIMIT = 50;

async function main() {
  sendSerial("G60");
  sendSerial("G91");

  const increment = document.querySelector("#movement-increment").value;
  let x_inc = increment;
  const x_limit = document.querySelector("#x-travel").value;
  const y_limit = document.querySelector("#y-travel").value;
  const feedrate = document.querySelector("#feedrate").value;
  const delay_ms = document.querySelector("#delay-ms").value;
  const image_name = document.querySelector("#image-prefix").value;

  for (let y = 0; y < Math.floor(y_limit / increment); y++) {
    for (let x = 0; x < Math.floor(x_limit / increment); x++) {
      sendSerial(`G0 X${x_inc} F${feedrate}`);
      await delay(delay_ms);
      takePhoto().then((imageStr) => saveImage(imageStr, image_name));
    }
    sendSerial(`G0 Y${increment} F${feedrate}`);
    x_inc = -x_inc;
    await delay(delay_ms);
    takePhoto().then((imageStr) => saveImage(imageStr, image_name));
  }

  sendSerial("G61");
}
