import { styled } from '@mui/system';

const Root = styled('div')({
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    border: '1px solid black',
    cursor: 'pointer',
    '&:hover svg': {
        opacity: '1'
    }
});

const Title = styled('h3')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
});

const Emoji = styled('span')({
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
});

const Colors = styled('div')({
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    backgroundColor: 'gray',
    overflow: 'hidden'
})

const MiniColor = styled('div')({
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-4px'
})

export {Root, Title, Emoji, Colors, MiniColor};