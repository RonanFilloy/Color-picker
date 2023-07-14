import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Picker from '@emoji-mart/react';
import './styles/PaletteFormNav.css';

function PaletteDialog(props) {
    const [open, setOpen] = useState('save');
    const [newPaletteName, setNewPaletteName] = useState('');

    const navigate = useNavigate();

    const { colorArr, savePalette, hideDialog } = props;

    const handleSubmit = (emoji) => {
        let newName = newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            isFlag: false,
            colors: colorArr,
            emoji: emoji
        }
        savePalette(newPalette);
        setOpen('');
        navigate('/');
    }

    const handlePaletteName = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    const changeDialog = () => {
        setOpen('emoji');
    }

    const addPalette = (emoji) => {
        handleSubmit(emoji.native);
    }

    return (
        <div>
            <Dialog open={open === 'emoji'} onClose={hideDialog}>
                <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <Picker
                    theme='light'
                    onEmojiSelect={addPalette}
                />
            </Dialog>
            <Dialog open={open === 'save'} onClose={hideDialog}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={changeDialog}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a unique name for your new palette
                        </DialogContentText>
                        <TextValidator
                            label='Palette Name'
                            value={newPaletteName}
                            fullWidth
                            margin='normal'
                            name='newPaletteName'
                            onChange={handlePaletteName}
                            validators={['required', 'uniquePaletteName']}
                            errorMessages={['Palettes must have a name', 'Palette name already used']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={hideDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
            </ValidatorForm>
            </Dialog>
        </div>
    );
}

export default PaletteDialog