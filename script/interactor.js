let highlightMat = null;
let defaultMat = null;

const setupModelInteractor = (scene, canvas, meshes) => {
  let hoveredMesh = null;
  let selectedMesh = null;
  // Hover Event
  window.addEventListener("pointermove", (event) => {
    // Hover highlight
    if (!selectedMesh) {
      Object.keys(meshes).forEach((mesh) => {
        meshes[mesh].material = defaultMat;
      });
      // Ray (Strahl) von der Mausposition erstellen
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);

      // Prüfen, ob der Strahl ein Mesh getroffen hat
      if (pickResult.hit) {
        scene.hoverCursor = "pointer";
        if (pickResult.pickedMesh) {
          hoveredMesh = pickResult.pickedMesh.name;
          highlightSelection(pickResult.pickedMesh.name, meshes);
        } else {
          hoveredMesh = null;
          canvas.style.cursor = "default";
        }
      } else {
        hoveredMesh = null;
      }
    }

    // Resizing Interaction
    const pickRay = scene.createPickingRay(
      scene.pointerX,
      scene.pointerY,
      BABYLON.Matrix.Identity(),
      scene.activeCamera
    );

    var distanceToXZPlane = -pickRay.origin.z / pickRay.direction.z;
    var pickedPoint = pickRay.origin.add(
      pickRay.direction.scale(distanceToXZPlane)
    );
    var distanceToYZPlane = -pickRay.origin.y / pickRay.direction.y;
    var pickedPointYZ = pickRay.origin.add(
      pickRay.direction.scale(distanceToYZPlane)
    );

    switch (selectedMesh) {
      case "backGable":
      case "frontGable":
      case "backWall":
      case "frontWall":
        var currentY = pickedPoint.y;
        dimensions["baseLength"] = Math.abs(currentY) * 2;

        break;

      case "rightWall":
      case "leftWall":
        var currentX = pickedPoint.x;
        dimensions["baseWidth"] = Math.abs(currentX) * 2;
        break;
      case "rightRoof":
      case "leftRoof":
        var currentZ = pickedPointYZ.z;
        dimensions["height"] = Math.abs(currentZ);

        break;
      default:
        break;
    }
    updateInputs();
  });

  // Manipulations Event
  addEventListener("pointerdown", (event) => {
    if (event.button == 0) {
      if (!selectedMesh) {
        selectedMesh = hoveredMesh;
      } else {
        selectedMesh = null;
        return;
      }
    }
  });

  // Hover Material
  highlightMat = new BABYLON.StandardMaterial("", scene);
  highlightMat.diffuseColor = new BABYLON.Color3(173 / 256, 216 / 256, 1);

  // Default Material
  defaultMat = new BABYLON.StandardMaterial("", scene);
  defaultMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
};

const highlightSelection = (name, meshes) => {
  switch (name) {
    case "backWall":
      meshes["backWall"].material = highlightMat;
      meshes["backGable"].material = highlightMat;
      canvas.style.cursor = "pointer";

      break;
    case "backGable":
      meshes["backWall"].material = highlightMat;
      meshes["backGable"].material = highlightMat;
      canvas.style.cursor = "pointer";

      break;
    case "frontWall":
      meshes["frontWall"].material = highlightMat;
      meshes["frontGable"].material = highlightMat;
      canvas.style.cursor = "pointer";

      break;
    case "frontGable":
      meshes["frontWall"].material = highlightMat;
      meshes["frontGable"].material = highlightMat;
      canvas.style.cursor = "pointer";

      break;
    case "rightWall":
      meshes["rightWall"].material = highlightMat;
      canvas.style.cursor = "pointer";

      break;
    case "leftWall":
      meshes["leftWall"].material = highlightMat;
      canvas.style.cursor = "pointer";

      break;
    case "rightRoof":
    case "leftRoof":
      meshes["rightRoof"].material = highlightMat;
      meshes["leftRoof"].material = highlightMat;

      canvas.style.cursor = "pointer";

      break;

    default:
      canvas.style.cursor = "default";

      break;
  }
};
