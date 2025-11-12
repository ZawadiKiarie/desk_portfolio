import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// import { useControls } from "leva";
import { DeskModel1 } from "./DeskPortfolioV1";

export const Experience = () => {
  //   const { position } = useControls({
  //     position: {
  //       x: 1.38,
  //       y: 5.63,
  //       z: 6.38,
  //     },
  //   });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        // position={[position.x, position.y, position.z]}
        // rotation={[0.05, 0, 0]}
        // position={[-1.61, 5.41, 3.01]}
        position={[1.38, 5.63, 6.38]}
      />
      <DeskModel1 rotation-y={-Math.PI / 2} scale={8} position={(1, 1, 1)} />
    </>
  );
};
