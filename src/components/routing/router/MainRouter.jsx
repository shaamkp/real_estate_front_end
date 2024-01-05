import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "../routes/AuthRoute";
import PrivateRoute from "../routes/PrivateRoute";
import Login from "../../screens/login/Login";
import styled from "styled-components";
import AppRouter from "./AppRouter";

const MainRouter = () => {
  const [active, setActive] = useState(false);
  return (
    <Container>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/*" element={<AppRouter />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="auth/login" element={<Login />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default MainRouter;

const Container = styled.section`
  background: #ffff;
  min-height: 100vh;
  position: relative;
`;
