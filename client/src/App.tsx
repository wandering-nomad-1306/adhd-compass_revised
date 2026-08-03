import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Welcome from "./pages/chapters/Welcome";
import WhyItFeelsLikeThis from "./pages/chapters/WhyItFeelsLikeThis";
import MeetYourBrain from "./pages/chapters/MeetYourBrain";
import WhatIsADHD from "./pages/chapters/WhatIsADHD";
import WhatHelps from "./pages/chapters/WhatHelps";
import Medication from "./pages/chapters/Medication";
import InProgress from "./pages/chapters/InProgress";

function RouteScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/chapter/welcome"} component={Welcome} />
      <Route path={"/chapter/why-feels"} component={WhyItFeelsLikeThis} />
      <Route path={"/chapter/brain"} component={MeetYourBrain} />
      <Route path={"/chapter/what-is"} component={WhatIsADHD} />
      <Route path={"/chapter/what-helps"} component={WhatHelps} />
      <Route path={"/chapter/medication"} component={Medication} />
      <Route path={"/chapter/getting-diagnosed"}>
        <InProgress
          title="Getting Diagnosed"
          chapterNumber={9}
          previousPath="/chapter/medication"
          nextPath="/chapter/accommodations"
        />
      </Route>
      <Route path={"/chapter/accommodations"}>
        <InProgress
          title="Accommodations"
          chapterNumber={10}
          previousPath="/chapter/getting-diagnosed"
        />
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <RouteScrollRestoration />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
