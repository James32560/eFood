import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import Container from './components/Container';
import ConnectButton from './components/ConnectButton';
import JsonDisplay from './components/JsonDisplay';
import './styles/App.css';

const App = () =>
{
    const [receiveData, setReceiveData] = useState(null);
    var data = receiveData;

    const nutrition = ["熱量", "碳水", "蛋白", "脂肪"];
    const colors = ['#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe'];
    var foodName = ["food1", "food2", "food3"];
    var weight = [0, 0, 0];
    var nutritionFactor = [[0, 1, 2, 3], [3, 2, 1, 0], [0, 0, 0, 0]];

    return (
        <Box>
            <Box paddingLeft={1} paddingTop={1} display='flex' flexDirection='row' gap={2} height={50}>
                <ConnectButton setReceiveData={setReceiveData}/>
                <Container><JsonDisplay receivedData={data}/></Container>
            </Box>
            <Box paddingLeft={1} paddingRight={1} paddingTop={2} display='flex' flexDirection='row' gap={2} justifyContent='space-between'>
                <Container>
                    <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='h5' gutterBottom/> {foodName[0]}
                        <BarChart
                            xAxis={[{scaleType: 'band', data: nutrition, colorMap: {type: 'ordinal', colors: colors}}]}
                            yAxis={[{scaleType: 'linear', domain: [0, 100]}]}
                            series={[{data: nutritionFactor[0].map(value => value * weight[0])}]}
                            width={525}
                            height={250}/>
                    </Box>
                </Container>
                <Container>
                    <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='h5' gutterBottom/> {foodName[1]}
                        <BarChart
                            xAxis={[{scaleType: 'band', data: nutrition, colorMap: {type: 'ordinal', colors: colors}}]}
                            yAxis={[{scaleType: 'linear', domain: [0, 100]}]}
                            series={[{data: nutritionFactor[1].map(value => value * weight[1])}]}
                            width={525}
                            height={250}/>
                    </Box>
                </Container>
                <Container>
                    <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='h5' gutterBottom/> {foodName[2]}
                        <BarChart
                            xAxis={[{scaleType: 'band', data: nutrition, colorMap: {type: 'ordinal', colors: colors}}]}
                            yAxis={[{scaleType: 'linear', domain: [0, 100]}]}
                            series={[{data: nutritionFactor[2].map(value => value * weight[2])}]}
                            width={525}
                            height={250}/>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default App;
