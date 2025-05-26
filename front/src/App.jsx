import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from './components/header/PageHeader';
import About from "./pages/About/About";
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import TicketRegistration from './pages/TicketRegistration/TicketRegistration';
import ProtectedRoute from "./routes/ProtectedRoute";
import RecoveryEmail from "./pages/ChangePassword/RecoveryEmail";
import ResetPassword from "./pages/ChangePassword/ResetPassword";
import AccessDenied from "./pages/AccessDenied/AccessDenied";
import UserTickets from "./pages/UserTickets/UserTickets";
import AllTickets from "./pages/AllTickets/AllTickets";
import PrioritiseTickets from "./pages/PrioritiseTicket/PrioritiseTicket";

function App() {
  return (
    <>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recovery" element={<RecoveryEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/accessDenied" element={<AccessDenied />} />

        <Route
          path="/ticketRegistration"
          element={
            <ProtectedRoute>
              <TicketRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userTickets"
          element={
            <ProtectedRoute>
              <UserTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allTickets"
          element={
            <ProtectedRoute>
              <AllTickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prioritiseTickets"
          element={
            <ProtectedRoute>
              <PrioritiseTickets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;