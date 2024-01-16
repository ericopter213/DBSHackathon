import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

import Homepage from "./views/homepage";
import Login from "./views/login";
import Signup from "./views/signup";

import Create from "./views/crud/create";
import Read from "./views/crud/read";
import Update from "./views/crud/update";
import Delete from "./views/crud/delete";

function App() {
	const [isAuthenticated, setAuthenticated] = useState(false);

	const loginHandler = () => {
		setAuthenticated(true);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/create" element={<Create />} />
				<ProtectedRoute
					path="/create"
					component={Create}
					isAuthenticated={isAuthenticated}
					requiredRole="admin"
				/>
				<ProtectedRoute
					path="/read"
					component={Read}
					isAuthenticated={isAuthenticated}
					requiredRole="admin"
				/>
				<ProtectedRoute
					path="/update"
					component={Update}
					isAuthenticated={isAuthenticated}
					requiredRole="admin"
				/>
				<ProtectedRoute
					path="/delete"
					component={Delete}
					isAuthenticated={isAuthenticated}
					requiredRole="admin"
				/>
			</Routes>
		</Router>
	);
}

export default App;
