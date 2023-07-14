import chroma from 'chroma-js';

function Luminance(color) {
    return chroma(color).luminance() >= 0.08
}

export default Luminance