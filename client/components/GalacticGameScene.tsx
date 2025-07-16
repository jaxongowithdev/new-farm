import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Sphere,
  Box,
  Cylinder,
  Ring,
  Stars,
  Trail,
  Sparkles as DreiSparkles,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RotateCcw,
  Rocket,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Satellite,
  Zap,
  Star,
  Globe,
  Compass,
  Orbit,
  Atom,
  Calculator,
  TrendingUp,
  Sun,
  Menu,
  X,
} from "lucide-react";
import * as THREE from "three";

interface GalacticGameSceneProps {
  onBackToAcademy: () => void;
  specialization: "pilot" | "engineer" | "scientist";
}

// Central Sun
const CentralSun = ({ isActive }: { isActive: boolean }) => {
  const sunRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
      sunRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={sunRef} position={[0, 0, 0]}>
      {/* Sun Core */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial
          color="#ffeb3b"
          emissive="#ff9800"
          emissiveIntensity={isActive ? 0.8 : 0.3}
        />
      </Sphere>

      {/* Corona Effect */}
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial
          color="#ffc107"
          transparent
          opacity={isActive ? 0.3 : 0.1}
          emissive="#ff5722"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Solar Flares */}
      {isActive && (
        <DreiSparkles
          count={30}
          scale={4}
          size={4}
          speed={1.5}
          color="#ffeb3b"
        />
      )}
    </group>
  );
};

// Answer Planet orbiting around sun
const AnswerPlanet = ({
  orbitRadius,
  orbitSpeed,
  answer,
  index,
  isSelected,
  isCorrect,
  onSelect,
  planetColor,
}: {
  orbitRadius: number;
  orbitSpeed: number;
  answer: number;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  onSelect: () => void;
  planetColor: string;
}) => {
  const planetRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (planetRef.current) {
      const time = state.clock.elapsedTime * orbitSpeed;
      planetRef.current.position.x = Math.cos(time) * orbitRadius;
      planetRef.current.position.z = Math.sin(time) * orbitRadius;
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={planetRef}>
      {/* Planet */}
      <Sphere
        args={[0.6, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onSelect}
        scale={hovered ? 1.3 : isSelected ? 1.2 : 1}
      >
        <meshPhongMaterial
          color={isSelected ? "#00ff00" : planetColor}
          emissive={isSelected ? "#004400" : planetColor}
          emissiveIntensity={isSelected ? 0.3 : 0.1}
          shininess={100}
        />
      </Sphere>

      {/* Planet Ring */}
      <Ring args={[0.8, 1, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          color={planetColor}
          transparent
          opacity={hovered ? 0.6 : 0.3}
        />
      </Ring>

      {/* Answer Label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {String.fromCharCode(65 + index)}: {answer}
      </Text>

      {/* Selection indicator */}
      {isSelected && (
        <Ring args={[1.2, 1.4, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00ff00" />
        </Ring>
      )}
    </group>
  );
};

// Question Display in Space
const QuestionDisplay = ({
  question,
  problem,
  isActive,
}: {
  question: string;
  problem: string;
  isActive: boolean;
}) => {
  const displayRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (displayRef.current && isActive) {
      displayRef.current.position.y =
        4 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={displayRef} position={[0, 4, 0]}>
      {/* Holographic Frame */}
      <Box args={[8, 2, 0.1]}>
        <meshStandardMaterial
          color="#4fc3f7"
          transparent
          opacity={0.2}
          emissive="#0277bd"
        />
      </Box>

      {/* Question Text */}
      {isActive && (
        <>
          <Text
            position={[0, 0.4, 0.1]}
            fontSize={0.3}
            color="#00e5ff"
            anchorX="center"
            anchorY="middle"
            maxWidth={7}
          >
            {question}
          </Text>
          <Text
            position={[0, -0.4, 0.1]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={7}
          >
            {problem}
          </Text>
        </>
      )}
    </group>
  );
};

// Space Environment
const SpaceEnvironment = () => {
  return (
    <>
      <Stars radius={200} depth={50} count={6000} factor={4} saturation={0} />

      {/* Nebula Effects */}
      <Sphere args={[80]} position={[30, 20, -40]}>
        <meshBasicMaterial
          color="#9c27b0"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      <Sphere args={[60]} position={[-25, -15, 35]}>
        <meshBasicMaterial
          color="#3f51b5"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Distant Planets */}
      <Sphere args={[1.5]} position={[20, 8, -25]}>
        <meshPhongMaterial color="#f44336" emissive="#d32f2f" />
      </Sphere>

      <Sphere args={[2]} position={[-30, -5, 20]}>
        <meshPhongMaterial color="#2196f3" emissive="#1976d2" />
      </Sphere>
    </>
  );
};

const GalacticGameScene = ({
  onBackToAcademy,
  specialization,
}: GalacticGameSceneProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"playing" | "ended">("playing");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    correct: boolean;
    message: string;
  }>({ show: false, correct: false, message: "" });

  // Physics and Astronomy Problems by Specialization
  const problemSets = {
    pilot: [
      {
        question: "Calculate orbital velocity for 400km altitude orbit",
        problem: "v = √(GM/r), where r = 6.78×10⁶m. Find v (km/s):",
        answer: 7.7,
        options: [7.7, 8.2, 6.9, 9.1],
        explanation: "v = √(3.986×10¹⁴/6.78×10⁶) ≈ 7.7 km/s",
      },
      {
        question: "Mars transfer orbit Δv calculation",
        problem: "Hohmann transfer to Mars requires Δv (km/s):",
        answer: 3.6,
        options: [3.6, 4.2, 2.8, 5.1],
        explanation: "Total Δv ≈ 3.6 km/s for Earth-Mars Hohmann transfer",
      },
      {
        question: "Gravitational acceleration on Moon",
        problem: "Moon's surface gravity (m/s²):",
        answer: 1.6,
        options: [1.6, 2.4, 0.9, 3.7],
        explanation: "Moon's gravity = 1.6 m/s² (1/6 of Earth's)",
      },
      {
        question: "Escape velocity from Earth",
        problem: "Minimum velocity to escape Earth (km/s):",
        answer: 11.2,
        options: [11.2, 9.8, 12.5, 8.9],
        explanation: "v_escape = √(2GM/R) = 11.2 km/s from Earth",
      },
    ],
    engineer: [
      {
        question: "Solar panel efficiency calculation",
        problem: "1000W/m² sunlight, 20% efficiency. Power output per m²:",
        answer: 200,
        options: [200, 150, 250, 180],
        explanation: "Power = 1000W × 0.20 = 200W per m²",
      },
      {
        question: "Rocket propulsion specific impulse",
        problem: "Chemical rocket Isp (seconds) typical value:",
        answer: 450,
        options: [450, 300, 600, 800],
        explanation: "Chemical rockets: Isp ≈ 450s (hydrogen/oxygen)",
      },
      {
        question: "Heat shield thermal calculation",
        problem: "Re-entry heating: q = ρv³. At v=8km/s, ρ=0.1kg/m³:",
        answer: 51.2,
        options: [51.2, 38.4, 64.0, 25.6],
        explanation: "q = 0.1 × 8³ = 0.1 × 512 = 51.2 MW/m²",
      },
      {
        question: "Structural load factor",
        problem: "Spacecraft experiences 3g acceleration. Load factor:",
        answer: 3.0,
        options: [3.0, 2.5, 4.0, 1.5],
        explanation: "Load factor = acceleration/gravity = 3g/g = 3.0",
      },
    ],
    scientist: [
      {
        question: "Schwarzschild radius calculation",
        problem: "Black hole mass = 10 solar masses. Rs (km):",
        answer: 29.5,
        options: [29.5, 35.2, 22.8, 41.7],
        explanation: "Rs = 2GM/c² = 2.95 × M_sun = 29.5 km",
      },
      {
        question: "Stellar luminosity vs temperature",
        problem: "Star's T = 2×Sun. Luminosity ratio L/L_sun:",
        answer: 16,
        options: [16, 8, 4, 32],
        explanation: "L ∝ T⁴, so (2T)⁴ = 16 × L_sun",
      },
      {
        question: "Redshift and recession velocity",
        problem: "Galaxy redshift z=0.1. Recession velocity (km/s):",
        answer: 30000,
        options: [30000, 45000, 15000, 60000],
        explanation: "v = cz = 300,000 × 0.1 = 30,000 km/s",
      },
      {
        question: "Exoplanet orbital period",
        problem: "Kepler's 3rd law: a=2AU, find period (years):",
        answer: 2.8,
        options: [2.8, 3.2, 2.0, 4.0],
        explanation: "T² = a³, so T = √(2³) = √8 ≈ 2.8 years",
      },
    ],
  };

  const problems = problemSets[specialization];

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState("ended");
    }
  }, [timeLeft, gameState]);

  const handlePlanetSelect = (answer: number, index: number) => {
    setSelectedAnswer(answer);
    setSelectedIndex(index);

    const isCorrect = answer === problems[currentProblem].answer;

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 200);
        setFeedback({
          show: true,
          correct: true,
          message: "Excellent calculation! Mission parameters updated. +200 XP",
        });
      } else {
        setFeedback({
          show: true,
          correct: false,
          message: `Calculation error detected. ${problems[currentProblem].explanation}`,
        });
      }

      setTimeout(() => {
        setFeedback({ show: false, correct: false, message: "" });
        setSelectedAnswer(null);
        setSelectedIndex(null);
        const newProblemsCompleted = problemsCompleted + 1;
        setProblemsCompleted(newProblemsCompleted);

        if (newProblemsCompleted >= 8) {
          setGameState("ended");
        } else {
          setCurrentProblem((currentProblem + 1) % problems.length);
        }
      }, 3000);
    }, 1000);
  };

  const resetMission = () => {
    setScore(0);
    setTimeLeft(90);
    setCurrentProblem(0);
    setProblemsCompleted(0);
    setSelectedAnswer(null);
    setSelectedIndex(null);
    setGameState("playing");
    setFeedback({ show: false, correct: false, message: "" });
  };

  const specializationInfo = {
    pilot: { name: "Space Pilot", icon: <Rocket className="w-4 h-4" /> },
    engineer: {
      name: "Systems Engineer",
      icon: <Calculator className="w-4 h-4" />,
    },
    scientist: { name: "Astrophysicist", icon: <Atom className="w-4 h-4" /> },
  };

  const planetColors = ["#e91e63", "#2196f3", "#4caf50", "#ff9800"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Mobile-First HUD */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 p-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Mobile Menu Bar */}
          <div className="md:hidden">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-3">
              <div className="flex items-center justify-between">
                {/* Left: Back & Menu */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={onBackToAcademy}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/30 rounded-xl p-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 border-gray-400/30 rounded-xl p-2"
                  >
                    {showMobileMenu ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Menu className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Center: Mission Info */}
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1">
                    {problemsCompleted + 1}/8
                  </Badge>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>

                {/* Right: Reset */}
                <Button
                  onClick={resetMission}
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border-orange-400/30 rounded-xl p-2"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Expandable Mobile Menu */}
              <AnimatePresence>
                {showMobileMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-blue-400/20"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {/* Specialization */}
                      <div className="bg-purple-500/20 rounded-xl p-3 border border-purple-400/30">
                        <div className="flex items-center space-x-2">
                          {specializationInfo[specialization].icon}
                          <span className="text-purple-300 text-sm font-semibold">
                            {specializationInfo[specialization].name}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2">
                        <div className="bg-blue-500/20 rounded-lg p-2 border border-blue-400/30">
                          <div className="flex items-center space-x-2">
                            <Target className="w-3 h-3 text-blue-300" />
                            <span className="text-blue-100 font-semibold text-sm">
                              {score} XP
                            </span>
                          </div>
                        </div>
                        <div className="bg-orange-500/20 rounded-lg p-2 border border-orange-400/30">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 text-orange-300" />
                            <span className="text-orange-100 font-semibold text-sm">
                              {timeLeft}s
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Menu Bar */}
          <div className="hidden md:block">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Button
                    onClick={onBackToAcademy}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/30 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Academy
                  </Button>

                  <div className="flex items-center space-x-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                      Mission {problemsCompleted + 1}/8
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 flex items-center space-x-2">
                      {specializationInfo[specialization].icon}
                      <span>{specializationInfo[specialization].name}</span>
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-blue-500/20 rounded-xl px-4 py-2 border border-blue-400/30">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-100 font-semibold">
                        {score} XP
                      </span>
                    </div>
                  </div>

                  <div className="bg-orange-500/20 rounded-xl px-4 py-2 border border-orange-400/30">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-300" />
                      <span className="text-orange-100 font-semibold">
                        {timeLeft}s
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={resetMission}
                    className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 border-gray-400/30 rounded-xl p-3"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3D Solar System Scene */}
      <div className="absolute inset-0 pt-20 md:pt-24">
        <Canvas camera={{ position: [0, 8, 12], fov: 75 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffeb3b" />
          <pointLight position={[20, 20, 20]} intensity={0.5} color="#ffffff" />

          <SpaceEnvironment />

          {/* Question Display */}
          <QuestionDisplay
            question={problems[currentProblem]?.question || ""}
            problem={problems[currentProblem]?.problem || ""}
            isActive={gameState === "playing" && !feedback.show}
          />

          {/* Central Sun */}
          <CentralSun isActive={gameState === "playing" && !feedback.show} />

          {/* Answer Planets orbiting the Sun */}
          {gameState === "playing" &&
            !feedback.show &&
            problems[currentProblem]?.options.map((option, index) => (
              <AnswerPlanet
                key={`${currentProblem}-${index}`}
                orbitRadius={4 + index * 0.5}
                orbitSpeed={0.3 - index * 0.05}
                answer={option}
                index={index}
                isSelected={selectedIndex === index}
                isCorrect={option === problems[currentProblem].answer}
                onSelect={() => handlePlanetSelect(option, index)}
                planetColor={planetColors[index]}
              />
            ))}

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxDistance={25}
            minDistance={8}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>

      {/* Mobile Instructions */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 z-20 md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {gameState === "playing" && !feedback.show && (
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">
                Solar System Navigation
              </span>
            </div>
            <p className="text-cyan-300 text-sm">
              Tap on the orbiting planets to select your answer
            </p>
          </div>
        )}
      </motion.div>

      {/* Enhanced Feedback System */}
      <AnimatePresence>
        {feedback.show && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              className="bg-black/90 backdrop-blur-xl rounded-3xl border border-blue-400/30 p-6 md:p-8 max-w-2xl mx-4 text-center"
            >
              <div className="mb-6">
                {feedback.correct ? (
                  <CheckCircle className="w-16 md:w-20 h-16 md:h-20 text-emerald-400 mx-auto" />
                ) : (
                  <XCircle className="w-16 md:w-20 h-16 md:h-20 text-red-400 mx-auto" />
                )}
              </div>

              <h3
                className={`text-2xl md:text-3xl font-bold mb-4 ${
                  feedback.correct ? "text-emerald-300" : "text-red-300"
                }`}
              >
                {feedback.correct ? "Mission Success!" : "Calculation Error"}
              </h3>

              <p className="text-white text-base md:text-lg mb-6">
                {feedback.message}
              </p>

              {selectedAnswer && (
                <div className="bg-white/10 rounded-2xl p-4 md:p-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-300 mb-2">Your Solution:</p>
                      <p className="text-white font-bold text-lg md:text-xl">
                        {selectedAnswer}
                      </p>
                    </div>
                    <div>
                      <p className="text-emerald-300 mb-2">Correct Answer:</p>
                      <p className="text-white font-bold text-lg md:text-xl">
                        {problems[currentProblem].answer}
                      </p>
                    </div>
                  </div>
                  {!feedback.correct && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-yellow-300 text-sm md:text-base">
                        {problems[currentProblem].explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-300">
                Preparing next mission parameters...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mission Complete */}
      <AnimatePresence>
        {gameState === "ended" && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/95 backdrop-blur-xl rounded-3xl border border-blue-400/30 p-6 md:p-10 max-w-2xl mx-4 text-center"
            >
              <Satellite className="w-20 md:w-24 h-20 md:h-24 text-blue-400 mx-auto mb-6" />

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mission Complete!
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-500/20 rounded-2xl p-6">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-lg text-blue-300">Experience Gained</p>
                  <p className="text-3xl font-bold text-blue-100">{score} XP</p>
                </div>

                <div className="bg-emerald-500/20 rounded-2xl p-6">
                  <Target className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <p className="text-lg text-emerald-300">Missions Completed</p>
                  <p className="text-3xl font-bold text-emerald-100">
                    {problemsCompleted}/8
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={resetMission}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-3"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  New Mission
                </Button>

                <Button
                  onClick={onBackToAcademy}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-2xl py-3"
                >
                  <Compass className="w-5 h-5 mr-2" />
                  Return to Academy
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalacticGameScene;
