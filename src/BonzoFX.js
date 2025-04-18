// @ts-nocheck

import { initBuffers } from './init-buffers.js';
import { drawScene } from './draw-scene.js';

let cubeRotation = 0.0;
let deltaTime = 0;

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

    // Vertex shader program
    const _vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
}
    `;
    // Fragment shader program
    const _fsSource = `
varying lowp vec4 vColor;
void main() {
    gl_FragColor = vColor;
}
    `;

    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(_gl, _vsSource, _fsSource);

    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVertexColor and also
    // look up uniform locations.
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: _gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            vertexColor: _gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
            projectionMatrix: _gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix: _gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = initBuffers(_gl);

    let then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene(_gl, programInfo, buffers, cubeRotation);
        cubeRotation += deltaTime;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }

    return shaderProgram;
}

// creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
