"use server"

import { fallbackQuotes } from "./data/fallback-quotes"

// Define the quote type
export interface QuoteData {
  _id: string
  content: string
  author: string
  tags: string[]
}

// Server action to fetch a random quote
export async function getRandomQuote(): Promise<{ quote: QuoteData | null; error: string | null }> {
  try {
    // Try to fetch from the API with a timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch("https://api.quotable.io/random", {
      cache: "no-store",
      signal: controller.signal,
    }).catch((err) => {
      console.log("Fetch error:", err.message)
      return null
    })

    clearTimeout(timeoutId)

    // If the fetch failed or returned an error status, use a fallback quote
    if (!response || !response.ok) {
      console.log("API fetch failed, using fallback quotes")
      return getRandomFallbackQuote()
    }

    const data = await response.json()
    return { quote: data, error: null }
  } catch (err) {
    console.error("Error in getRandomQuote:", err)
    // If any error occurs, use a fallback quote
    return getRandomFallbackQuote()
  }
}

// Function to get a random quote from our fallback data
function getRandomFallbackQuote(): { quote: QuoteData; error: null } {
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length)
  return {
    quote: fallbackQuotes[randomIndex],
    error: null,
  }
}
