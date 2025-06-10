'use client'

import { Zap, Crown, Check, Star, Gift, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const UpgradePage = () => {
  const plans = [
    {
      name: 'Premium',
      price: '$4.99',
      period: 'month',
      features: [
        'Custom bot prefix',
        'Priority support',
        'Premium badge',
        'Advanced analytics'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      features: [
        'All Premium features',
        'Custom commands',
        'Unlimited music queue',
        'Early access to features',
        'VIP support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$19.99',
      period: 'month',
      features: [
        'All Pro features',
        'Dedicated bot instance',
        'Custom integrations',
        '24/7 support',
        'Team management'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Zap className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Upgrade
          </span>
        </h1>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col pt-4 md:pt-0">
        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full mb-4">
                <Zap className="w-5 h-5 mr-2" />
                <span>Premium Plans</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">Upgrade Your Experience</h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Unlock powerful features and support the development of our bot
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-xl p-6 border transition-all ${
                    plan.popular
                      ? 'border-indigo-500/50 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg shadow-indigo-500/10'
                      : 'border-gray-800 bg-gray-900'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-4 py-1 rounded-full text-xs font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      {plan.name === 'Pro' && <Crown className="w-6 h-6 text-yellow-400" />}
                      {plan.name}
                    </h3>
                    {plan.name === 'Enterprise' && (
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Secure
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-1">{plan.price}</div>
                    <div className="text-gray-500">per {plan.period}</div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    Get {plan.name}
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Gift className="w-10 h-10 text-indigo-400" />
                  <div>
                    <h3 className="text-xl font-bold">Gift a Subscription</h3>
                    <p className="text-gray-500">Surprise someone with premium features</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all">
                  Gift Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradePage