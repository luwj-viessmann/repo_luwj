// Hausdimensionen
let dimensions = {
  baseWidth: 1,
  baseLength: 1,
  height: 1,
  roofHeight: 1.75,
};

// Basis des Hauses (vier Rechtecke)
let baseVertices = [
  // Vorne
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      0,
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      0,
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
  ],
  // Hinten
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      0,
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      0,
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
  ],
  // Rechts
  [
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      0,
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      0,
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
  ],
  // Links
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      0,
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      0,
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
  ],
  // Boden
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      0,
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      0,
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      0,
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      0,
      dimensions["baseLength"] / 2
    ),
  ],
];

// Dachgiebel des Hauses (zwei Rechtecke)
let gableVertices = [
  // Vorne
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      dimensions["baseLength"] / 2
    ),
  ],
  // Hinten
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      -dimensions["baseLength"] / 2
    ),
  ],
];

// Dachgiebel des Hauses (zwei Rechtecke)
let roofVertices = [
  // Rechts
  [
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      -dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      dimensions["baseLength"] / 2
    ),
  ],
  // Links
  [
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      dimensions["baseWidth"] / 2,
      dimensions["height"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      -dimensions["baseLength"] / 2
    ),
    new BABYLON.Vector3(
      0,
      dimensions["roofHeight"],
      dimensions["baseLength"] / 2
    ),
  ],
];

const updateMeshes = (meshes) => {
  // Temporär: auslesen -> später löschen
  dimensions["baseWidth"] = document.getElementById("input_baseWidth").value;
  dimensions["baseLength"] = document.getElementById("input_baseLength").value;
  dimensions["height"] = document.getElementById("input_height").value;
  dimensions["roofHeight"] = document.getElementById("input_roofHeight").value;

  updateVertex();

  // Basiswände
  meshes["frontWall"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(baseVertices[0])
  );

  meshes["backWall"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(baseVertices[1])
  );

  meshes["rightWall"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(baseVertices[2])
  );

  meshes["leftWall"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(baseVertices[3])
  );

  meshes["floor"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(baseVertices[4])
  );

  // Dachgiebel
  meshes["frontGable"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(gableVertices[0])
  );

  meshes["backGable"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(gableVertices[1])
  );

  // Dachflächen
  meshes["rightRoof"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(roofVertices[0])
  );

  meshes["leftRoof"].updateVerticesData(
    BABYLON.VertexBuffer.PositionKind,
    pointsToPoitions(roofVertices[1])
  );
};

const pointsToPoitions = (vertices) => {
  return [
    ...vertices[0].asArray(),
    ...vertices[1].asArray(),
    ...vertices[2].asArray(),
    ...vertices[0].asArray(),
    ...vertices[2].asArray(),
    ...vertices[3].asArray(),
  ];
};

// Update Funktion um die Punkte des Hauses neu zu berechnen
const updateVertex = () => {
  baseVertices = [
    // Vorne
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        0,
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        0,
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
    ],
    // Hinten
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        0,
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        0,
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
    ],
    // Rechts
    [
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        0,
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        0,
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
    ],
    // Links
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        0,
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        0,
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
    ],
    // Boden
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        0,
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        0,
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        0,
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        0,
        dimensions["baseLength"] / 2
      ),
    ],
  ];

  // Dachgiebel des Hauses (zwei Rechtecke)
  gableVertices = [
    // Vorne
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        dimensions["baseLength"] / 2
      ),
    ],
    // Hinten
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        -dimensions["baseLength"] / 2
      ),
    ],
  ];

  // Dachgiebel des Hauses (zwei Rechtecke)
  roofVertices = [
    // Rechts
    [
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        -dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        dimensions["baseLength"] / 2
      ),
    ],
    // Links
    [
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        dimensions["baseWidth"] / 2,
        dimensions["height"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        -dimensions["baseLength"] / 2
      ),
      new BABYLON.Vector3(
        0,
        dimensions["roofHeight"],
        dimensions["baseLength"] / 2
      ),
    ],
  ];
};
