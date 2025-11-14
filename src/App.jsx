import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { ScrollControls } from "@react-three/drei";
import { ProjectModal } from "./components/ProjectModal";
import { AboutModal } from "./components/AboutModal";
import { ContactModal } from "./components/ContactModal";
import { EducationModal } from "./components/EducationModal";
import { ExperienceModal } from "./components/ExperienceModal";
import { LoadingScreen } from "./components/LoadingScreen";
import { useSetAtom } from "jotai";
import { openModalAtom } from "./utilities/utilities";
import { MusicToggle } from "./components/MusicToggle";

function App() {
  const setOpenModal = useSetAtom(openModalAtom);
  return (
    <>
      <LoadingScreen />
      <div className="experience">
        <Canvas
          onPointerMissed={() => {
            setOpenModal(null);
          }}
          className="experience-canvas"
        >
          <ScrollControls pages={4}>
            <Experience />
          </ScrollControls>
        </Canvas>
      </div>
      <MusicToggle />
      <ProjectModal />
      <AboutModal />
      <ContactModal />
      <EducationModal />
      <ExperienceModal />
    </>
  );
}

export default App;
