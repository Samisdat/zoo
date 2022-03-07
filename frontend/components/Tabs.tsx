import React from 'react';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import {default as MuiTab} from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Root = styled('div')(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: '#fff',
}));

export const Tab = styled(MuiTab)(({ theme }) => ({
    color:'#000',
    background:'#C8C8C8',
    '&.Mui-selected': {
        background:'#fff',
        border:'0px solid #000',
    },
}));

export default function SimpleTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Root>
            <AppBar
                position="static"
                elevation={0}
                style={{
                    background:'#C8C8C8'
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                >
                    <Tab
                        label="Item One"
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Item Two"
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Item Three"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel
                value={value}
                index={0}
            >
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Root>
    );
}
