import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AppLayout } from "./components/layout/AppLayout";

import LandingPage from "./pages/LandingPage";
import IdeaInputPage from "./pages/IdeaInputPage";
import LoadingPage from "./pages/LoadingPage";
import ReportPage from "./pages/ReportPage";
import PricingPage from "./pages/PricingPage";
import AccountPage from "./pages/AccountPage";

function App() {
  console.log("ENV CHECK:", import.meta.env.VITE_MAIN_REPORT_URL);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/idea" element={<IdeaInputPage />} />
            <Route path="/start" element={<IdeaInputPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/report/:id" element={<ReportPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
