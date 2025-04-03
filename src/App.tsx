
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Dashboard from "./pages/Dashboard";
import VideoEditor from "./pages/VideoEditor";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProfileSettings from "./pages/ProfileSettings";
import MonetizationSettings from "./pages/MonetizationSettings";
import VideoDetails from "./pages/VideoDetails";
import SeriesManagement from "./pages/SeriesManagement";
import SeriesDetail from "./pages/SeriesDetail";
import MyVideos from "./pages/MyVideos";
import ChannelSettings from "./pages/ChannelSettings";
import { AuthProvider } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import { FloatingNotificationProvider } from "./components/ui/floating-notification-manager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RoleProvider>
        <ThemeProvider defaultTheme="light" storageKey="fluvid-theme">
          <TooltipProvider>
            <FloatingNotificationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="editor/:videoId?" element={<VideoEditor />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="monetization" element={<MonetizationSettings />} />
                    <Route path="video/:videoId" element={<VideoDetails />} />
                    <Route path="series" element={<SeriesManagement />} />
                    <Route path="series/:seriesId" element={<SeriesDetail />} />
                    <Route path="my-videos" element={<MyVideos />} />
                    <Route path="channel-settings" element={<ChannelSettings />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </FloatingNotificationProvider>
          </TooltipProvider>
        </ThemeProvider>
      </RoleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
