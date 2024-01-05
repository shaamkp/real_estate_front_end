import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../screens/home/Home";
import TenetListScreen from "../../screens/tenant/TenetListScreen";
import TenantSingle from "../../screens/tenant/TenantSingle";
import HomeSingle from "../../screens/home/HomeSingle";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path=":id" element={<HomeSingle />} />
        </Route>
        <Route path="tenant">
          <Route path="" element={<TenetListScreen />} />
          <Route path=":id" element={<TenantSingle />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
