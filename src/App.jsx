import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { ScrollControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Leva />
      <div className="experience">
        <Canvas className="experience-canvas">
          <ScrollControls pages={4}>
            <Experience />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default App;
