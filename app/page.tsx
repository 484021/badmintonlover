'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
            🏸 Beginner's Guide 2025
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect <span className="text-indigo-600">Badminton Racket for Beginners</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-4 max-w-3xl mx-auto">
            Expert reviews, buying guides, and exclusive deals on the best badminton rackets for beginners
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join 1,000+ beginners who found their ideal racket and saved money with our weekly deals
          </p>
        </div>

        {/* Main CTA Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                📧 Join 1,000+ Beginner Players
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Our Free Beginner's Racket Buying Guide
              </h2>
              <p className="text-gray-600 text-lg">
                Plus exclusive deals on top-rated badminton rackets for beginners, delivered weekly
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                required
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl transition shadow-lg hover:shadow-xl"
              >
                Subscribe for Free
              </button>

              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl">
                  ✅ Success! Check your email to confirm your subscription.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                  ❌ Please enter a valid email address
                </div>
              )}
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Perfect for Beginners Like You
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🏸</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Racket Recommendations</h4>
              <p className="text-gray-600">
                Best beginner rackets under $50, $100, and $150 reviewed by experts
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">💰</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Exclusive Beginner Deals</h4>
              <p className="text-gray-600">
                Save 30-50% on quality starter rackets and complete beginner sets
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">📚</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Buying Guides</h4>
              <p className="text-gray-600">
                Learn about racket weight, balance, grip size, and string tension
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Beginner Tips</h4>
              <p className="text-gray-600">
                Basic techniques, training drills, and equipment care for new players
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-3xl p-10 text-center mb-16">
          <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
          <blockquote className="text-xl md:text-2xl font-medium mb-4">
            "Found the perfect beginner racket thanks to their guide. Saved $80 and it's exactly what I needed to start!"
          </blockquote>
          <p className="text-indigo-200">- Mike Thompson, Beginner Player (Started 3 months ago)</p>
        </div>

        <footer className="text-center text-gray-500">
          <p className="mb-2">&copy; 2025 BadmintonLover. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-600 transition">Terms of Service</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
