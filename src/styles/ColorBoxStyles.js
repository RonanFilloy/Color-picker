import { styled } from '@mui/system';

const DynamicColoredComponent = styled(({ isLightColor, component: Component, ...rest }) => (
    <Component {...rest} />
))(({ isLightColor }) => ({
    color: isLightColor ? 'black' : 'white'
}));

export default DynamicColoredComponent