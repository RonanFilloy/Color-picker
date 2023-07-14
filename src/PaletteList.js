import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Root, Container, Nav } from './styles/PaletteListStyles';
import './styles/PaletteList.css';

function PaletteList(props) {

  const [open, setOpen] = useState(false);
  const [paletteId, setPaletteId] = useState('');
  const navigate = useNavigate();

  function goToPalette(id) {
    navigate(`/palette/${id}`)
  }

  const openDialog = (id) => {
    setOpen(true);
    setPaletteId(id);
  }
  
  const closeDialog = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    props.deletePalette(paletteId);
    closeDialog();
  }

  return (
    <Root>
      <Container>
        <Nav>
          <h1>Color Palettes</h1>
          <Link
            to='/palette/new'
          >
            Create Palette
          </Link>
        </Nav>
          <TransitionGroup className='Palettes'>
            {props.palettes.map(p => (
              <CSSTransition key={p.id} classNames='fade' timeout={500}>
                <MiniPalette 
                  key={p.id} {...p} 
                  id={p.id}
                  handleClick={goToPalette}
                  openDialog={openDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
      </Container>
      <Dialog open={open} onClose={closeDialog} aria-labelledby='delete-dialog-title'>
        <DialogTitle id='delete-dialog-title'>
          Are you sure?
        </DialogTitle>
        <List>
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={handleDelete}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={closeDialog}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </Root>
  )
}

export default PaletteList