import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Gift, Home } from "lucide-react";
import FarmGameScene from "../components/FarmGameScene";

const FarmAdventure = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);

  const activities = [
    {
      id: "counting",
      name: "Đếm Động Vật",
      description: "Cùng đếm những chú động vật dễ thương!",
      icon: "🐄",
      color: "from-pink-400 to-red-400",
    },
    {
      id: "adding",
      name: "Cộng Trứng",
      description: "Giúp gà mái đếm số trứng nhé!",
      icon: "🥚",
      color: "from-yellow-400 to-orange-400",
    },
    {
      id: "matching",
      name: "Ghép Cặp",
      description: "Tìm bạn cho các chú động vật!",
      icon: "🐰",
      color: "from-green-400 to-blue-400",
    },
    {
      id: "feeding",
      name: "Cho Ăn",
      description: "Học cách chia sẻ thức ăn công bằng!",
      icon: "🥕",
      color: "from-purple-400 to-pink-400",
    },
  ];

  if (showGame && selectedActivity) {
    return (
      <FarmGameScene
        activity={selectedActivity}
        onBack={() => setShowGame(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-yellow-200 to-blue-300 p-2 sm:p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-4 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-green-600 mb-2 sm:mb-4">
            🚜 Trang Trại Vui Vẻ 🚜
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-bold px-2">
            Học toán cùng những chú động vật dễ thương! 🌟
          </p>
        </motion.div>

        {/* Player Stats */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 sm:border-4 border-yellow-400 mb-4 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 text-center sm:text-left">
              <div className="text-4xl sm:text-6xl">👶</div>
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-purple-600">
                  Xin chào Bé Yêu! 🎈
                </h2>
                <p className="text-sm sm:text-lg text-gray-600">
                  Sẵn sàng khám phá trang trại chưa?
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="bg-yellow-400 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600 mx-auto" />
                <div className="text-sm sm:text-xl font-black text-yellow-800">
                  127
                </div>
              </div>
              <div className="bg-red-400 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 mx-auto" />
                <div className="text-sm sm:text-xl font-black text-red-800">
                  15
                </div>
              </div>
              <div className="bg-purple-400 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center">
                <Gift className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 mx-auto" />
                <div className="text-sm sm:text-xl font-black text-purple-800">
                  8
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${activity.color} rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white cursor-pointer relative overflow-hidden touch-manipulation`}
              onClick={() => {
                setSelectedActivity(activity.id);
                setShowGame(true);
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-lg sm:text-2xl animate-pulse">
                ✨
              </div>
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-sm sm:text-xl animate-bounce">
                ⭐
              </div>

              <div className="relative z-10 text-center">
                <div className="text-5xl sm:text-8xl mb-2 sm:mb-4 animate-bounce">
                  {activity.icon}
                </div>
                <h3 className="text-xl sm:text-3xl font-black text-white mb-1 sm:mb-2">
                  {activity.name}
                </h3>
                <p className="text-sm sm:text-xl text-white/90 font-semibold mb-2 sm:mb-4 px-2">
                  {activity.description}
                </p>
                <div className="flex justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center gap-1 sm:gap-2">
                    <span className="text-white font-black text-sm sm:text-lg">
                      Chơi Ngay
                    </span>
                    <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Farm Animals Parade */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 sm:border-4 border-green-400"
        >
          <h3 className="text-xl sm:text-3xl font-black text-green-600 text-center mb-4 sm:mb-6">
            🎪 Bạn Bè Động Vật 🎪
          </h3>
          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-8 flex-wrap">
            {["🐄", "🐷", "🐑", "🐔", "🐰", "🦆", "🐴"].map((animal, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-3xl sm:text-4xl md:text-6xl cursor-pointer hover:scale-125 transition-transform touch-manipulation"
              >
                {animal}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-4 left-4 sm:top-10 sm:left-10 text-4xl sm:text-6xl animate-bounce">
            ☀️
          </div>
          <div className="absolute top-8 right-8 sm:top-20 sm:right-20 text-2xl sm:text-4xl animate-pulse">
            ☁️
          </div>
          <div className="absolute bottom-8 left-8 sm:bottom-20 sm:left-20 text-3xl sm:text-5xl animate-bounce delay-300">
            🌸
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 text-2xl sm:text-4xl animate-pulse delay-500">
            🦋
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmAdventure;
