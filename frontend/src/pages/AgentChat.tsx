import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, User, Loader2 } from 'lucide-react'
import { api } from '../api'

export default function AgentChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)
    try {
      const data = await api.agentChat(text)
      const responseText = data?.response || data?.message || data?.answer || JSON.stringify(data)
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong connecting to the assistant.' }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 flex flex-col h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">AI Assistant</h1>
        <p className="text-gray-400">Ask anything about courses, careers, projects, or the community.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-card border border-border rounded-bl-md'
              }`}
            >
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-card border border-border">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="border border-border rounded-xl bg-card p-2 flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type your message..."
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-foreground placeholder:text-gray-500"
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="p-2 rounded-lg bg-primary text-white disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
