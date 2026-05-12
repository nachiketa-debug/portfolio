import { Html } from "@react-three/drei";

interface GlassCardProps {
    children: React.ReactNode;
    position: [number, number, number];
    width?: string;
}

export const GlassCard = ({ children, position, width = "w-[30rem]" }: GlassCardProps) => {
    return (
        <Html position={position} transform distanceFactor={3}>
            <div className={`${width} p-10 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl text-gray-800 select-none`}>
                {children}
            </div>
        </Html>
    );
};
