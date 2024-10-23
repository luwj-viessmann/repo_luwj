const setupCamera = (canvas, scene) => {
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 3,
    20,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  // Controlls clearen
  camera.inputs.clear();
  camera.checkCollisions = true;
  camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);

  // drehen auf Rechtsklick hinzufügen
  const cameraInput = new BABYLON.ArcRotateCameraPointersInput();
  cameraInput.buttons = [2];
  cameraInput.panningSensibility = 0;
  camera.inputs.add(cameraInput);

  // Zoomen
  const wheelInput = new BABYLON.ArcRotateCameraMouseWheelInput();
  camera.inputs.add(wheelInput);

  camera.lowerRadiusLimit = 10;
  camera.upperRadiusLimit = 100;

  camera.attachControl(canvas, true);

  return camera;
};
