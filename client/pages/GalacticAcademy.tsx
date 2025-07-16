import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Trophy,
  Rocket,
  Globe,
  Atom,
  Zap,
  Star,
  Satellite,
  Telescope,
  Cpu,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Target,
  Compass,
  ChevronRight,
  Orbit,
  Sparkles,
  Flame,
  Shield,
} from "lucide-react";
import GalacticGameScene from "../components/GalacticGameScene";

const GalacticAcademy = () => {
  const [currentView, setCurrentView] = useState<"academy" | "mission">(
    "academy",
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    "pilot" | "engineer" | "scientist"
  >("pilot");

  const playerProfile = {
    name: "Cadet Explorer",
    rank: "Space Cadet",
    level: 7,
    experience: 3420,
    missions: 15,
    accuracy: 96,
    specialization: "Pilot",
    achievements: 12,
  };

  const specializations = [
    {
      id: "pilot" as const,
      name: "Space Pilot",
      title: "Navigation & Flight Dynamics",
      icon: <Rocket className="w-12 h-12" />,
      color: "from-blue-500 via-cyan-500 to-blue-600",
      accent: "blue",
      description:
        "Master orbital mechanics, trajectory calculations, and space navigation through hands-on flight simulations.",
      subjects: ["Vector Mathematics", "Orbital Physics", "Navigation"],
      difficulty: "Intermediate",
      missions: 18,
      completion: 85,
      skills: [
        "Velocity Calculations",
        "Orbital Transfers",
        "Gravitational Forces",
        "Trajectory Planning",
      ],
    },
    {
      id: "engineer" as const,
      name: "Systems Engineer",
      title: "Spacecraft & Station Design",
      icon: <Cpu className="w-12 h-12" />,
      color: "from-emerald-500 via-green-500 to-emerald-600",
      accent: "emerald",
      description:
        "Design and optimize spacecraft systems using advanced engineering mathematics and physics principles.",
      subjects: ["Structural Mechanics", "Thermodynamics", "Electronics"],
      difficulty: "Advanced",
      missions: 24,
      completion: 72,
      skills: [
        "Power Systems",
        "Life Support",
        "Propulsion Design",
        "Materials Science",
      ],
    },
    {
      id: "scientist" as const,
      name: "Astrophysicist",
      title: "Cosmic Phenomena Research",
      icon: <Telescope className="w-12 h-12" />,
      color: "from-purple-500 via-indigo-500 to-purple-600",
      accent: "purple",
      description:
        "Investigate black holes, stellar formation, and cosmic phenomena using advanced mathematical models.",
      subjects: ["Quantum Physics", "Relativity", "Cosmology"],
      difficulty: "Expert",
      missions: 21,
      completion: 78,
      skills: [
        "Spectral Analysis",
        "Stellar Evolution",
        "Dark Matter",
        "Exoplanet Detection",
      ],
    },
  ];

  const academyStats = [
    {
      label: "Active Cadets",
      value: "2,847",
      icon: Users,
      color: "text-blue-400",
      change: "+12%",
    },
    {
      label: "Missions Completed",
      value: "15,632",
      icon: Target,
      color: "text-emerald-400",
      change: "+8%",
    },
    {
      label: "Solar Systems",
      value: "127",
      icon: Globe,
      color: "text-purple-400",
      change: "+3",
    },
    {
      label: "Knowledge Points",
      value: "2.4M",
      icon: BookOpen,
      color: "text-orange-400",
      change: "+15%",
    },
  ];

  const recentMissions = [
    {
      title: "Europa Station Rendezvous",
      type: "Orbital Mechanics",
      difficulty: "Advanced",
      reward: "350 XP",
      status: "Available",
    },
    {
      title: "Solar Panel Efficiency",
      type: "Energy Systems",
      difficulty: "Intermediate",
      reward: "280 XP",
      status: "Available",
    },
    {
      title: "Asteroid Belt Navigation",
      type: "Trajectory Planning",
      difficulty: "Expert",
      reward: "500 XP",
      status: "Locked",
    },
  ];

  if (currentView === "mission") {
    return (
      <GalacticGameScene
        onBackToAcademy={() => setCurrentView("academy")}
        specialization={selectedSpecialization}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Holographic Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotateY: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <div
              className={`w-6 h-6 rounded border-2 ${
                i % 3 === 0
                  ? "border-blue-400"
                  : i % 3 === 1
                    ? "border-emerald-400"
                    : "border-purple-400"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-4 sm:p-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                  <Satellite className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Galactic Academy
                </h1>
                <p className="text-blue-300 text-sm sm:text-base lg:text-lg">
                  Advanced Space Education Institute
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="text-center sm:text-right">
                <p className="text-gray-300 text-xs sm:text-sm">Stardate</p>
                <p className="text-white font-mono text-sm sm:text-base lg:text-lg">
                  2387.156.08
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Academy Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {academyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-3 sm:p-4 lg:p-6 hover:border-blue-400/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <stat.icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${stat.color}`}
                  />
                  <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Command Center */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cadet Profile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 overflow-hidden">
                <div className="relative p-4 sm:p-6 lg:p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full" />

                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 font-semibold text-xs sm:text-sm lg:text-base">
                        SYSTEMS ONLINE • Academy Network Active
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2">
                          Welcome aboard,
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {" "}
                            {playerProfile.name}
                          </span>
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                          Continue your training in advanced space sciences and
                          become a certified galactic explorer.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full">
                            <Award className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-300 font-semibold">
                              {playerProfile.rank}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 font-semibold">
                              Level {playerProfile.level}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full">
                            <Target className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300 font-semibold">
                              {playerProfile.accuracy}% Accuracy
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0 mx-auto lg:mx-0">
                        <motion.div
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center relative"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-600/50 to-purple-600/50 flex items-center justify-center">
                            <Orbit className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-300" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Specialization Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-400" />
                Choose Your Specialization
              </h3>

              <div className="space-y-6">
                {specializations.map((spec, index) => (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedSpecialization(spec.id);
                      setCurrentView("mission");
                    }}
                  >
                    <div
                      className={`bg-gradient-to-r ${spec.color} p-0.5 rounded-2xl hover:shadow-2xl transition-all duration-500 ${selectedSpecialization === spec.id ? "ring-2 ring-blue-400/50" : ""}`}
                    >
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                          {/* Icon Section */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-xl`}
                            >
                              {spec.icon}
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h4 className="text-lg sm:text-xl font-bold text-white">
                                {spec.name}
                              </h4>
                              <Badge className="bg-blue-500/20 text-blue-300 mx-auto sm:mx-0 w-fit">
                                {spec.difficulty}
                              </Badge>
                            </div>
                            <p className="text-blue-300 font-medium mb-2 text-sm sm:text-base">
                              {spec.title}
                            </p>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base">
                              {spec.description}
                            </p>

                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                              {spec.subjects.map((subject) => (
                                <Badge
                                  key={subject}
                                  className="bg-white/10 text-gray-300 text-xs"
                                >
                                  {subject}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center justify-center sm:justify-start space-x-4 text-xs sm:text-sm text-gray-400">
                                <span>{spec.missions} missions</span>
                                <span>{spec.completion}% complete</span>
                              </div>
                              <Button className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-sm w-full sm:w-auto">
                                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Begin Training
                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mission Control Panel */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Start */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-400" />
                  Quick Start Mission
                </h3>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-400/30">
                    <h4 className="font-semibold text-white mb-2">
                      Mars Orbital Insertion
                    </h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Calculate the perfect trajectory for Mars arrival
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-orange-500/20 text-orange-300 text-xs">
                        Orbital Mechanics
                      </Badge>
                      <span className="text-orange-300 text-sm font-semibold">
                        +420 XP
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                    onClick={() => setCurrentView("mission")}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Launch Mission
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Recent Missions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-400" />
                  Available Missions
                </h3>

                <div className="space-y-3">
                  {recentMissions.map((mission, index) => (
                    <motion.div
                      key={mission.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all hover:bg-white/5 ${
                        mission.status === "Available"
                          ? "border-green-400/30 cursor-pointer"
                          : "border-gray-600/30 opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white text-sm">
                          {mission.title}
                        </h4>
                        <Badge
                          className={`text-xs ${
                            mission.status === "Available"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {mission.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {mission.type}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-300">
                          {mission.difficulty}
                        </span>
                        <span className="text-xs text-emerald-300 font-semibold">
                          {mission.reward}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Academy Network */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                  Academy Network
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        Global Leaderboard
                      </p>
                      <p className="text-gray-400 text-xs">
                        Rank #247 of 2,847
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        Daily Challenge
                      </p>
                      <p className="text-gray-400 text-xs">+200 XP Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalacticAcademy;
