main();

function main() {
    const _canvas = document.querySelector('canvas');
    const _gl = _canvas.getContext('webgl2');
    if (!_gl) {
        console.error('WebGL 2 not supported');
        alert('WebGL 2 not supported');
        return;
    }

    _gl.clearColor(0.0, 0.0, 0.0, 1.0);
    _gl.clear(_gl.COLOR_BUFFER_BIT);
}