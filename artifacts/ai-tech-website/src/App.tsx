import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisProvider } from "@/components/LenisProvider";

import Home from "./pages/Home";
import About from "./pages/About";
import CareCliq from "./pages/CareCliq";
import HowWeBuild from "./pages/HowWeBuild";
import Vision from "./pages/Vision";
import Contact from "./pages/Contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/carecliq" component={CareCliq} />
      <Route path="/how-we-build" component={HowWeBuild} />
      <Route path="/vision" component={Vision} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LenisProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LenisProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
