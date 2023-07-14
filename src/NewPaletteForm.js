import React, {useState, useEffect} from 'react';
import { DRAWER_WIDTH as drawerWidth } from './constants';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import {ValidatorForm} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { Main, DrawerHeader, DrawerContainer } from './styles/NewPaletteFormStyles';

function NewPaletteForm(props) {

    const theme = useTheme();

    const [state, setState] = useState({
        open: false,
        maxColors: 20
    })

    const [colorArr, setColorArr] = useState(seedColors[0].colors);

    const fullPalette = colorArr.length >= state.maxColors;

    const setupValidations = () => {
        ValidatorForm.addValidationRule('uniquePaletteName', value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    }

    useEffect(() => {
        setupValidations();
    })

    const handleDrawer = () => {
        setState(st => ({
            ...st,
            open: !st.open
        }));
    };

    const addNewColor = (addColor) => {
        setColorArr([...colorArr, addColor]);
    }

    const handleDelete = (colorName) =>{
        setColorArr(colorArr.filter(color => color.name !== colorName))
    }

    const clearColors = () => {
        setColorArr([]);
    }

    const addRandomColor = () => {
        const allColors = props.palettes.map(p => p.colors).flat();
        let rand;
        let randomColor; 
        let isDuplicateColor = true;
        while(isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = colorArr.some(
                color => color.name === randomColor.name
            );
        }
        setColorArr([...colorArr, randomColor]);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <PaletteFormNav 
                open={state.open} 
                colorArr={colorArr}
                handleDrawer={handleDrawer}
                savePalette={props.savePalette}
            />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={state.open}
            >  
                <DrawerHeader>
                    <IconButton onClick={handleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <DrawerContainer
                    sx={{
                        marginLeft: '20px'
                    }}
                >
                    <Typography
                        variant='h4'
                        gutterBottom
                    >
                        Design your Palette
                    </Typography>
                    <div style={{width: '100%'}}>
                        <Button
                            style={{width: '50%'}}
                            variant='contained'
                            color='secondary'
                            onClick={clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            style={{ width: '50%' }}
                            variant='contained'
                            color='primary'
                            onClick={addRandomColor}
                            disabled={fullPalette}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm 
                        fullPalette={fullPalette}
                        addNewColor={addNewColor}
                        colorArr={colorArr}
                    />
                </DrawerContainer>
            </Drawer>
            <Main open={state.open}>
                <DrawerHeader />
                <DraggableColorList 
                    colors={colorArr}
                    handleDelete={handleDelete}
                    setColors={setColorArr}
                />
            </Main>
        </Box>
    );
}

export default NewPaletteForm