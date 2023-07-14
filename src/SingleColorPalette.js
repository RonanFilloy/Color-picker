import React, {useState} from 'react';
import NavBar from './NavBar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';

function SingleColorPalette(props) {

    const [state, setState] = useState({
        format: 'hex'
    });

    const handleChange = (val) => {
        setState({ ...state, format: val });
    }

    function gatherShades() {
        let shades = [];
        let allColors = props.palette.colors;
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === props.colorId)
            )
        }
        return shades.slice(1);
    }

    const shades = gatherShades();

    const colorBoxes = shades.map(color => 
        <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[state.format]} 
            showLink={false}
        />)

    return (
        <div className='SingleColorPalette Palette'>
            <NavBar 
                handleFormat={handleChange}
                showSlider={false}
            />
            <div className='Palette-colors'>
                {colorBoxes}
                <div className='go-back ColorBox'> 
                    <Link 
                        className='back-button'
                        to={`/palette/${props.palette.id}`}
                    >
                        GO BACK
                    </Link>
                </div>
            </div>
            <PaletteFooter 
                paletteName={props.palette.name}
                emoji={props.palette.emoji}
                isFlag={props.palette.isFlag}
            />
        </div>
    )
}

export default SingleColorPalette