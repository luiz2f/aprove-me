import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import AppLayout from "./ui/AppLayout";
import Payables from "./features/payable/Payables";
import Assignors from "./features/assignor/Assignors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound";
import { AuthProvider } from "./features/authentication/authProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});
function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="recebiveis" />} />
              <Route path="recebiveis" element={<Payables />} />
              <Route path="cedentes" element={<Assignors />} />
            </Route>

            <Route path="login" element={<LoginSignup />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
