function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const INCREMENT = 1;
const X_LIMIT = 50;
const Y_LIMIT = 50;

async function main() {
  sendSerial("G60");
  sendSerial("G91");

  let x_inc = INCREMENT;
  for (let y = 0; y < Y_LIMIT; y++) {
    for (let x = 0; x < X_LIMIT; x++) {
      sendSerial(`G0 X${x_inc}`);
      await delay(500);
      takePhoto().then((imageStr) => saveImage(imageStr, "image_A.png"));
    }
    sendSerial(`G0 Y${INCREMENT}`);
    x_inc = -x_inc;
    await delay(500);
  }
}
