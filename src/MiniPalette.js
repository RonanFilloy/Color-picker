import React, {memo} from 'react';
import "flag-icons/css/flag-icons.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Root, Title, Emoji, Colors, MiniColor } from './styles/MiniPaletteStyles'

function MiniPalette(props) {

    const miniColorBoxes = props.colors.map(c => (
        <MiniColor key={c.name} style={{backgroundColor: c.color}}></MiniColor>
    ));

    const deletePalette = (evt) => {
        evt.stopPropagation();
        props.openDialog(props.id)
    }

    const wasClicked = () => {
        props.handleClick(props.id);
    }

    return (
        <Root onClick={wasClicked}>
            <div>
                <DeleteOutlineIcon 
                    sx={{
                        color: 'white',
                        backgroundColor: '#eb3d30',
                        width: '20px',
                        height: '20px',
                        position: 'absolute',
                        right: '0px',
                        top: '0px',
                        padding: '5px',
                        zIndex: '3',
                        opacity: '0',
                        transition: 'all 0.3s ease-in-out',
                        borderRadius: '3px'
                    }}
                    onClick={deletePalette}
                />
            </div>
            <Colors>
                {miniColorBoxes}
            </Colors>
            <Title>
                {props.paletteName} <Emoji className={`emoji fi fi-${props.emoji}`}>{props.isFlag ? '' : props.emoji} </Emoji>
            </Title>

        </Root>
    )
}

export default memo(MiniPalette, () => true)