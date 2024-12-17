// export const connectToBluetooth = async (servicesID, characteristicID) => {
//     try {
//       const device = await navigator.bluetooth.requestDevice({
//         filters: [{ services: [servicesID] }],
//       });
  
//       const server = await device.gatt.connect();
//       const service = await server.getPrimaryService(servicesID);
//       const characteristic = await service.getCharacteristic(characteristicID);
  
//       return { server, service, characteristic };
//     } catch (error) {
//       throw new Error('Bluetooth connection failed: ' + error.message);
//     }
//   };
  
//   export const sendBluetoothData = async (characteristic, data) => {
//     try {
//       const encoder = new TextEncoder();
//       await characteristic.writeValue(encoder.encode(JSON.stringify(data)));
//       return true;
//     } catch (error) {
//       throw new Error('Failed to send data: ' + error.message);
//     }
//   };

export const connectBluetooth = async(servicesID, characteristicID) =>
{
	try
	{
		const device = await navigator.bluetooth.requestDevice({filters: [{services: [servicesID]}]});
		const server = await device.gatt.connect();
		const service = await server.getPrimaryService(servicesID);
		const characteristic = await service.getCharacteristic(characteristicID);
		return {server, service, characteristic};
	}
	catch(error)
	{
		throw new Error('Bluetooth connection failed: ' + error.message);
	}
}

export const receiveBluetoothData = async(characteristic) =>
{
	try
	{
		const decoder = new TextDecoder();
		const value = await characteristic.readValue();
		return JSON.parse(decoder.decode(value));
	}
	catch(error)
	{
		throw new Error('Failed to receive data: ' + error.message);
	}
}