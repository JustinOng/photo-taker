let port, writer;

async function selectSerialPort(baudRate) {
  if (!("serial" in navigator)) {
    alert("No serial support");
    return;
  }

  port = await navigator.serial.requestPort();
  await port.open({ baudRate });

  // detect marlin
  // const decoder = new TextDecoderStream();
  // inputDone = port.readable.pipeTo(decoder.writable);
  // inputStream = decoder.readable;

  // reader = inputStream.getReader();

  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;

  writer = outputStream.getWriter();
}

async function sendSerial(line) {
  writer.write(line + "\n");
  console.log(line);
}
