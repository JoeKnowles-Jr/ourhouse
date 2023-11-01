import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/user/AuthRoute";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import PasswordReset from "./pages/user/PasswordReset";
import Register from "./pages/user/Register";
import UpdatePassword from "./pages/user/UpdatePassword";
import TodoList from "./pages/TodoList";
import ShoppingLists from "./pages/ShoppingLists";
import Profile from "./pages/user/Profile";
import TodosProvider from "./context/TodoProvider";
import ShoppingListProvider from "./context/ShoppingListProvider";
import ShoppingListItemProvider from "./context/ShoppingListItemsProvider";
import OurCalendar from "./pages/OurCalendar";
import EventProvider from "./context/EventProvider";
import ProfileProvider from "./context/ProfileProvider";

const App = () => {
  return (
    <>
      <NavBar />
      <Container
        style={{ minWidth: "100vw", minHeight: "100vh", backgroundColor: "#999", width: "100%" }}>
        <div>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/todos"
                element={
                  <TodosProvider>
                    <TodoList />
                  </TodosProvider>
                }
              />
              <Route
                path="/lists"
                element={
                  <ShoppingListProvider>
                    <ShoppingListItemProvider>
                      <ShoppingLists />
                    </ShoppingListItemProvider>
                  </ShoppingListProvider>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProfileProvider>
                    <Profile />
                  </ProfileProvider>
                }
              />
              <Route path="/calendar" element={
                <EventProvider>
                  <OurCalendar />
                </EventProvider>
              } />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default App;



