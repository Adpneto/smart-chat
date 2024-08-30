import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/ui/theme-provider"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from './pages/dashboard'
import Prompts from './pages/tablesPages/prompts'
import { LayoutVisitant } from './components/layout/visitant'
import { LayoutClient } from './components/layout/client'
import QuickResponses from './pages/tablesPages/quick-responses'
import Tags from './pages/tablesPages/tags'
import { ToastProvider } from './components/ui/toast'
import Payments from './pages/tablesPages/finance'
import Users from './pages/tablesPages/users'
import QueueChatbot from './pages/tablesPages/queue-chatbot'

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastProvider>
          <Routes>
            {/* Visitante não logado */}
            <Route path="/register" element={<LayoutVisitant><Register /></LayoutVisitant>} />
            <Route path="/login" element={<LayoutVisitant><Login /></LayoutVisitant>} />
            {/* Cliente Logado */}
            <Route path="/dashboard" element={<LayoutClient><Dashboard /></LayoutClient>} />
            {/* Tables/Lists */}
            <Route path="/prompts" element={<LayoutClient><Prompts /></LayoutClient>} />
            <Route path="/quickresponses" element={<LayoutClient><QuickResponses/></LayoutClient>} />
            <Route path="/tags" element={<LayoutClient><Tags/></LayoutClient>} />
            <Route path="/payments" element={<LayoutClient><Payments/></LayoutClient>} />
            <Route path="/users" element={<LayoutClient><Users/></LayoutClient>} />
            <Route path="/queue" element={<LayoutClient><QueueChatbot/></LayoutClient>} />
          </Routes>
        </ToastProvider>

      </ThemeProvider>
    </Router>
  )
}

export default App
