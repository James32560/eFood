import React, { useState } from 'react';
import Button from '@mui/material/Button';

const ConnectButton = ({ setReceiveData }) =>
{
	const servicesID = '0000ffe0-0000-1000-8000-00805f9b34fb';
	const characteristicID = '0000ffe1-0000-1000-8000-00805f9b34fb';

	const [isConnected, setIsConnected] = useState(false);
	const [bluetoothDevice, setBluetoothDevice] = useState(null);

	const handleToggleConnection = async() =>
	{
		if(isConnected)
		{
			if(bluetoothDevice && bluetoothDevice.gatt.connected)
			{
				await bluetoothDevice.gatt.disconnect();
				setIsConnected(false);
				setBluetoothDevice(null);
				setReceiveData(null);
			}
		}
		else
		{
			try
			{
				const device = await navigator.bluetooth.requestDevice({filters: [{services: [servicesID]}]});
				const server = await device.gatt.connect();
				const service = await server.getPrimaryService(servicesID);
				const characteristic = await service.getCharacteristic(characteristicID);

				setBluetoothDevice(device);
				setIsConnected(true);

				device.addEventListener('gattserverdisconnected', () =>
				{
					setIsConnected(false);
					setBluetoothDevice(null);
					setReceiveData(null);
				});

				await characteristic.startNotifications();

				characteristic.addEventListener('characteristicvaluechanged', (event) =>
				{
					const value = new TextDecoder().decode(event.target.value);
					try
					{
						const data = JSON.parse(value);
						setReceiveData(data);
					}
					catch(error)
					{
						console.error(error);
					}
				});
			}
			catch(error)
			{
				console.error(error);
			}
		}
	}

	const styles =
	{
		backgroundColor: isConnected ? 'green' : 'red', '&:hover': {backgroundColor: isConnected ? 'darkgreen' : 'darkred'},
		width: 195,
		borderRadius: 2,
	}

	return (
		<Button variant="contained" onClick={handleToggleConnection} sx={styles}>
			{isConnected ? 'Connected' : 'Not Connected'}
		</Button>
	);
};

export default ConnectButton;
