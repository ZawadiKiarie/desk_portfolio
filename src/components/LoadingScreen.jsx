import { useProgress } from "@react-three/drei";
import { config } from "../config";

export const LoadingScreen = () => {
  const { progress, active } = useProgress();
  console.log(progress, active);
  return (
    <div className={`loading-screen ${active ? "" : "loading-screen--hidden"}`}>
      <div className="loading-screen__container">
        <h1 className="loading-screen__title">{config.title}</h1>
        <div className="progress__container">
          <div
            className="progress__bar"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
