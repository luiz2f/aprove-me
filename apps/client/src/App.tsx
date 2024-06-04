import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginSignup from "./features/authentication/LoginSignup";
import AppLayout from "./ui/AppLayout";
import Payables from "./features/payable/Payables";
import Assignors from "./features/assignor/Assignors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound";
import EditPayable from "./features/payable/EditPayable";
import { Toaster } from "react-hot-toast";
import EditAssignor from "./features/assignor/EditAssignor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});

function App() {
  return (
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
            <Route path="recebiveis" element={<Payables />}>
              <Route path=":id" element={<EditPayable />}></Route>
            </Route>
            <Route path="cedentes" element={<Assignors />}>
              <Route path=":id" element={<EditAssignor />}></Route>
            </Route>
          </Route>

          <Route path="login" element={<LoginSignup />}></Route>
          <Route path="signup" element={<LoginSignup />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#F8FAFC",
            color: "#333",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
