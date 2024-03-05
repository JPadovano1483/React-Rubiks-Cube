import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function SubCube(props) {
   const mesh = useRef();
   // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
   return (
      <mesh {...props} ref={mesh}>
         <boxGeometry args={[3, 3, 3]} />
         <meshBasicMaterial attach="material-0" color={"black"} />
         <meshBasicMaterial attach="material-1" color={"blue"} />
         <meshBasicMaterial attach="material-2" color={"red"} />
         <meshBasicMaterial attach="material-3" color={"yellow"} />
         <meshBasicMaterial attach="material-4" color={"white"} />
         <meshBasicMaterial attach="material-5" color={"green"} />
      </mesh>
   );
}
export default function App() {
   return (
      <Canvas>
         <ambientLight />
         <SubCube position={[0, 0, 0]} />
      </Canvas>
   );
}