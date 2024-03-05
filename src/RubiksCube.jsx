import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import PropTypes from 'prop-types';

const SubCube = (props) => {
  SubCube.propTypes = {
    position: PropTypes.array
  }
  // 0 - right
  // 1 - left
  // 2 - top
  // 3 - bottom
  // 4 - front
  // 5 - back
  const [faceColors, setFaceColors] = useState(["black", "black", "black", "black", "black", "black"]);
  const pos = props.position;
  let updatedFaceColors = [...faceColors];
  if (pos[0] == 1) {
    updatedFaceColors[0] = "red";
  }
  if (pos[0] == -1) {
    updatedFaceColors[1] = "orange";
  }
  if (pos[1] == 1) {
    updatedFaceColors[2] = "blue";
  }
  if (pos[1] == -1) {
    updatedFaceColors[3] = "green";
  }
  if (pos[2] == 1) {
    updatedFaceColors[4] = "white";
  }
  if (pos[2] == -1) {
    updatedFaceColors[5] = "yellow";
  }
  useEffect(() => {
    setFaceColors(updatedFaceColors);
  }, [])
  const mesh = useRef();
  return (
    <mesh {...props} ref={mesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial attach="material-0" color={faceColors[0]} />
        <meshBasicMaterial attach="material-1" color={faceColors[1]} />
        <meshBasicMaterial attach="material-2" color={faceColors[2]} />
        <meshBasicMaterial attach="material-3" color={faceColors[3]} />
        <meshBasicMaterial attach="material-4" color={faceColors[4]} />
        <meshBasicMaterial attach="material-5" color={faceColors[5]} />
    </mesh>
  );
}

const Face = (props) => {
  Face.propTypes = {
    positions: PropTypes.array
  }
  const mesh = useRef();
  const positions = props.positions;
  useFrame(() => {
    if (positions.some(elem => elem[0] == 1)) mesh.current.rotation.x += 0.01;
    // if (count > 157 && count < 314 && positions.some(elem => elem[0] == 1)) mesh.current.rotation.y += -0.01;
   })
  
  return (
    <mesh {...props} ref={mesh}>
      {positions.map((pos, index) => (
        <SubCube key={index} position={pos} />
      ))}
    </mesh>
  )
}

const Cube = (props) => {
  Cube.propTypes = {
    facePositions: PropTypes.array
  }
  const mesh = useRef();
  const facePositions = props.facePositions;
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  })
  return (
    <mesh {...props} ref={mesh} rotation={[Math.PI / 8, 0, 0]}>
      {facePositions.map((pos, index) => (
        <Face key={index} positions={pos} />
      ))}
    </mesh>
  )
}

export default function RubiksCube() {
  const facePositions = [
    // right face
    [[1, 0, 0],
    [1, -1, -1],
    [1, 1, -1],
    [1, -1, 1],
    [1, 1, 1],
    [1, 0, -1],
    [1, 1, 0],
    [1, -1, 0],
    [1, 0, 1]],
    // middle layer
    [[0, 0, 0],
    [0, 0, -1],
    [0, 0, 1],
    [0, -1, 0],
    [0, 1, 0],
    [0, -1, -1],
    [0, 1, -1],
    [0, -1, 1],
    [0, 1, 1]],
    // left face
    [[-1, 0, 0],
    [-1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 0, -1],
    [-1, 1, 0],
    [-1, -1, 0],
    [-1, 0, 1]]
  ]
   return (
      <Canvas>
        <ambientLight />
        <Cube facePositions={facePositions} />
      </Canvas>
   );
}