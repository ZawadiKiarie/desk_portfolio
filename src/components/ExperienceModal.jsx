import { useAtom, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { experienceAtom, openModalAtom } from "../utilities/utilities";
import gsap from "gsap";
import { config } from "../config";

export const ExperienceModal = () => {
  const experienceModal = useRef();
  const setExperienceModal = useSetAtom(experienceAtom);
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const isOpen = openModal === "experience";

  useEffect(() => {
    setExperienceModal(experienceModal.current);
    const el = experienceModal.current;
    if (isOpen) {
      gsap.set(el, {
        display: "block",
        opacity: 0,
      });
      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [setExperienceModal, isOpen]);
  return (
    <>
      <div ref={experienceModal} className="modal" style={{ display: "none" }}>
        <div className="modal-header">
          <h2 className="modal-title">EXPERIENCE</h2>
          <button
            onClick={() => setOpenModal(null)}
            className="modal-exit-button"
          >
            X
          </button>
        </div>
        <div className="exp-modal-content">
          <div className="exp-timeline">
            {config.experience.map((job, index) => (
              <div className="exp-row" key={job.company + index}>
                {/* LEFT COLUMN */}
                <div className="exp-left">
                  <span className="exp-period">{job.period}</span>
                  <div className="exp-marker-wrapper">
                    <div
                      className="exp-marker"
                      style={{ backgroundColor: "#000" }}
                    >
                      <img src={job.logo} alt={job.company} />
                    </div>
                  </div>
                </div>
                {/* RIGHT COLUMN */}
                <div className="exp-card">
                  <h3 className="exp-company">{job.company}</h3>
                  <p className="exp-role">{job.role}</p>
                  <p className="exp-description">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
