/*
  This is an example of 2D rendering, simply
  using bitmap fonts in orthographic space.

  var geom = createText({
    multipage: true,
    ... other options
  })
 */

global.THREE = require("three");
var createOrbitViewer = require("three-orbit-viewer")(THREE);
var createText = require("../");

require("./load")(
  {
    font: "fnt/cdogs.json",
    image: "fnt/cdogs.png",
  },
  start
);

function start(font, texture) {
  function makeText(text) {
    var geom = createText({
      text,
      font: font,
      align: "left",
      width: 100,
      flipY: texture.flipY,
    });

    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: "rgb(255, 255, 255)",
    });

    var layout = geom.layout;
    var text = new THREE.Mesh(geom, material);
    var padding = 40;
    text.position.set(padding, -layout.descender + layout.height + padding, 0);

    var textAnchor = new THREE.Object3D();
    textAnchor.add(text);
    // textAnchor.scale.multiplyScalar(1 / (window.devicePixelRatio || 1));
    textAnchor.scale.setScalar(1);
    return textAnchor;
  }

  var app = createOrbitViewer({
    clearColor: "rgb(110,132,189)",
    clearAlpha: 1.0,
    fov: 65,
    position: new THREE.Vector3(),
  });

  app.camera = new THREE.OrthographicCamera();
  app.camera.left = 0;
  app.camera.top = 0;
  app.camera.near = -100;
  app.camera.far = 100;
  let oldTextObject;
  let oldTextVal;

  const textInput = document.createElement('textarea')
  document.body.prepend(textInput)

  // update orthographic
  app.on("tick", function () {
    // update camera
    var width = app.engine.width;
    var height = app.engine.height;
    app.camera.right = width;
    app.camera.bottom = height;
    app.camera.updateProjectionMatrix();

    const newTextVal = textInput.value
    // const newTextVal = window.location.hash.slice(1)

    if (newTextVal !== oldTextVal) {
      if (oldTextObject) {
        app.scene.remove(oldTextObject);
      }

      oldTextObject = makeText(newTextVal);
      oldTextVal = newTextVal
      app.scene.add(oldTextObject);
    }
  });
}
