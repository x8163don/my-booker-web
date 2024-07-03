import './App.css';
import {RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {router} from "./Router";
import {queryClient} from "./api";


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App;
