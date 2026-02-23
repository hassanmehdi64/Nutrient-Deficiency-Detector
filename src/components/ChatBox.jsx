import React, { useState } from 'react'
import { RiRobot2Line } from 'react-icons/ri'
import { FiUser } from 'react-icons/fi'

const ChatBox = ({ messages, onSend, loading, loadingSeconds = 0 }) => {
  // ===========input state================
  const [input, setInput] = useState('')

  // =======Sends current message to parent callback===========
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!input.trim()) return
    onSend?.(input)
    setInput('')
  }

  return (
    // ==========Chat wrapper=================
    <div className="space-y-3">
      {/* Message list */}
      <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex w-full items-start gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                message.role === 'user' ? 'bg-green-500 text-white flex' : 'bg-green-700 text-white'
              }`}
            >
              {message.role === 'user' ? <FiUser size={15} /> : <RiRobot2Line size={15} />}
            </div>
            <div
              className={`w-fit max-w-[85%] whitespace-pre-line break-words rounded-lg px-3 py-2 text-sm text-slate-800 shadow-sm ${
                message.role === 'user' ? 'bg-slate-200 text-right' : 'bg-white text-left'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {/* ========Bot typing indicator ==========*/}
        {loading ? (
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-700 text-white">
              <RiRobot2Line size={15} />
            </div>
            <div className="max-w-fit rounded-lg bg-white px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                <span className="ml-1 text-xs text-slate-500">Typing {loadingSeconds}s</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/*========= Message composer============== */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about nutrient deficiency..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatBox
