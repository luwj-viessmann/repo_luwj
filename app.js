const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.constantlyUpdateMeshUnderPointer = true;

  const axes = new BABYLON.Debug.AxesViewer(scene, 2)


  // Kamera und Licht
  const camera = setupCamera(canvas, scene);
  camera.minZ = -1000;

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  // Funktion zum Erstellen eines Rechtecks aus vier Eckpunkten (Vertices)
  function createRectangleMesh(name, vertices, scene) {
    const positions = [
      ...vertices[0].asArray(),
      ...vertices[1].asArray(),
      ...vertices[2].asArray(),
      ...vertices[0].asArray(),
      ...vertices[2].asArray(),
      ...vertices[3].asArray(),
    ];

    const indices = [0, 1, 2, 3, 4, 5];
    const normals = [];
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);

    const mesh = new BABYLON.Mesh(name, scene);
    const vertexData = new BABYLON.VertexData();
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;
    vertexData.applyToMesh(mesh, true);

    return mesh;
  }

  // Erstelle die Basiswände (Rechtecke)
  const mFrontWall = createRectangleMesh("frontWall", baseVertices[0], scene);
  const mBackWall = createRectangleMesh("backWall", baseVertices[1], scene);
  const mRightWall = createRectangleMesh("rightWall", baseVertices[2], scene);
  const mLeftWall = createRectangleMesh("leftWall", baseVertices[3], scene);
  const mFloor = createRectangleMesh("floor", baseVertices[4], scene);

  // Erstelle die Dachgiebel
  const mFrontGable = createRectangleMesh(
    "frontGable",
    gableVertices[0],
    scene
  );
  const mBackGable = createRectangleMesh("backGable", gableVertices[1], scene);

  // Erstelle die Dachflächen
  const mRightRoof = createRectangleMesh("rightRoof", roofVertices[0], scene);
  const mLeftRoof = createRectangleMesh("leftRoof", roofVertices[1], scene);

  // Normalen der Faces anpassen
  mFrontWall.flipFaces(true);
  mRightWall.flipFaces(true);
  mFrontGable.flipFaces(true);
  mLeftRoof.flipFaces(true);
  mFloor.flipFaces(true);

  const meshes = {
    frontWall: mFrontWall,
    backWall: mBackWall,
    rightWall: mRightWall,
    leftWall: mLeftWall,
    floor: mFloor,
    frontGable: mFrontGable,
    backGable: mBackGable,
    rightRoof: mRightRoof,
    leftRoof: mLeftRoof,
  };

  setupModelInteractor(scene, canvas, meshes);

  document.getElementById("sbm_btn").addEventListener("click", () => {
    readInputs();
    updateInputs();
  });

  // Register a render loop to repeatedly render the scene
  let normalLines = [];
  let boundingBoxLines = [];

  engine.runRenderLoop(function () {
    const normalsSelected = document.getElementById("normals").checked;
    const boundingSelected = document.getElementById("bounding").checked;
    // Update die Mesh Positionen
    updateMeshes(meshes);

    normalLines.forEach((m) => {
      m.dispose();
    });
    normalLines = [];

    if (normalsSelected) {
      for (const [key, value] of Object.entries(meshes)) {
        normalLines.push(showNormals(value, null, null, scene));
      }
    }

    boundingBoxLines.forEach((m) => {
      m.dispose();
    });

    boundingBoxLines = [];
    if (boundingSelected) {
      for (const [key, value] of Object.entries(meshes)) {
        value.refreshBoundingInfo();
        recalculateNormals(value);
        boundingBoxLines.push(showBoundingBox(value, scene));
      }
    }

    scene.render();
  });

  return scene;
};

const scene = createScene(); // Call the createScene function

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});

// === DEBUG VISUALS === //

function showNormals(mesh, size, color, sc) {
  var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
  var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
  color = color || BABYLON.Color3.Red();
  sc = sc || scene;
  size = size || 1;

  var lines = [];
  for (let i = 0; i < normals.length; i += 3) {
    var v1 = BABYLON.Vector3.FromArray(positions, i);
    var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
    lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
  }
  var normalLines = BABYLON.MeshBuilder.CreateLineSystem(
    "normalLines",
    { lines: lines },
    sc
  );
  normalLines.color = color;
  normalLines.isPickable = false;

  return normalLines;
}

function showBoundingBox(mesh, scene) {
  // Hole die Bounding-Info des Meshes
  mesh.refreshBoundingInfo(); // Stelle sicher, dass die Bounding-Info aktuell ist
  var boundingInfo = mesh.getBoundingInfo();

  // Hole die Min- und Max-Eckpunkte der Bounding-Box
  var min = boundingInfo.boundingBox.minimumWorld;
  var max = boundingInfo.boundingBox.maximumWorld;

  // Definiere die 8 Eckpunkte der Bounding-Box
  var vertices = [
    new BABYLON.Vector3(min.x, min.y, min.z),
    new BABYLON.Vector3(max.x, min.y, min.z),
    new BABYLON.Vector3(max.x, max.y, min.z),
    new BABYLON.Vector3(min.x, max.y, min.z),
    new BABYLON.Vector3(min.x, min.y, max.z),
    new BABYLON.Vector3(max.x, min.y, max.z),
    new BABYLON.Vector3(max.x, max.y, max.z),
    new BABYLON.Vector3(min.x, max.y, max.z),
  ];

  // Definiere die 12 Linien, die die Bounding-Box-Ecken verbinden
  var lines = [
    [vertices[0], vertices[1]],
    [vertices[1], vertices[2]],
    [vertices[2], vertices[3]],
    [vertices[3], vertices[0]], // Unterseite
    [vertices[4], vertices[5]],
    [vertices[5], vertices[6]],
    [vertices[6], vertices[7]],
    [vertices[7], vertices[4]], // Oberseite
    [vertices[0], vertices[4]],
    [vertices[1], vertices[5]],
    [vertices[2], vertices[6]],
    [vertices[3], vertices[7]], // Seiten
  ];

  // Erstelle ein Linien-Mesh für die Bounding-Box
  var boundingBoxLines = BABYLON.MeshBuilder.CreateLineSystem(
    "boundingBoxLines",
    { lines: lines },
    scene
  );
  boundingBoxLines.color = BABYLON.Color3.Green(); // Setze die Farbe auf Grün
  boundingBoxLines.isPickable = false;

  return boundingBoxLines;
}
