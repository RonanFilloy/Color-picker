import React, { useState } from 'react';
import PaletteDialog from './PaletteDialog';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import Button from '@mui/material/Button';
import {AppBar} from './styles/PaletteFormNavStyles';
import './styles/PaletteFormNav.css';


function PaletteFormNav(props) {

    const [formShowing, setFormShowing] = useState(false);

    const showDialog = () => {
        setFormShowing(true);
    }
    
    const hideDialog = () => {
        setFormShowing(false);
    }

    const { open, colorArr, handleDrawer, savePalette } = props

    return (
        <div className='Form-nav'>
            <AppBar
                position="fixed"
                open={open}
                color='default'
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <PaletteIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Palette Creator
                    </Typography>
                </Toolbar>
                <div className='nav-buttons'>
                    <Link to='/'>
                        <Button
                            variant='contained'
                            color='secondary'
                        >
                            Go Back
                        </Button>
                    </Link>
                    <Button 
                        variant="contained" 
                        onClick={showDialog}
                    >
                        Save
                    </Button>
                </div>
            </AppBar>
            {formShowing && (
                <PaletteDialog
                    colorArr={colorArr}
                    savePalette={savePalette}
                    hideDialog={hideDialog}
                />
            )}
        </div>
    )
}

export default PaletteFormNav