"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, RefreshCw } from "lucide-react"

// Sample data of quotes and public figures
const quotes = [
  {
    id: 1,
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 7,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 8,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isLoading, setIsLoading] = useState(false)

  const generateRandomQuote = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Random Quote Generator</h1>
        <p className="text-slate-600">Discover inspiring quotes from notable public figures</p>
      </div>

      <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative h-64 md:h-full min-h-[300px] bg-slate-200">
              <Image
                src={currentQuote.image || "/placeholder.svg"}
                alt={currentQuote.author}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="mb-4">
                <Quote className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-xl md:text-2xl font-serif italic mb-6">{currentQuote.text}</p>
                <p className="text-right font-semibold text-lg">— {currentQuote.author}</p>
              </div>
              <Button onClick={generateRandomQuote} className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Generate New Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>Click the button to generate a new random quote from a public figure.</p>
      </footer>
    </div>
  )
}
