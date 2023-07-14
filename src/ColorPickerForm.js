import React, { Component } from 'react';
import DetermineLuminance from './DetermineLuminance';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import './styles/ColorPickerForm.css';


export default class ColorPickerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newColor: '#EF5959',
            newColorName: ''
        }
        this.changeColor = this.changeColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isNameUnique', value => {
            return this.props.colorArr.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return this.props.colorArr.every(
                ({ color }) => color !== this.state.newColor
            );
        });
    }

    changeColor(newColor) {
        this.setState({
            newColor: newColor.hex
        });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit() {
        const addColor = {
            color: this.state.newColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(addColor);
        this.setState({
            newColorName: ''
        })
    }

    render() {

        const {fullPalette} = this.props;
        const {newColor, newColorName} = this.state;

        const isLightColor = DetermineLuminance(this.state.newColor);

        return (

            <div className='Chrome-picker'>
                <ChromePicker
                    color={newColor}
                    onChangeComplete={this.changeColor}
                    className='Color-picker'
                    width='100%'
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator
                        className='Color-name'
                        variant='filled'
                        margin='normal'
                        value={newColorName}
                        name='newColorName'
                        onChange={this.handleChange}
                        validators={['required', 'isNameUnique', 'isColorUnique']}
                        errorMessages={['This field is required', 'Color name already exists', 'Color already exists']}
                    />
                    <Button
                        variant='contained'
                        style={{ backgroundColor: fullPalette ? 'grey' : newColor }}
                        type='submit'
                        disabled={fullPalette}
                        className='add-button'
                        sx={{
                            color: isLightColor ? 'black' : 'white'
                        }}
                    >
                        {fullPalette ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
