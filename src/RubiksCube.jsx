/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import PropTypes from 'prop-types';
import { OrbitControls } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import TWEEN from '@tweenjs/tween.js';
import { useControls, button } from 'leva';

// https://github.com/Sean-Bradley/React-Three-Fiber-Boilerplate - used to help figure out rotating different groups of cubes

// eslint-disable-next-line react/prop-types
const Buttons = ({ cubeGroup }) => {
  const rotationGroup = useRef()

  useControls('Cube', {
    'Left CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, 1)
    }),
    'Left CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, -1)
    }),
    'Right CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, -1)
    }),
    'Right CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, 1)
    }),
    'Back CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, 1)
    }),
    'Back CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, -1)
    }),
    'Front CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, -1)
    }),
    'Front CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, 1)
    }),
    'Top CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, -1)
    }),
    'Top CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, 1)
    }),
    'Bottom CW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, 1)
    }),
    'Bottom CCW': button(() => {
      rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, -1)
    })
  })

  return (
    <>
      <group ref={rotationGroup} />
    </>
  )
}

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
        <meshBasicMaterial attach="material-0" color={faceColors[0]} />
        <meshBasicMaterial attach="material-1" color={faceColors[1]} />
        <meshBasicMaterial attach="material-2" color={faceColors[2]} />
        <meshBasicMaterial attach="material-3" color={faceColors[3]} />
        <meshBasicMaterial attach="material-4" color={faceColors[4]} />
        <meshBasicMaterial attach="material-5" color={faceColors[5]} />
    </mesh>
  );
}

const Cube = (props) => {
  Cube.propTypes = {
    subcubePositions: PropTypes.array
  }
  const ref = useRef();
  const subcubePositions = props.subcubePositions;
  useFrame(() => {
    TWEEN.update()
  })
  const roundedBoxGeometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1));
  return (
    // <mesh {...props} ref={mesh} rotation={[Math.PI / 8, 0, 0]}>
    <>
      <group ref={ref}>
        {subcubePositions.map((pos, index) => (
          <SubCube key={index} position={pos} geometry={roundedBoxGeometry}/>
        ))}
      </group>
      <Buttons cubeGroup={ref} />
    </>
    // </mesh>
  )
}

const resetCubeGroup = (cubeGroup, rotationGroup) => {
  rotationGroup.children
    .slice()
    .reverse()
    .forEach(function (c) {
      cubeGroup.attach(c)
    })
  rotationGroup.quaternion.set(0, 0, 0, 1)
}

const attachToRotationGroup = (cubeGroup, rotationGroup, axis, limit) => {
  cubeGroup.children
    .slice()
    .reverse()
    .filter(function (c) {
      return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
    })
    .forEach(function (c) {
      rotationGroup.attach(c)
    })
}

const animateRotationGroup = (rotationGroup, axis, multiplier) => {
  new TWEEN.Tween(rotationGroup.rotation)
    .to(
      {
        [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
      },
      250
    )
    .easing(TWEEN.Easing.Cubic.InOut)
    .start()
}

const rotate = (cubeGroup, rotationGroup, axis, limit, multiplier) => {
  if (!TWEEN.getAll().length) {
    resetCubeGroup(cubeGroup, rotationGroup)
    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
    animateRotationGroup(rotationGroup, axis, multiplier)
  }
}


export default function RubiksCube() {
  const subcubePositions = [
    // right face
    [1, 0, 0],
    [1, -1, -1],
    [1, 1, -1],
    [1, -1, 1],
    [1, 1, 1],
    [1, 0, -1],
    [1, 1, 0],
    [1, -1, 0],
    [1, 0, 1],
    // middle layer
    [0, 0, 0],
    [0, 0, -1],
    [0, 0, 1],
    [0, -1, 0],
    [0, 1, 0],
    [0, -1, -1],
    [0, 1, -1],
    [0, -1, 1],
    [0, 1, 1],
    // left face
    [-1, 0, 0],
    [-1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 0, -1],
    [-1, 1, 0],
    [-1, -1, 0],
    [-1, 0, 1]
  ]
   return (
      <Canvas>
        <ambientLight />
        <Cube subcubePositions={subcubePositions} />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
   );
}