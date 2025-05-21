"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, RefreshCw } from "lucide-react"
import { getRandomQuote, type QuoteData } from "./actions"

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  // Function to fetch a random quote using the server action
  const fetchRandomQuote = async () => {
    setIsLoading(true)

    try {
      const result = await getRandomQuote()

      if (result.quote) {
        setQuote(result.quote)
        // Check if we're using a fallback quote (they have IDs starting with "fallback-")
        setIsUsingFallback(result.quote._id.startsWith("fallback-"))
      }
    } catch (err) {
      console.error("Error in client:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchRandomQuote()
  }, [])

  // Generate a placeholder image URL based on the author's name
  const getAuthorImageUrl = (author: string) => {
    // Encode the author name for use in URL
    const encodedName = encodeURIComponent(author)
    // Return a placeholder image with the author's name
    return `https://ui-avatars.com/api/?name=${encodedName}&size=400&background=random`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Random Quote Generator</h1>
        <p className="text-slate-600">Discover inspiring quotes from notable public figures</p>
      </div>

      <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative h-64 md:h-full min-h-[300px] bg-slate-200 animate-pulse"></div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="space-y-4">
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 ml-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : quote ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative h-64 md:h-full min-h-[300px] bg-slate-200">
                <Image
                  src={getAuthorImageUrl(quote.author) || "/placeholder.svg"}
                  alt={quote.author}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-xl md:text-2xl font-serif italic mb-6">{quote.content}</p>
                  <p className="text-right font-semibold text-lg">— {quote.author}</p>
                </div>
                <Button onClick={fetchRandomQuote} className="mt-4 w-full" disabled={isLoading}>
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Generate New Quote
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p>No quote available. Please try again.</p>
              <Button onClick={fetchRandomQuote} className="mt-4">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        {isUsingFallback ? (
          <p>Using local quotes database (API connection unavailable)</p>
        ) : (
          <p>
            Quotes provided by{" "}
            <a
              href="https://github.com/lukePeavey/quotable"
              className="underline hover:text-slate-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quotable API
            </a>
          </p>
        )}
      </footer>
    </div>
  )
}
