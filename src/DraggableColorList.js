import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {ReactSortable} from 'react-sortablejs';

function DraggableColorList(props) {

    return (
        <ReactSortable
            tag='div'
            list={props.colors}
            setList={props.setColors}
            style={{height: '100%'}}
        >
            {props.colors.map(c => (
                <DraggableColorBox
                    color={c.color}
                    name={c.name}
                    handleDelete={props.handleDelete}
                    key={c.name}
                />
            ))}
        </ReactSortable>
    )
}

export default DraggableColorList