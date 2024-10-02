import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/ui/theme-provider"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from './pages/dashboard'
import Prompts from './pages/tablesPages/prompts'
import LayoutVisitant from './components/layout/visitant'
import LayoutClient  from './components/layout/client'
import QuickResponses from './pages/tablesPages/quick-responses'
import Tags from './pages/tablesPages/tags'
import { ToastProvider } from './components/ui/toast'
import Payments from './pages/tablesPages/finance'
import Users from './pages/tablesPages/users'
import QueueChatbot from './pages/tablesPages/queue-chatbot'
import NotFound from './pages/notFound'

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastProvider>
          <Routes>
            {/* Rotas para visitantes */}
            <Route element={<LayoutVisitant />}>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
            </Route>

            {/* Rotas para clientes logados */}
            <Route element={<LayoutClient />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/quickresponses" element={<QuickResponses />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/users" element={<Users />} />
              <Route path="/queue" element={<QueueChatbot />} />
            </Route>

            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </ToastProvider>

      </ThemeProvider>
    </Router>
  )
}

export default App
