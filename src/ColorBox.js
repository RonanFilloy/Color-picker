import React, {useState} from 'react';
import DetermineLuminance from './DetermineLuminance';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DynamicColoredComponent from './styles/ColorBoxStyles';
import './styles/ColorBox.css';

export default function ColorBox(props) {

    const [state, setState] = useState({
        copied: false
    });

    const backgroundColor = props.background;
    const colorName = props.name;

    const changeCopyState = () => {
        setState({copied: true});
        setTimeout(() => setState({
            copied: false
        }), 1500)
    }

    const isLightColor = DetermineLuminance(backgroundColor);

    return (
        <CopyToClipboard text={backgroundColor} onCopy={changeCopyState}>
            <div style={{background: backgroundColor}} className='ColorBox'>
                <div style={{background: backgroundColor}} className={`copy-overlay ${state.copied && 'show'}`}/>
                <div className={`copy-msg ${state.copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <DynamicColoredComponent
                        component='p'
                        isLightColor={isLightColor}
                    >
                        {backgroundColor}
                    </DynamicColoredComponent>
                </div>
                <div>
                    <div className='box-content'>
                        <DynamicColoredComponent 
                            component='span'
                            isLightColor={isLightColor}
                        >
                            {colorName}
                        </DynamicColoredComponent>
                    </div>
                    <DynamicColoredComponent 
                        component='button'
                        isLightColor={isLightColor}
                        className='copy-button'
                    >
                        Copy
                    </DynamicColoredComponent>
                </div>
                {props.showLink && 
                    <Link to={`/palette/${props.paletteId}/${props.id}`} onClick={e => e.stopPropagation()}>
                        <DynamicColoredComponent
                            component='span'
                            isLightColor={isLightColor}
                            className='see-more'
                        >
                            More
                        </DynamicColoredComponent>
                    </Link>
                }         
            </div>
        </CopyToClipboard>
    )
}