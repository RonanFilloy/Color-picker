import React, {useState} from 'react';
import NavBar from './NavBar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import "flag-icons/css/flag-icons.css";
import './styles/Palette.css';

export default function Palette(props) {

    const [state, setState] = useState({
        level: 500,
        format: 'hex'
    });

    const colorBoxes = props.palette.colors[state.level].map(c => (
        <ColorBox 
            background={c[state.format]} 
            name={c.name} 
            key={c.id}
            id={c.id}
            paletteId={props.palette.id}
            showLink={true}
        />
    ));

    const changeLevel = (level) => {
        setState({...state, level: level});
    }

    const handleChange = (val) => {
        setState({...state, format: val});
    }
    
    return (
        <div className='Palette'>
            <NavBar 
                level={state.level} 
                changeLevel={changeLevel}
                handleFormat={handleChange}
                showSlider={true}
            />
            <div className='Palette-colors'>
                {colorBoxes}
            </div>
            <PaletteFooter 
                paletteName={props.palette.name}
                emoji={props.palette.emoji}
                isFlag={props.palette.isFlag}
            />
        </div>
    )
}