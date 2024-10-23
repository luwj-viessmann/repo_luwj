let highlightMat = null;
let defaultMat = null;
const setupModelInteractor = (scene, canvas, meshes) => {
  let hoveredMesh = null;
  // Hover Event
  window.addEventListener("pointermove", (event) => {
    Object.keys(meshes).forEach((mesh) => {
      meshes[mesh].material = defaultMat;
    });
    // Ray (Strahl) von der Mausposition erstellen
    const pickResult = scene.pick(scene.pointerX, scene.pointerY);

    // Prüfen, ob der Strahl ein Mesh getroffen hat
    if (pickResult.hit) {
      scene.hoverCursor = "pointer";
      if (pickResult.pickedMesh) {
        highlightSelection(pickResult.pickedMesh.name, meshes);
      } else {
        canvas.style.cursor = "default";
      }
    }
  });

  // Manipulations Event
  addEventListener("pointerdown", (event) => {
    console.log("Klick");
  });

  // Hover Material
  highlightMat = new BABYLON.StandardMaterial("", scene);
  highlightMat.diffuseColor = new BABYLON.Color3(173 / 256, 216 / 256, 1);

  // Default Material
  defaultMat = new BABYLON.StandardMaterial("", scene);
  defaultMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
};

const highlightSelection = (name, meshes) => {
  console.log(name);

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

    default:
      canvas.style.cursor = "default";

      break;
  }
};

