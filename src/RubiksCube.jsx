// Jamie Padovano
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import PropTypes from 'prop-types';
import { OrbitControls } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import TWEEN from '@tweenjs/tween.js';
import SubCube from "./SubCube";
import Controls from "./Controls";

const Cube = (props) => {
  const ref = useRef();
  const subcubePositions = props.subcubePositions;
  useFrame(() => {
    TWEEN.update()
  })
  const roundedBoxGeometry = new RoundedBoxGeometry(1, 1, 1, 3, 0.1);
  return (
    <>
      <group ref={ref}>
        {subcubePositions.map((pos, index) => (
          <SubCube key={index} position={pos} geometry={roundedBoxGeometry}/>
          ))}
      </group>
      <Controls cubeGroup={ref} />
    </>
  )
}

Cube.propTypes = {
  subcubePositions: PropTypes.array
}

export default function RubiksCube() {
  let subcubePositions = [];
  for (let i=-1; i <= 1; i++) 
    for (let j=-1; j <=1; j++) 
      for (let k=-1; k <= 1; k++) 
        subcubePositions.push([i, j, k]);
    
  return (
    <Canvas>
      <ambientLight />
      <Cube subcubePositions={subcubePositions} />
      <OrbitControls target={[0, 0, 0]} />
    </Canvas>
  );
}