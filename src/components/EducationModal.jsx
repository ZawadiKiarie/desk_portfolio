import { useAtom, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { educationAtom, openModalAtom } from "../utilities/utilities";
import gsap from "gsap";
import { config } from "../config";

export const EducationModal = () => {
  const educationModal = useRef();
  const setEducationModal = useSetAtom(educationAtom);
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const isOpen = openModal === "education";

  useEffect(() => {
    setEducationModal(educationModal.current);
    const el = educationModal.current;
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
  }, [setEducationModal, isOpen]);
  return (
    <>
      <div
        ref={educationModal}
        className="modal ed-modal"
        style={{ display: "none" }}
      >
        <div className="modal-header">
          <h2 className="ed-modal-title">EDUCATION</h2>
          <button
            onClick={() => setOpenModal(null)}
            className="modal-exit-button"
          >
            X
          </button>
        </div>
        <div className="ed-modal-content">
          <div className="ed-bar">
            <p className="ed-title">{config.education.title}</p>
            <p className="ed-subtitle">{config.education.subtitle}</p>
            <p className="ed-subtitle">{config.education.description}</p>
          </div>
          <h2 className="modal-title cert-title">
            CERTIFICATIONS & ONLINE COURSES
          </h2>

          {config.certificates.map((cert, idx) => (
            <div className="ed-bar" key={idx}>
              <p className="ed-title">{cert.title}</p>
              <p className="ed-subtitle">{cert.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
