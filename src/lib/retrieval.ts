import type { RetrievedChunk, SourceChunk } from '../types'

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'to', 'of', 'in', 'on', 'for', 'with', 'as', 'by', 'at',
  'it', 'its', 'this', 'that', 'these', 'those', 'my', 'i', 'me', 'my',
  'do', 'does', 'did', 'have', 'has', 'had', 'not', 'no', 'so', 'if', 'can',
  'will', 'would', 'should', 'could', 'about', 'into', 'than', 'then',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token))
}

function termFrequencies(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>()
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1)
  }
  return freq
}

class TfIdfIndex {
  private chunks: SourceChunk[]
  private docFrequency = new Map<string, number>()
  private docVectors: Map<string, number>[] = []
  private idf = new Map<string, number>()

  constructor(chunks: SourceChunk[]) {
    this.chunks = chunks
    const tokenSets = chunks.map((chunk) => tokenize(chunk.text))

    for (const tokens of tokenSets) {
      const seen = new Set(tokens)
      for (const term of seen) {
        this.docFrequency.set(term, (this.docFrequency.get(term) ?? 0) + 1)
      }
    }

    const n = chunks.length
    for (const [term, df] of this.docFrequency) {
      this.idf.set(term, Math.log((n + 1) / (df + 0.5)) + 1)
    }

    this.docVectors = tokenSets.map((tokens) => this.vectorize(tokens))
  }

  private vectorize(tokens: string[]): Map<string, number> {
    const tf = termFrequencies(tokens)
    const vector = new Map<string, number>()
    for (const [term, count] of tf) {
      const idf = this.idf.get(term) ?? Math.log(this.chunks.length + 1) + 1
      vector.set(term, count * idf)
    }
    return vector
  }

  private cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
    let dot = 0
    let normA = 0
    let normB = 0
    for (const value of a.values()) normA += value * value
    for (const value of b.values()) normB += value * value
    const [smaller, larger] = a.size < b.size ? [a, b] : [b, a]
    for (const [term, value] of smaller) {
      const other = larger.get(term)
      if (other) dot += value * other
    }
    if (normA === 0 || normB === 0) return 0
    return dot / (Math.sqrt(normA) * Math.sqrt(normB))
  }

  search(query: string, topK: number): RetrievedChunk[] {
    const queryTokens = tokenize(query)
    if (queryTokens.length === 0) return []
    const queryVector = this.vectorize(queryTokens)

    return this.chunks
      .map((chunk, index) => ({
        ...chunk,
        score: this.cosineSimilarity(queryVector, this.docVectors[index]),
      }))
      .filter((result) => result.score > 0.01)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
  }
}

export function buildRetrievalIndex(chunks: SourceChunk[]) {
  return new TfIdfIndex(chunks)
}

export type { TfIdfIndex }
