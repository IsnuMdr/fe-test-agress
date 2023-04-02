import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";
import UpdateProductPage from "./pages/UpdateProductPage";
import PrivateRoute from "./components/PrivateRoute";
import { getUserLoggedIn } from "./features/auth/authSlice";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLoggedIn());
  }, [dispatch]);

  return (
    <>
      {location.pathname !== "/login" ? (
        <>
          <Sidebar />
          <div className="relative md:ml-64">
            <AdminNavbar />
            <div className="px-4 md:px-10 mx-auto w-full">
              <div className="relative pt-12">
                <Routes>
                  <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route
                      path="/update-product/:id"
                      element={<UpdateProductPage />}
                    />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
