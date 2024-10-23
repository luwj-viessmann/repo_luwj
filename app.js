const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // Kamera und Licht
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 3,
    20,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  // Hausdimensionen
  const baseWidth = 1;
  const baseLength = 1;
  const height = 1;
  const roofHeight = 1.75;

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
    vertexData.applyToMesh(mesh);

    return mesh;
  }

  // Basis des Hauses (vier Rechtecke)
  const baseVertices = [
    // Vorne
    [
      new BABYLON.Vector3(-baseWidth / 2, 0, baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, 0, baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, height, baseLength / 2),
    ],
    // Hinten
    [
      new BABYLON.Vector3(-baseWidth / 2, 0, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, 0, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, height, -baseLength / 2),
    ],
    // Rechts
    [
      new BABYLON.Vector3(baseWidth / 2, 0, baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, 0, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, baseLength / 2),
    ],
    // Links
    [
      new BABYLON.Vector3(-baseWidth / 2, 0, baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, 0, -baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, height, baseLength / 2),
    ],
    // Boden
    [
      new BABYLON.Vector3(-baseWidth / 2, 0, baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, 0, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, 0, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, 0, baseLength / 2),
    ],
  ];

  // Dachgiebel des Hauses (zwei Rechtecke)
  const gableVertices = [
    // Vorne
    [
      new BABYLON.Vector3(-baseWidth / 2, height, baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, baseLength / 2),
    ],
    // Hinten
    [
      new BABYLON.Vector3(-baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, -baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, -baseLength / 2),
    ],
  ];

  // Dachgiebel des Hauses (zwei Rechtecke)
  const roofVertices = [
    // Rechts
    [
      new BABYLON.Vector3(-baseWidth / 2, height, baseLength / 2),
      new BABYLON.Vector3(-baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, -baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, baseLength / 2),
    ],
    // Links
    [
      new BABYLON.Vector3(baseWidth / 2, height, baseLength / 2),
      new BABYLON.Vector3(baseWidth / 2, height, -baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, -baseLength / 2),
      new BABYLON.Vector3(0, roofHeight, baseLength / 2),
    ],
  ];

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
  const mRightRoof = createRectangleMesh("frontWall", roofVertices[0], scene);
  const mLeftRoof = createRectangleMesh("backWall", roofVertices[1], scene);

  // Normalen der Faces anpassen
  mFrontWall.flipFaces(true);
  mRightWall.flipFaces(true);
  mFrontGable.flipFaces(true);
  mLeftRoof.flipFaces(true);
  mFloor.flipFaces(true);

  // Event-Listener für Mausbewegungen
  window.addEventListener("pointermove", (event) => {
    // Ray (Strahl) von der Mausposition erstellen
    const pickResult = scene.pick(scene.pointerX, scene.pointerY);

    // Prüfen, ob der Strahl ein Mesh getroffen hat
    if (pickResult.hit) {
      if (pickResult.pickedMesh) {
        console.log(pickResult.pickedMesh.name);
      }
    }
  });

  return scene;
};

const scene = createScene(); // Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
