"use client";
import { useState, useEffect, useMemo, useCallback, Suspense, lazy } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Dynamic imports with explicit SSR:false for client-only components
const Search = dynamic(() => import("lucide-react").then(mod => mod.Search), {
  loading: () => <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />,
  ssr: false
});

const StoryCard = dynamic(() => import("./Storycard"), {
  loading: () => <div className="h-80 bg-gray-100 rounded-lg animate-pulse" />,
  ssr: false
});

// Static imports for critical icons
import {
  HomeIcon,
  FileIcon,
  UserIcon,
  TaskIcon,
  WebIcon,
  AnalyticsIcon,
  MediaIcon,
  NotificationIcon,
  SubscriptionIcon,
  SettingsIcon,
  HeadphoneIcon,
  CalendarIcon,
  DescendingLinesIcon,
  Customize,
  ChevronDownIcon,
} from "./Font";

// Static data outside component to prevent re-creation on renders
const stories = [
  {
    id: 1,
    title: "How 7 lines code turned into $36 Billion Empire",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "published",
    image:
      "https://storage.googleapis.com/moviebucket4/d146146865a8273af2cbbc88616b1353aee1e51d.jpg",
  },
  {
    id: 2,
    title: "Chez pierre restaurant in Monte Carlo by Vudafieri",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Created",
    image:
      "https://storage.googleapis.com/moviebucket4/946088e41fcf6ae1c41573d1edb5f8df03f55286.jpg",
  },
  {
    id: 3,
    title: "Teknion wins Gold at 2022 International Design Awards",
    category: "Fashion",
    date: "20 Sep 2022",
    status: "draft",
    image:
      "https://storage.googleapis.com/moviebucket4/76f2c230759217edfe5f1a091005f8427421914b.jpg",
  },
  {
    id: 4,
    title: "How 7 lines code turned into $36 Billion Empire",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "published",
    image:
      "https://storage.googleapis.com/moviebucket4/8961e90a522b89a6e06ce18044367a842aca9275.jpg",
  },
  {
    id: 5,
    title: "How 7 lines code turned into $36 Billion Empire",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "published",
    image:
      "https://storage.googleapis.com/moviebucket4/50055e068d3e793d787c742e2bf6bd084b39469f.jpg",
  },
  {
    id: 6,
    title: "Chez pierre restaurant in Monte Carlo by Vudafieri",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    image:
      "https://storage.googleapis.com/moviebucket4/e7f0d0f053fb3c59a997fb80d8b633a9081c0d9e.jpg",
  },
  {
    id: 7,
    title: "Teknion wins Gold at 2022 International Design Awards",
    category: "Fashion",
    date: "20 Sep 2022",
    status: "published",
    image:
      "https://storage.googleapis.com/moviebucket4/e6f2d69706f0253506c9330c8d41d69a81543c7c.jpg",
  },
  {
    id: 8,
    title: "How 7 lines code turned into $36 Billion Empire",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "published",
    image:
      "https://storage.googleapis.com/moviebucket4/50055e068d3e793d787c742e2bf6bd084b39469f.jpg",
  },
];

// Tab configuration outside component
const tabs = [
  { id: "all", label: "All", count: 4500 },
  { id: "draft", label: "Draft", count: 1200 },
  { id: "pending", label: "Pending", count: 190 },
  { id: "published", label: "Published", count: 2432 },
  { id: "archived", label: "Archived", count: 520 },
];

// Navigation items outside component
const navItems = [
  { id: "Dashboard", icon: HomeIcon, label: "Dashboard" },
  { id: "Content", icon: FileIcon, label: "Content" },
  { id: "User", icon: TaskIcon, label: "User" },
  { id: "Task", icon: UserIcon, label: "Task" },
  { id: "Customize", icon: Customize, label: "Customize" },
  { id: "App/Web", icon: WebIcon, label: "App/Web" },
  { id: "Analytics", icon: AnalyticsIcon, label: "Analytics" },
  { id: "Media", icon: MediaIcon, label: "Media" },
  { id: "Notifications", icon: NotificationIcon, label: "Notifications" },
  { id: "Subscription", icon: SubscriptionIcon, label: "Subscription" },
  { id: "Settings", icon: SettingsIcon, label: "Settings" },
];

// Create reusable UI components
const SidebarButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
      active
        ? "bg-blue-900 text-white"
        : "text-gray-600 hover:bg-violet-50 hover:text-violet-800"
    }`}
    aria-current={active ? "page" : undefined}
  >
    <span className="w-5 h-5 flex items-center justify-center">
      <Icon
        className={`${
          active ? "text-white" : "text-gray-600"
        } transition-all duration-300 hover:scale-125`}
      />
    </span>
    {label && (
      <span className="truncate transition-opacity duration-200">
        {label}
      </span>
    )}
  </button>
);

const TabButton = ({ active, id, label, count, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
      active
        ? "bg-blue-900 text-white"
        : "border-transparent text-gray-900 hover:border-gray-300 hover:text-gray-700"
    }`}
    aria-label={`Show ${label} stories`}
  >
    {label} ({count.toLocaleString()})
  </button>
);

export default function StoriesDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Optimized resize handler with debounce using requestAnimationFrame
  useEffect(() => {
    let frameId;
    const handleResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (mobile !== isMobile) {
          if (!mobile) setSidebarOpen(true);
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);
  
  const handleNavClick = useCallback((id) => {
    setActiveNav(id);
    if (isMobile) toggleSidebar();
  }, [isMobile, toggleSidebar]);

  // Memoized user profile section
  const UserProfile = useMemo(() => (
    <div className="ml-auto hidden lg:flex items-center border rounded-lg px-3 py-1.5 bg-white shadow-sm gap-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <Image
          src="https://storage.googleapis.com/moviebucket4/a66e3c587b925507a17595d38b9654c3a4847f76.png"
          alt="User profile"
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover shrink-0 transition-transform hover:scale-110"
          priority
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
        />
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs text-gray-500">Welcome back</span>
          <span className="text-base font-medium text-gray-500">
            Akshita Patel
          </span>
        </div>
      </div>
      <div className="ml-9">
        <ChevronDownIcon className="w-4 h-4 text-gray-500 transition-transform hover:rotate-180" />
      </div>
    </div>
  ), []);

  // Pre-computed class strings
  const sidebarClasses = `fixed inset-y-0 left-0 z-40 border-r bg-white transition-all duration-200 ${
    sidebarOpen ? "w-[200px]" : "w-20 -translate-x-full lg:translate-x-0"
  }`;
  
  const mainContentClasses = `flex flex-col min-h-screen bg-gray-50 transition-all duration-200 ${
    sidebarOpen ? "lg:ml-[200px]" : "lg:ml-20"
  }`;

  return (
    <>
      <Head>
        <title>Stories Dashboard</title>
        <meta name="description" content="Manage your stories dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Resource hints */}
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        <link 
          rel="preload" 
          href="https://storage.googleapis.com/moviebucket4/a66e3c587b925507a17595d38b9654c3a4847f76.png" 
          as="image"
          fetchpriority="high"
        />
      </Head>

      {/* Mobile overlay - conditionally rendered to reduce DOM nodes */}
      {sidebarOpen && isMobile && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar component */}
      <aside className={sidebarClasses}>
        {/* Sidebar content */}
        <div className="flex h-16 items-center justify-between px-4">
          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6 lg:hidden transition-transform hover:rotate-90" />
              <ChevronLeft className="hidden h-6 w-6 lg:block transition-transform hover:-translate-x-1" />
            </button>
          )}
        </div>

        {navItems.map(({ id, icon, label }) => (
          <SidebarButton
            key={id}
            active={activeNav === id}
            icon={icon}
            label={sidebarOpen ? label : null}
            onClick={() => handleNavClick(id)}
          />
        ))}

        {/* Support section */}
        <div className="border-t p-4">
          <button 
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-xs text-black font-medium hover:bg-blue-100 transition-colors group"
            aria-label="Contact support"
          >
            <HeadphoneIcon className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600" />
            {sidebarOpen && (
              <span className="transition-opacity duration-200">
                Contact Support
              </span>
            )}
          </button>
        </div>

        {/* Sidebar toggle - only render when needed */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border bg-white p-1 shadow-md hover:bg-gray-50 lg:block transition-transform hover:translate-x-1"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 transition-transform hover:scale-125" />
          </button>
        )}
      </aside>

      {/* Main content */}
      <div className={mainContentClasses}>
        <header className="sticky top-0 z-20 flex items-center gap-3 border border-gray-200 bg-white px-4 py-2 shadow-sm lg:shadow-none rounded-md">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 lg:hidden transition-transform hover:scale-110"
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Return home"
            prefetch={false}
          >
            <ArrowLeft className="h-5 w-5 transition-transform hover:-translate-x-1" />
            <span className="font-medium">Stories</span>
          </Link>

          {UserProfile}
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Search and actions */}
          <div className="mb-4 flex flex-col gap-2 rounded-md border border-gray-200 bg-white py-2 px-3 shadow-sm md:flex-row md:items-center md:justify-end">
            <div className="relative w-full md:w-1/2 lg:w-1/3 mr-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 transition-transform duration-300 hover:scale-125"
              />
              <input
                placeholder="Search"
                className="w-full rounded-md border text-black px-6 py-1.5 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                aria-label="Search stories"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-2 mr-6">
                <button 
                  className="rounded-md bg-gray-100 p-1.5 hover:bg-gray-200 transition-all"
                  aria-label="Calendar"
                >
                  <CalendarIcon className="text-indigo-900 transition-transform duration-300 hover:scale-125" />
                </button>
                <button 
                  className="rounded-md bg-gray-100 p-1.5 hover:bg-gray-200 transition-all"
                  aria-label="Sort"
                >
                  <DescendingLinesIcon className="text-indigo-900 transition-transform duration-300 hover:scale-125" />
                </button>
              </div>
              <button 
                className="whitespace-nowrap rounded-md bg-blue-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800 transition-all hover:-translate-y-0.5"
                aria-label="Add new story"
              >
                Add New Story
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4 overflow-x-auto border-b">
            <nav className="flex whitespace-nowrap">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  id={tab.id}
                  label={tab.label}
                  count={tab.count}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>
          </div>

          {/* Stories grid with virtualization for better performance */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {stories.map((story) => (
              <Suspense 
                key={story.id} 
                fallback={<div className="h-80 bg-gray-100 rounded-lg animate-pulse" />}
              >
                <StoryCard story={story} />
              </Suspense>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}