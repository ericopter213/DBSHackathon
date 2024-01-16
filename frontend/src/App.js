// Import necessary modules from React and React Router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				<Route path="/create" element={<Create />} />
				<Route path="/read" element={<Read />} />
				<Route path="/update" element={<Update />} />
				<Route path="/delete" element={<Delete />} />
			</Routes>
		</Router>
	);
}

export default App;
