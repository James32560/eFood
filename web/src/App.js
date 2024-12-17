import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Container from './components/Container';
import ConnectButton from './components/ConnectButton';
import JsonDisplay from './components/JsonDisplay';
import './styles/App.css';

const App = () =>
{
    const [receiveData, setReceiveData] = useState(null);
    const data = receiveData, studentNumber = 110502532;

    return (
        <Box>
            <Box paddingLeft={1} paddingTop={1} display='flex' flexDirection='row' gap={2} height={50}>
                <ConnectButton setReceiveData={setReceiveData}/>
                <Container><JsonDisplay receivedData={studentNumber}/></Container>
                <Container><JsonDisplay receivedData={data}/></Container>
            </Box>
            <Box paddingLeft={1} paddingRight={1} paddingTop={2} display='flex' flexDirection='row' gap={2} justifyContent='space-between'>
                <Container>
                    <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='h5' gutterBottom/> Test
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                            width={525}
                            height={250}/>
                    </Box>
                </Container>
                <Container>
                    <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='h5' gutterBottom/> Test
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                            width={525}
                            height={250}/>
                    </Box>
                </Container>
                <Container>
                    <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='h5' gutterBottom/> Test
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                            width={525}
                            height={250}/>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default App;
