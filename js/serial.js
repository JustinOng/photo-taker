let port, reader, writer;

async function selectSerialPort(baudRate) {
  if (!("serial" in navigator)) {
    alert("No serial support");
    return;
  }

  port = await navigator.serial.requestPort();
  await port.open({ baudRate });

  (async function () {
    const decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;

    reader = inputStream.getReader();

    const consoleOutput = document.querySelector("#console-output");
    while (true) {
      const { value, done } = await reader.read();
      if (value) {
        consoleOutput.textContent += value;
      }
      if (done) {
        reader.releaseLock();
        break;
      }
    }
  })();

  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;

  writer = outputStream.getWriter();
}

async function sendSerial(line) {
  writer.write(line + "\n");
  console.log(line);
}
