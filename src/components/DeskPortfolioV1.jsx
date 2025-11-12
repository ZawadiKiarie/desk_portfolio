import React, { useLayoutEffect, useMemo } from "react";
import {
  useGLTF,
  useAnimations,
  useTexture,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function DeskModel1(props) {
  const group = React.useRef();
  const { nodes, _materials, animations } = useGLTF(
    "/models/DeskPortfolioV2-v1.glb"
  );
  const { _actions } = useAnimations(animations, group);
  const textures = useTexture({
    TexturePackOne: "/textures/TexturePackOne.webp",
    TexturePackTwo: "/textures/TexturePackTwo.webp",
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
    group.current.position.y =
      scrollData.offset * (scrollData.pages - 1) * 1.55;
  });
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
          name="CV_Frame_two"
          geometry={nodes.CV_Frame_two.geometry}
          material={nodes.CV_Frame_two.material}
        />
        <mesh
          name="About_Frame_two"
          geometry={nodes.About_Frame_two.geometry}
          material={nodes.About_Frame_two.material}
        />
        <mesh
          name="Experience_Frame_two"
          geometry={nodes.Experience_Frame_two.geometry}
          material={nodes.Experience_Frame_two.material}
        />
        <mesh
          name="Education_Frame_two"
          geometry={nodes.Education_Frame_two.geometry}
          material={nodes.Education_Frame_two.material}
        />
        <mesh
          name="Contact_Letter_two"
          geometry={nodes.Contact_Letter_two.geometry}
          material={nodes.Contact_Letter_two.material}
        />
        <mesh
          name="Cat_two"
          geometry={nodes.Cat_two.geometry}
          material={nodes.Cat_two.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/DeskPortfolioV2-v1.glb");
useTexture.preload(["TexturePackOne.webp", "TexturePackTwo.webp"], {
  path: "/textures/",
});
