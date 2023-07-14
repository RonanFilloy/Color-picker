import React, { useState } from 'react';
import Slider from 'rc-slider';
import {Link} from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import 'rc-slider/assets/index.css';
import './styles/NavBar.css';

function NavBar(props) {

    const [state, setState] = useState({
        format: 'hex',
        open: false
    });

    const handleChange = (evt) => {
        setState({...state, format: evt.target.value, open: true});
        props.handleFormat(evt.target.value);
    }

    const handleCloseSnackbar = () => {
        setState({...state, open: false})
    }

    return (
        <nav className='Navbar'>
            <div className='logo'>
                <Link className='Home-link' to='/'>Color Picker</Link>
            </div>

            {props.showSlider && 
                <div className='slider-container'>
                    <span>Level: {props.level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={props.level}
                            min={100}
                            max={900}
                            step={100}
                            onChange={props.changeLevel}
                            trackStyle={{ backgroundColor: 'transparent' }}
                            railStyle={{ height: 8 }}
                            handleStyle={
                                {
                                    backgroundColor: 'green',
                                    outline: 'none',
                                    border: '2px solid green',
                                    boxShadow: 'none',
                                    width: '13px',
                                    height: '13px',              
                                    marginTop: '-3px'
                                }
                            }
                        />
                    </div>
                </div>
            }

            <div className='select-container'>
                <Select value={state.format} onChange={handleChange}>
                    <MenuItem value='hex'>HEX - #fff</MenuItem>
                    <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                    <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
                open={state.open}
                autoHideDuration={3000}
                message={<span id='message-id'>Format changed to {state.format.toUpperCase()}!</span>}
                ContentProps={{'aria-describedby': 'message-id'}}
                onClose={handleCloseSnackbar}
                action={[
                    <IconButton 
                        onClick={handleCloseSnackbar} 
                        color='inherit' 
                        key='close' 
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </nav>
    )
}

export default NavBar