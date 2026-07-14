import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shows from './pages/Shows'
import ShowDetail from './pages/ShowDetail'
import WhoWeAre from './pages/WhoWeAre'
import Contact from './pages/Contact'
import Rent from './pages/Rent'
import Support from './pages/Support'
import Community from './pages/Community'
import Jobs from './pages/Jobs'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes — no site layout */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/shows/:slug" element={<ShowDetail />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/community" element={<Community />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/support" element={<Navigate to="/support/donate" replace />} />
          <Route path="/support/:page" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
