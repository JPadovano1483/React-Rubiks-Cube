// Jamie Padovano
/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

export default function SubCube(props) {
  // 0 - right
  // 1 - left
  // 2 - top
  // 3 - bottom
  // 4 - front
  // 5 - back
  const pos = props.position;
  const [faceColors, setFaceColors] = useState([...Array(6).fill("black")]);
  let updatedFaceColors = [...faceColors];
  if (pos[0] == 1) updatedFaceColors[0] = "red";
  if (pos[0] == -1) updatedFaceColors[1] = "orange";
  if (pos[1] == 1) updatedFaceColors[2] = "blue";
  if (pos[1] == -1) updatedFaceColors[3] = "green";
  if (pos[2] == 1) updatedFaceColors[4] = "white";
  if (pos[2] == -1) updatedFaceColors[5] = "yellow";
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
  
SubCube.propTypes = {
  position: PropTypes.array
}