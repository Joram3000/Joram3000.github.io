import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ContactPage from "./pages/contact-page";
import AboutPage from "./pages/about-page";
import PatternMakerPage from "./pages/patternmaker-page";
import VideoPlayer from "./pages/valkdigital-page/videoplayer/Videoplayer";
import BeatBattleHomePage from "./pages/beatbattle-page/index";
import TestPage from "./pages/test-page";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createTheme, MantineProvider } from "@mantine/core";
import { ParallaxProvider } from "react-scroll-parallax";
import ContestPage from "./pages/beatbattle-page/ContestPage";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import ValkWorkIn from "./pages/valkdigital-page/ValkWorkIn";
import ValkWorkItem from "./pages/valkdigital-page/ValkWorkItem";

const router = createHashRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/*", element: <HomePage /> },
      { path: "/patternmaker", element: <PatternMakerPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/test", element: <TestPage count={32} speed={8} /> },
      { path: "/beatbattle", element: <BeatBattleHomePage /> },
      { path: "/beatbattle/:id", element: <ContestPage /> },
      { path: "/valkdigital", element: <ValkWorkIn /> },
      { path: "/valkdigital/:id", element: <ValkWorkItem /> },
      { path: "/valkdigital/narrowcasting", element: <VideoPlayer /> },
    ],
  },
]);

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Provider store={store}>
        <ParallaxProvider>
          <RouterProvider router={router} />
        </ParallaxProvider>
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
