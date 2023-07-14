import React from 'react';
import DetermineLuminance from './DetermineLuminance';
import DynamicColoredComponent from './styles/ColorBoxStyles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './styles/DraggableColorBox.css';

function DraggableColorBox(props) {

  const isLightColor = DetermineLuminance(props.color);

  return (
    <div className='DraggableCB' style={{backgroundColor: props.color}}>
      <DynamicColoredComponent 
        className='boxContent'
        isLightColor={isLightColor}
        component='div'
      >
        <span>
          {props.name}
        </span>
        <DeleteOutlinedIcon 
          className='deleteIcon'
          onClick={() => props.handleDelete(props.name)}
        />
      </DynamicColoredComponent>
    </div> 
  )
}

export default DraggableColorBox