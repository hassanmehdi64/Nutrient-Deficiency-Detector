import { useEffect, useState } from 'react'
import Home from './pages/Home'
import { analyzeCropImage, buildDetailedAnalysisMessage } from './api/analysisApi'
import { sendAgriBotMessage } from './api/chatApi'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const MIN_ANALYSIS_LOADING_MS = 1500
const MIN_CHAT_LOADING_MS = 1200

function App() {
  // ==================App-level state container=========
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [analysisSeconds, setAnalysisSeconds] = useState(0)
  const [chatSeconds, setChatSeconds] = useState(0)
  const [latestAnalysis, setLatestAnalysis] = useState(null)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Ask me about nutrient deficiency symptoms and treatment.' },
  ])

  // ========Upload handler with detailed API analysis=============
  const onFileSelect = async (file) => {
    const startedAt = Date.now()
    let analysis = null
    let uploadError = ''
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setError('')
    setPreviewUrl(URL.createObjectURL(file))
    setAnalysisLoading(true)
    setChatLoading(true)
    setResult(null)

    try {
      analysis = await analyzeCropImage(file)
    } catch (apiError) {
      uploadError = apiError.message || 'Failed to analyze image.'
    } finally {
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_ANALYSIS_LOADING_MS) {
        await sleep(MIN_ANALYSIS_LOADING_MS - elapsed)
      }
      if (analysis) {
        setResult(analysis)
        setLatestAnalysis(analysis.detailed)
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: buildDetailedAnalysisMessage(analysis.detailed) },
        ])
      } else if (uploadError) {
        setError(uploadError)
      }
      setAnalysisLoading(false)
      setChatLoading(false)
    }
  }

  // ===========Clears preview and result======================
  const onRemovePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl('')
    setResult(null)
    setLatestAnalysis(null)
    setError('')
  }

  // ========Receives upload validation errors==============
  const onUploadError = (message) => {
    setError(message)
  }

  // =========Chat handler with API response==============
  const onSend = async (text) => {
    const startedAt = Date.now()
    let reply = ''
    let chatError = ''
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setChatLoading(true)

    try {
      reply = await sendAgriBotMessage({ message: text, analysis: latestAnalysis })
    } catch (apiError) {
      chatError = apiError.message || 'Unable to process your request right now.'
    } finally {
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_CHAT_LOADING_MS) {
        await sleep(MIN_CHAT_LOADING_MS - elapsed)
      }
      if (reply) {
        setMessages((prev) => [...prev, { role: 'bot', text: reply }])
      } else if (chatError) {
        setMessages((prev) => [...prev, { role: 'bot', text: chatError }])
      }
      setChatLoading(false)
    }
  }

  // =========Cleanup object URL on unmount/change===============
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  useEffect(() => {
    if (!analysisLoading) {
      setAnalysisSeconds(0)
      return
    }

    const timerId = setInterval(() => {
      setAnalysisSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [analysisLoading])

  useEffect(() => {
    if (!chatLoading) {
      setChatSeconds(0)
      return
    }

    const timerId = setInterval(() => {
      setChatSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [chatLoading])

  return (
    <Home
      previewUrl={previewUrl}
      error={error}
      result={result}
      analysisLoading={analysisLoading}
      analysisSeconds={analysisSeconds}
      chatLoading={chatLoading}
      chatSeconds={chatSeconds}
      messages={messages}
      onFileSelect={onFileSelect}
      onUploadError={onUploadError}
      onRemovePreview={onRemovePreview}
      onSend={onSend}
    />
  )
}

export default App
