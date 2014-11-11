function initializeWebGL(sCanvasId) {
    var joCanvas = $("#" + sCanvasId);
    joCanvas.attr("width", joCanvas.innerWidth());
    joCanvas.attr("height", joCanvas.innerHeight());

//    var cube = new PhiloGL.O3D.Cube({
//        colors: [1, 1, 1, 1]
//    });

    var plane = new PhiloGL.O3D.Plane({
        type: "x,z",
        xlen: 8.5,
        zlen: 8.5,
        nx: 1,
        nz: 1,
        offset: 0,
        colors: [1, 0, 0, 1]
    });

    PhiloGL(sCanvasId, {
        program: {
            from: 'ids',
            vs: 'shader-vs',
            fs: 'shader-fs'
        },
        onError: function () {
            alert("An error ocurred while loading the application");
        },
        onLoad: function (app) {
            var gl = app.gl,
                canvas = app.canvas,
                program = app.program,
                camera = app.camera,
                view = new PhiloGL.Mat4,
                rPyramid = 0, rCube = 0;

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(1, 1, 1, 1);
            gl.clearDepth(1);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);

            camera.view.id();

            function setupElement(elem) {
                //update element matrix
                elem.update();
                //get new view matrix out of element and camera matrices
                view.mulMat42(camera.view, elem.matrix);
                //set buffers with element data
                program.setBuffers({
                    'aVertexPosition': {
                        value: elem.vertices,
                        size: 3
                    },
                    'aVertexColor': {
                        value: elem.colors,
                        size: 4
                    }
                });
                //set uniforms
                program.setUniform('uMVMatrix', view);
                program.setUniform('uPMatrix', camera.projection);
            }

            function animate() {
                rPyramid += 0.01;
                rCube += 0.01;
            }

            function tick() {
                drawScene();
                PhiloGL.Fx.requestAnimationFrame(tick);
            }

            function drawScene() {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

                //Draw Cube
                plane.position.set(0, 0, -10);
                plane.rotation.set(.25, 0, 0);
                setupElement(plane);
                program.setBuffer('indices', {
                    value: plane.indices,
                    bufferType: gl.ELEMENT_ARRAY_BUFFER,
                    size: 1
                });
                gl.drawElements(gl.TRIANGLES, plane.indices.length, gl.UNSIGNED_SHORT, 0);
            }

            tick();
        }
    });
}

$(document).ready(function () {
    initializeWebGL("viewport");
});