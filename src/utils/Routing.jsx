import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import CardDetail from "../Components/CardDetail";
import Create from "../Components/Create";
import Edit from "../Components/Edit";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/details/:id" element={<CardDetail />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default Routing;
