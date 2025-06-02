'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, AlertTriangle, Zap, Compass, Globe, Cloud, Star, Moon } from 'lucide-react';

const NotFoundPage = () => {
  const router = useRouter();

  const floatingIcons = [
    { icon: <Zap size={24} />, x: 10, y: 20, delay: 0.1 },
    { icon: <Compass size={24} />, x: 80, y: 40, delay: 0.3 },
    { icon: <Globe size={24} />, x: 30, y: 70, delay: 0.5 },
    { icon: <Cloud size={24} />, x: 70, y: 80, delay: 0.7 },
    { icon: <Star size={24} />, x: 20, y: 50, delay: 0.9 },
    { icon: <Moon size={24} />, x: 85, y: 30, delay: 1.1 },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 overflow-hidden">
      {/* Floating animated icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: `${item.x}%`, y: `${item.y}%` }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [`${item.y}%`, `${item.y + 10}%`, `${item.y}%`],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay,
          }}
          className="absolute text-orange-500/30"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <AlertTriangle className="mx-auto text-orange-500" size={80} />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-white mb-4"
        >
          404 - Page Introuvable
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-blue-200 mb-8 max-w-md mx-auto"
        >
          Oups ! La page que vous cherchez semble s'être envolée.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            <Home size={20} />
            <span>Retour à l'accueil</span>
          </button>
        </motion.div>

        {/* Subtle animated background elements */}
        <motion.div
          className="absolute -z-10 w-64 h-64 rounded-full bg-orange-500/10 blur-xl top-1/4 left-1/4"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -z-10 w-96 h-96 rounded-full bg-blue-600/10 blur-xl bottom-1/4 right-1/4"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;