const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // Kamera und Licht
  const camera = setupCamera(canvas, scene);

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

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    // Update die Mesh Positionen
    updateMeshes(meshes);

    scene.render();
  });

  return scene;
};

const scene = createScene(); // Call the createScene function

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
