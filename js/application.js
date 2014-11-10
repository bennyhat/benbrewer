var glDefaultContext;
var tjsScene;
var tjsCamera;
var tjsRenderer;

function initializeWebGL(joCanvas) {
    tjsScene = new THREE.Scene();
    tjsCamera = new THREE.PerspectiveCamera(200, joCanvas.innerWidth() / joCanvas.innerHeight(), 1, 100);
    tjsRenderer = new THREE.WebGLRenderer();

    var tjgCube = new THREE.BoxGeometry(10, 10, 10);
    var tjmCube = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    var tjmeCube = new THREE.Mesh(tjgCube, tjmCube);

    tjsScene.add(tjmeCube);
    tjsRenderer.setSize(joCanvas.innerWidth(), joCanvas.innerHeight());
    joCanvas[0].appendChild(tjsRenderer.domElement);

    tjsRenderer.render(tjsScene, tjsCamera);
}

$(document).ready(function () {
    var canvas = $("#viewport");
    glDefaultContext = initializeWebGL(canvas);
});