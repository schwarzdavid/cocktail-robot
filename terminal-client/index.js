const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

const port = new SerialPort('/dev/ttyAMA0', {
	baudRate: 9600
});
const parser = new Readline();
port.pipe(parser);

SerialPort.list().then(console.log);

port.on("open", () => {
	console.log("Serial port open");

	/*(function sendMessage() {
		console.log("Trying to send message");
		port.write("Hallo", "hex", err => {
			if(err){
				console.error(err);
			} else {
				console.log("Message sent");
				setTimeout(sendMessage, 5000);
			}
		});
	})();*/

	port.write("Hallo oida\n");
});
parser.on("data", msg => console.log("Got message from arduino: " + msg.toString(), msg.length));
port.on("error", console.error);
port.on("close", console.log);
