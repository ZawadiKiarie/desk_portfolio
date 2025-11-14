import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  useGLTF,
  useAnimations,
  useTexture,
  useScroll,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMobile } from "../hooks/useMobile";
import gsap from "gsap";
import { ProjectButton } from "./ProjectButton";

export function DeskModel4(props) {
  const group = React.useRef();
  const { nodes, _materials, animations } = useGLTF(
    "/models/DeskPortfolioV6-v1.glb"
  );
  const { actions } = useAnimations(animations, group);

  const { device } = useMobile();
  const aboutFrame = useRef();
  const cvFrame = useRef();
  const educationFrame = useRef();
  const experienceFrame = useRef();
  const letter = useRef();

  useEffect(() => {
    actions["CubeAction"].play();
  }, [actions]);

  const textures = useTexture({
    TexturePackOne: "/textures/TexturePackOne.webp",
    TexturePackTwo: "/textures/TexturePackTwo.webp",
  });

  const projectImages = useTexture({
    Projects: "/textures/Projects.png",
    ProjectsBg: "/textures/ProjectsBg.png",
  });

  Object.values(textures).forEach((texture) => {
    if (!texture) return;
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const bakedMats = useMemo(() => {
    const make = (map) =>
      new THREE.MeshBasicMaterial({
        map,
        toneMapped: false,
      });
    return {
      TexturePackOne: make(textures.TexturePackOne),
      TexturePackTwo: make(textures.TexturePackTwo),
    };
  }, [textures]);

  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;

    g.traverse((child) => {
      if (!(child.isMesh || child.isSkinnedMesh)) return;

      const n = child.name.toLowerCase();

      if (n.includes("one")) child.material = bakedMats.TexturePackOne;
      if (n.includes("two")) child.material = bakedMats.TexturePackTwo;
    });
  }, [bakedMats]);

  const scrollData = useScroll();

  useFrame(() => {
    if (device === "desktop") {
      group.current.position.y =
        scrollData.offset * (scrollData.pages - 1) * 1.55;
    } else if (device === "laptop") {
      group.current.position.y = scrollData.offset * (scrollData.pages - 1) * 1;
    } else {
      group.current.position.y =
        scrollData.offset * (scrollData.pages - 1) * 0.01;
    }
  });

  useLayoutEffect(() => {
    if (!group.current) return;
    group.current.traverse((child) => {
      if (child.name === "ProjectsScreen") {
        child.material = new THREE.MeshBasicMaterial({
          map: projectImages.Projects,
          toneMapped: false,
        });
      }
      if (child.name === "ProjectsScreenShadow") {
        child.material = new THREE.MeshBasicMaterial({
          map: projectImages.ProjectsBg,
          toneMapped: false,
        });
      }
    });
  }, [projectImages]);

  const handleHoverIn = (ref) => {
    gsap.killTweensOf(ref.current.scale);
    gsap.to(ref.current.scale, {
      x: 1.6,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  const handleLetterHoverIn = (ref) => {
    gsap.killTweensOf(ref.current.scale);
    gsap.to(ref.current.scale, {
      y: 1.1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleHoverOut = (ref) => {
    gsap.killTweensOf(ref.current.scale);
    gsap.to(ref.current.scale, {
      x: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  const handleLetterHoverOut = (ref) => {
    gsap.killTweensOf(ref.current.scale);
    gsap.to(ref.current.scale, {
      y: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="one"
          geometry={nodes.one.geometry}
          material={nodes.one.material}
        />
        <mesh
          name="two"
          geometry={nodes.two.geometry}
          material={nodes.two.material}
        />
        <mesh
          ref={cvFrame}
          name="CV_Frame_two"
          geometry={nodes.CV_Frame_two.geometry}
          material={nodes.CV_Frame_two.material}
          onPointerOver={(e) => {
            e.stopPropagation();
            handleHoverIn(cvFrame);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handleHoverOut(cvFrame);
          }}
        />
        <mesh
          ref={aboutFrame}
          name="About_Frame_two"
          geometry={nodes.About_Frame_two.geometry}
          material={nodes.About_Frame_two.material}
          onPointerOver={(e) => {
            e.stopPropagation();
            handleHoverIn(aboutFrame);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handleHoverOut(aboutFrame);
          }}
        />
        <mesh
          ref={experienceFrame}
          name="Experience_Frame_two"
          geometry={nodes.Experience_Frame_two.geometry}
          material={nodes.Experience_Frame_two.material}
          onPointerOver={(e) => {
            e.stopPropagation();
            handleHoverIn(experienceFrame);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handleHoverOut(experienceFrame);
          }}
        />
        <mesh
          ref={educationFrame}
          name="Education_Frame_two"
          geometry={nodes.Education_Frame_two.geometry}
          material={nodes.Education_Frame_two.material}
          onPointerOver={(e) => {
            e.stopPropagation();
            handleHoverIn(experienceFrame);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handleHoverOut(experienceFrame);
          }}
        />
        <mesh
          ref={letter}
          name="Contact_Letter_two"
          geometry={nodes.Contact_Letter_two.geometry}
          material={nodes.Contact_Letter_two.material}
          onPointerOver={(e) => {
            e.stopPropagation();
            handleLetterHoverIn(letter);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handleLetterHoverOut(letter);
          }}
        />
        <mesh
          name="Cat_two"
          geometry={nodes.Cat_two.geometry}
          material={nodes.Cat_two.material}
        />
        <mesh
          name="LeftScreen_two"
          geometry={nodes.LeftScreen_two.geometry}
          material={nodes.LeftScreen_two.material}
          position={[0.164, 0.412, 0.058]}
        />
        <mesh
          name="ProjectsScreen"
          geometry={nodes.ProjectsScreen.geometry}
          material={nodes.ProjectsScreen.material}
          position={[0.167, 0.419, 0.058]}
          rotation={[0, 0.035, 0]}
          scale={[0.474, 0.422, 0.647]}
        />
        <mesh
          name="ProjectsScreenShadow"
          geometry={nodes.ProjectsScreenShadow.geometry}
          material={nodes.ProjectsScreenShadow.material}
          position={[0.165, 0.416, 0.06]}
          rotation={[0, 0.035, 0]}
          scale={[0.474, 0.422, 0.647]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/DeskPortfolioV6-v1.glb");
