import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────── Data ─────────────────────────── */
const RINGS = [
  {
    radius: 3.2,
    speed: 0.45,
    size: 0.27,
    color: "#818cf8",
    skills: [
      { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",           glow: "#e34f26" },
      { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",             glow: "#1572b6" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", glow: "#f7df1e" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", glow: "#3178c6" },
    ],
  },
  {
    radius: 5.2,
    speed: 0.28,
    size: 0.24,
    color: "#38bdf8",
    skills: [
      { name: "React",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",                                glow: "#61dafb" },
      { name: "Next.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",                              glow: "#ffffff" },
      { name: "Node.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",                              glow: "#539e43" },
      { name: "Python",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                              glow: "#3776ab" },
      { name: "Tailwind",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",                    glow: "#38bdf8" },
    ],
  },
  {
    radius: 7.4,
    speed: 0.18,
    size: 0.22,
    color: "#c4b5fd",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",     glow: "#47a248" },
      { name: "MySQL",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",         glow: "#4479a1" },
      { name: "Docker",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",       glow: "#2496ed" },
      { name: "Git",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",             glow: "#f05032" },
      { name: "AWS",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", glow: "#ff9900" },
      { name: "Linux",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",         glow: "#fcc624" },
    ],
  },
];

const ALL_SKILLS = RINGS.flatMap(r => r.skills);

/* ─────────────────────────── Sun Mesh ─────────────────────────── */
const Sun = () => {
  const coreRef  = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) coreRef.current.rotation.y = t * 0.12;
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 1.8) * 0.3;
      mat.opacity = 0.35 + Math.sin(t * 1.2) * 0.08;
    }
    if (coronaRef.current) {
      const mat = coronaRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.12 + Math.sin(t * 0.7) * 0.05;
    }
  });

  return (
    <group>
      {/* Strong lights so planets are well-lit */}
      <pointLight color="#fff4cc" intensity={8}  distance={30} decay={1.5} />
      <pointLight color="#ff9900" intensity={3}  distance={15} decay={2} />
      <ambientLight intensity={0.25} />

      {/* Core — meshBasicMaterial = always max brightness, ignores scene lighting */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.78, 64, 64]} />
        <meshBasicMaterial color="#fffde7" />
      </mesh>

      {/* Mid surface — standard + emissive for hot-orange look */}
      <mesh>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshStandardMaterial
          color="#ffcc00"
          emissive="#ff6600"
          emissiveIntensity={2.5}
          roughness={0.5}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff5500"
          emissiveIntensity={1.2}
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Corona / outer halo */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff4400"
          emissiveIntensity={0.3}
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/* ─────────────────────── Orbit Ring Line ─────────────────────── */
const OrbitRing = ({ radius, color }: { radius: number; color: string }) => {
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))} />
  );
};

/* ─────────────────────────── Planet ─────────────────────────── */
interface Skill { name: string; icon: string; glow: string; }

const Planet = ({
  skill, orbitRadius, speed, initialAngle, size, glowColor,
}: {
  skill: Skill; orbitRadius: number; speed: number;
  initialAngle: number; size: number; glowColor: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(initialAngle);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    angleRef.current += speed * delta;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * orbitRadius;
      groupRef.current.position.z = Math.sin(angleRef.current) * orbitRadius;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <mesh
        onPointerOver={e => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = "pointer"; }}
        onPointerOut={() =>  { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={hovered ? 0.9 : 0.35}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Glow halo when hovered */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[size * 1.5, 16, 16]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={0.4} transparent opacity={0.15} side={THREE.BackSide} depthWrite={false} />
        </mesh>
      )}

      {/* HTML icon + tooltip overlay */}
      <Html center distanceFactor={7} zIndexRange={[0, 100]} style={{ pointerEvents: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div className="sk-planet-icon" style={{
            width: 34, height: 34,
            borderRadius: "50%",
            background: "rgba(10,8,30,0.75)",
            border: `2px solid ${glowColor}99`,
            boxShadow: hovered ? `0 0 14px 4px ${glowColor}88` : `0 0 6px 2px ${glowColor}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            backdropFilter: "blur(6px)",
          }}>
            <img
              src={skill.icon}
              alt={skill.name}
              style={{
                width: "60%", height: "60%", objectFit: "contain",
                filter: skill.name === "Next.js" ? "invert(1)" : "none",
              }}
              draggable={false}
            />
          </div>

          {/* Tooltip on hover */}
          {hovered && (
            <div style={{
              background: "rgba(10,8,35,0.95)",
              border: `1px solid ${glowColor}66`,
              color: "#e2e8f0",
              padding: "4px 12px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
              letterSpacing: "0.04em",
              boxShadow: `0 4px 18px ${glowColor}33`,
              backdropFilter: "blur(10px)",
            }}>
              {skill.name}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

/* ──────────────────────── 3-D Scene ─────────────────────────── */
const UniverseScene = () => (
  <group rotation={[-0.3, 0, 0]}>
    <Stars radius={80} depth={50} count={4000} factor={4} fade speed={1} />
    <Sun />
    {RINGS.map((ring, ri) => (
      <group key={ri}>
        <OrbitRing radius={ring.radius} color={ring.color} />
        {ring.skills.map((skill, si) => (
          <Planet
            key={skill.name}
            skill={skill}
            orbitRadius={ring.radius}
            speed={ring.speed}
            initialAngle={(si / ring.skills.length) * Math.PI * 2}
            size={ring.size}
            glowColor={skill.glow}
          />
        ))}
      </group>
    ))}
  </group>
);

/* ──────────────────────── Skills Section ─────────────────────── */
export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg,#060614 0%,#07050f 50%,#0a0618 100%)",
        padding: "clamp(2rem, 6vw, 4rem) 0 2.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <style>{`
        @keyframes sk-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .sk-title {
          background: linear-gradient(90deg,#a78bfa 0%,#818cf8 20%,#38bdf8 40%,#818cf8 60%,#c4b5fd 80%,#a78bfa 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:sk-shimmer 5s linear infinite;
        }
        @keyframes sk-fadein { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .sk-fadein { animation: sk-fadein 0.9s cubic-bezier(.22,1,.36,1) both; }
        .sk-chip {
          display:inline-flex;align-items:center;gap:10px;
          padding:10px 20px;border-radius:99px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.12);
          color:#cbd5e1;font-size:14px;font-weight:600;
          transition:all 0.2s;cursor:default;
          letter-spacing:0.02em;
        }
        .sk-chip:hover {
          background:rgba(139,92,246,0.18);
          border-color:rgba(139,92,246,0.55);
          color:#a78bfa;
          transform:translateY(-3px);
          box-shadow:0 8px 24px rgba(139,92,246,0.25);
        }
        .sk-badge {
          display:inline-flex;align-items:center;gap:6px;
          padding:5px 16px;border-radius:99px;
          background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);
          color:#a78bfa;font-size:11px;font-weight:700;
          letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1rem;
        }
        @media (max-width: 768px) {
          .sk-planet-icon {
            width: 28px !important;
            height: 28px !important;
          }
          .sk-canvas-container {
            height: 320px !important;
          }
        }
      `}</style>

      {/* Nebula blobs */}
      {[
        {top:"5%",left:"2%",w:'60vw',h:'40vh',c:"#4f46e5"},
        {top:"60%",left:"60%",w:'50vw',h:'40vh',c:"#0e7490"},
        {top:"80%",left:"5%",w:'40vw',h:'30vh',c:"#7c3aed"},
      ].map((n,i)=>(
        <div key={i} aria-hidden style={{
          position:"absolute",top:n.top,left:n.left,
          width:n.w,height:n.h,borderRadius:"50%",
          background:`radial-gradient(ellipse,${n.c}15 0%,${n.c}05 55%,transparent 75%)`,
          filter:"blur(55px)",pointerEvents:"none",
        }}/>
      ))}

      {/* Header */}
      <div className="sk-fadein" style={{textAlign:"center",marginBottom:"0.5rem",position:"relative",zIndex:5}}>
        <div className="sk-badge">
          <span style={{width:7,height:7,borderRadius:"50%",background:"currentColor",display:"inline-block"}}/>
          Technologies I Work With
        </div>
        <h2 className="sk-title" style={{fontSize:"clamp(2rem,5vw,3.4rem)",fontWeight:900,lineHeight:1.1,margin:0}}>
          Technical Skills
        </h2>
        <p style={{color:"#64748b",fontSize:"0.95rem",marginTop:"0.7rem",maxWidth:520,margin:"0.7rem auto 0"}}>
          A 3D visualization of my core technical competencies — drag to explore the universe.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="sk-canvas-container" style={{width:"100%",height:"clamp(320px, 60vw, 700px)",position:"relative",zIndex:4,background:"transparent"}}>
        <Canvas
          camera={{ position: [0, 8, 12], fov: 40 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true, clearColor: [0, 0, 0, 0] } as any}
        >
          <Suspense fallback={null}>
            <UniverseScene />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.7}
            dampingFactor={0.08}
            enableDamping
          />
        </Canvas>
      </div>

      {/* Drag hint — outside canvas so it doesn't overlap */}
      <div style={{
        display:"flex",alignItems:"center",gap:10,marginTop:"0.6rem",
        color:"#475569",fontSize:11,fontWeight:700,letterSpacing:"0.12em",
        textTransform:"uppercase",pointerEvents:"none",position:"relative",zIndex:5,
      }}>
        <span style={{width:6,height:6,borderRadius:"50%",background:"#6366f1",display:"inline-block",opacity:0.8}}/>
        Core Stack
        <span style={{width:24,height:1,background:"#334155",display:"inline-block"}}/>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/></svg>
        Drag to Rotate
      </div>

      {/* Skill Chips */}
      <div
        className="sk-fadein"
        style={{
          display:"flex",flexWrap:"wrap",gap:"12px",justifyContent:"center",
          maxWidth:1100,padding:"0 2rem",marginTop:"1.2rem",position:"relative",zIndex:5,
          animationDelay:"0.5s",
        }}
      >
        {ALL_SKILLS.map(skill => (
          <div key={skill.name} className="sk-chip">
            <img
              src={skill.icon} alt={skill.name}
              style={{
                width:24,height:24,objectFit:"contain",
                filter: skill.name === "Next.js" ? "invert(1)" : "none",
              }}
              draggable={false}
            />
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
};
