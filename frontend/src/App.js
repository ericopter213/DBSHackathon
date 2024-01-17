import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

import Homepage from "./views/homepage";
import Login from "./views/login";
import Signup from "./views/signup";

import Create from "./views/crud/create";
import Read from "./views/crud/read";
import Update from "./views/crud/update";
import Delete from "./views/crud/delete";

function App() {
	return (
		<Router>
			<Routes>
				{/* landing page */}
				<Route index element={<Navigate to="/login" />} />

				<Route path="/homepage" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				{/* protected, need to login first */}
				<Route element={<ProtectedRoute />}>
					<Route path="/create" element={<Create />} />
					<Route path="/read" element={<Read />} />
					<Route path="/update" element={<Update />} />
					<Route path="/delete" element={<Delete />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
