import "@sass/main.css";
import { lazy, Suspense } from 'react';

import LoadingPage from "@pages/Loading";
const HomePage = lazy(() => import('@pages/Home'));
const WeatherPage = lazy(() => import('@pages/Weather'));

import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom";

function App() {
	
  return (
    <Suspense fallback={<LoadingPage/>}>
      <RouterProvider router={
        createBrowserRouter([
          {
            path: "/",
            element: <HomePage/>,
          },
          {
            path: "/weather",
            element: <WeatherPage/>,
          },
          {
            path: "*",
            element: <>Not found.</>,
          }
        ])
      }/> 
    </Suspense>
  );
}

export default App;