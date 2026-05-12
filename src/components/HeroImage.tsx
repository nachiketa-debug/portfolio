import { Texture } from 'three';

interface HeroImageProps {
    texture: Texture;
}

export const HeroImage = ({ texture }: HeroImageProps) => {

    return (
        <mesh position={[0, 0.3, 0]}>
            <planeGeometry args={[5, 7.5]} />
            <meshBasicMaterial
                map={texture}
                transparent={true}
                side={2}
            />
        </mesh>
    );
};
