import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Star, Heart } from "lucide-react";
import * as THREE from "three";

// Simple 3D Animal Component
const Animal3D = ({
  position,
  animal,
  onClick,
  isSelected,
  isCorrect,
}: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getColor = () => {
    if (isSelected) return "#FFD700";
    if (isCorrect) return "#90EE90";
    return animal.color || "#FFA500";
  };

  return (
    <group position={position} onClick={onClick}>
      {/* Animal Body */}
      <Box
        ref={meshRef}
        args={[1, 0.8, 1.2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1.1}
      >
        <meshLambertMaterial color={getColor()} />
      </Box>

      {/* Animal Head */}
      <Sphere args={[0.5]} position={[0, 0.6, 0.8]}>
        <meshLambertMaterial color={getColor()} />
      </Sphere>

      {/* Number Display */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.8}
        color={isSelected ? "#FF1493" : "#2E8B57"}
        anchorX="center"
        anchorY="middle"
      >
        {animal.value}
      </Text>
    </group>
  );
};

// 3D Farm Scene
const Farm3DScene = ({
  currentProblem,
  onAnimalClick,
  selectedAnswer,
}: any) => {
  return (
    <Canvas
      camera={{ position: [0, 4, 6], fov: 75 }}
      style={{
        background: "linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)",
        height: "100%",
        width: "100%",
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Farm Ground */}
      <Box args={[15, 0.2, 15]} position={[0, -2, 0]}>
        <meshLambertMaterial color="#228B22" />
      </Box>

      {/* Animals */}
      {currentProblem?.options?.map((animal: any, index: number) => (
        <Animal3D
          key={index}
          position={[(index - 1.5) * 2.5, 0, 0]}
          animal={animal}
          onClick={() => onAnimalClick(animal.value)}
          isSelected={selectedAnswer === animal.value}
          isCorrect={animal.value === currentProblem.correctAnswer}
        />
      ))}

      {/* Question Text */}
      {currentProblem && (
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.6}
          color="#FF1493"
          anchorX="center"
          anchorY="middle"
        >
          {currentProblem.question}
        </Text>
      )}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxDistance={12}
        minDistance={3}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </Canvas>
  );
};

interface FarmGameSceneProps {
  activity: string;
  onBack: () => void;
}

const FarmGameScene = ({ activity, onBack }: FarmGameSceneProps) => {
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [problemIndex, setProblemIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Generate problems
  const generateProblems = (activityType: string) => {
    const problems = [];
    const colors = ["#FFB6C1", "#98FB98", "#87CEEB", "#DDA0DD", "#F0E68C"];

    for (let i = 0; i < 8; i++) {
      let problem: any = {};

      switch (activityType) {
        case "counting":
          const count = Math.floor(Math.random() * 5) + 1;
          problem = {
            question: `Có bao nhiêu con động vật? 🐄`,
            correctAnswer: count,
            options: [
              { value: count, color: colors[0], emoji: "🐄" },
              { value: count + 1, color: colors[1], emoji: "🐄" },
              { value: count - 1 || 1, color: colors[2], emoji: "🐄" },
              { value: count + 2, color: colors[3], emoji: "🐄" },
            ].sort(() => Math.random() - 0.5),
          };
          break;

        case "adding":
          const num1 = Math.floor(Math.random() * 4) + 1;
          const num2 = Math.floor(Math.random() * 4) + 1;
          const sum = num1 + num2;
          problem = {
            question: `${num1} + ${num2} = ? 🥚`,
            correctAnswer: sum,
            options: [
              { value: sum, color: colors[0], emoji: "🥚" },
              { value: sum + 1, color: colors[1], emoji: "🥚" },
              { value: sum - 1, color: colors[2], emoji: "🥚" },
              { value: sum + 2, color: colors[3], emoji: "🥚" },
            ].sort(() => Math.random() - 0.5),
          };
          break;

        case "matching":
          const target = Math.floor(Math.random() * 6) + 1;
          problem = {
            question: `Tìm số ${target} 🐰`,
            correctAnswer: target,
            options: [
              { value: target, color: colors[0], emoji: "🐰" },
              { value: target + 1, color: colors[1], emoji: "🐰" },
              { value: target - 1 || 1, color: colors[2], emoji: "🐰" },
              { value: target + 2, color: colors[3], emoji: "🐰" },
            ].sort(() => Math.random() - 0.5),
          };
          break;

        case "feeding":
          const animals = Math.floor(Math.random() * 3) + 2;
          const foodEach = Math.floor(Math.random() * 2) + 1;
          const total = animals * foodEach;
          problem = {
            question: `${animals} con × ${foodEach} củ = ? 🥕`,
            correctAnswer: total,
            options: [
              { value: total, color: colors[0], emoji: "🥕" },
              { value: total + 1, color: colors[1], emoji: "🥕" },
              { value: total - 1, color: colors[2], emoji: "🥕" },
              { value: total + 2, color: colors[3], emoji: "🥕" },
            ].sort(() => Math.random() - 0.5),
          };
          break;

        default:
          problem = {
            question: "1 + 1 = ?",
            correctAnswer: 2,
            options: [
              { value: 2, color: colors[0], emoji: "🐄" },
              { value: 3, color: colors[1], emoji: "🐄" },
            ],
          };
      }

      problems.push(problem);
    }

    return problems;
  };

  const [problems] = useState(() => generateProblems(activity));

  useEffect(() => {
    if (problems.length > 0) {
      setCurrentProblem(problems[problemIndex]);
    }
  }, [problems, problemIndex]);

  const handleAnimalClick = (value: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(value);
    const correct = value === currentProblem.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (problemIndex < problems.length - 1) {
        setProblemIndex(problemIndex + 1);
      } else {
        // Game completed
        alert(`Chúc mừng! Điểm: ${score + (correct ? 10 : 0)} ⭐`);
        onBack();
      }
    }, 2000);
  };

  const getActivityTitle = () => {
    switch (activity) {
      case "counting":
        return "🐄 Đếm Động Vật";
      case "adding":
        return "🥚 Cộng Trứng";
      case "matching":
        return "🐰 Ghép Cặp";
      case "feeding":
        return "🥕 Cho Ăn";
      default:
        return "🚜 Trang Trại";
    }
  };

  if (hearts === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-200 to-pink-300 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl border-2 sm:border-4 border-red-400 mx-4"
        >
          <div className="text-6xl sm:text-8xl mb-2 sm:mb-4">😢</div>
          <h2 className="text-xl sm:text-3xl font-black text-red-600 mb-2 sm:mb-4">
            Hết tim rồi!
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 mb-4 sm:mb-6">
            Đừng lo! Hãy thử lại nhé! 🌟
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg sm:text-xl font-black py-2 px-6 sm:py-3 sm:px-8 rounded-xl sm:rounded-2xl touch-manipulation"
          >
            Chơi Lại 🎮
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200">
      {/* Header */}
      <div className="relative z-20 p-2 sm:p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl border-2 sm:border-4 border-yellow-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl touch-manipulation"
              >
                <Home className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.button>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-purple-600 flex-1 text-center sm:text-left">
                {getActivityTitle()}
              </h1>
            </div>

            <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-center">
              <div className="bg-yellow-400 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center gap-1 sm:gap-2">
                <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-600" />
                <span className="text-sm sm:text-lg font-black text-yellow-800">
                  {score}
                </span>
              </div>
              <div className="bg-red-400 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center gap-1 sm:gap-2">
                <Heart className="w-3 h-3 sm:w-5 sm:h-5 text-red-600" />
                <span className="text-sm sm:text-lg font-black text-red-800">
                  {hearts}
                </span>
              </div>
              <div className="bg-blue-400 rounded-xl sm:rounded-2xl p-2 sm:p-3">
                <span className="text-sm sm:text-lg font-black text-blue-800">
                  {problemIndex + 1}/{problems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)]">
        <Farm3DScene
          currentProblem={currentProblem}
          onAnimalClick={handleAnimalClick}
          selectedAnswer={selectedAnswer}
        />
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/20"
          >
            <div
              className={`${isCorrect ? "bg-green-400" : "bg-red-400"} rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl border-2 sm:border-4 border-white mx-4`}
            >
              <div className="text-6xl sm:text-8xl mb-2 sm:mb-4">
                {isCorrect ? "🎉" : "😅"}
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white mb-1 sm:mb-2">
                {isCorrect ? "Giỏi quá!" : "Thử lại nhé!"}
              </h2>
              <p className="text-sm sm:text-xl text-white">
                {isCorrect
                  ? "Bé làm đúng rồi! 🌟"
                  : "Đừng lo, lần sau sẽ đúng! 💪"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmGameScene;
