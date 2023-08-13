import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/404Page";
import AuthLayout from "./Layouts/AuthLayout";
import LogOut from "./pages/auth/LogOut";
import React, { Suspense } from "react";
import PageLoader from "./components/PageLoader";

const AppLayout = React.lazy(() => import("./Layouts/AppLayout"));

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <LogOut />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />} errorElement={<NotFound />} />
          <Route
            path="/auth"
            element={<AuthLayout />}
            errorElement={<NotFound />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
