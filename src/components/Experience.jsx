import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// import { useControls } from "leva";
import { useMobile } from "../hooks/useMobile";
import { DeskModel5 } from "./DeskPortfolioV5";

export const Experience = () => {
  // const { position } = useControls({
  //   position: {
  //     x: 1.38,
  //     y: 5.63,
  //     z: 6.38,
  //   },
  // });
  const { device } = useMobile();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        // position={[position.x, position.y, position.z]}
        // rotation={[0.05, 0, 0]}
        // position={[-1.61, 5.41, 3.01]}
        position={
          device === "desktop"
            ? [1.38, 5.63, 6.38]
            : device === "laptop"
            ? [1.01, 4.87, 8.39]
            : [1.1, 4.6, 17.5]
        }
      />
      <DeskModel5 rotation-y={-Math.PI / 2} scale={8} position={[1, 1, 1]} />
    </>
  );
};
