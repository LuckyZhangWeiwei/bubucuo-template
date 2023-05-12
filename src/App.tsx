
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import RequireAuth from "./components/RequireAuth";

import "./App.css";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RequireAuth />}>
                <Route index element={<EditPage />} />
                <Route path="list" element={<ListPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
