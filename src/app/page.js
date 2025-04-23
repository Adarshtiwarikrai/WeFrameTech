"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  ArrowLeft,
  ArrowBigDown,
  Search,
  Filter,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StoryCard from "./Storycard";
import {
  HomeIcon,
  FileIcon,
  UserIcon,
  TaskIcon,
  WebIcon,
  AnalyticsIcon,
  MediaIcon,
  CommentsIcon,
  NotificationIcon,
  SubscriptionIcon,
  SettingsIcon,
  ContactSupportIcon,
  HeadphoneIcon,
  CalendarIcon,
  DescendingLinesIcon,
  Customize,
  ChevronDownIcon,
  girlIcon,
} from "./Font";

// Main dashboard component for stories management
export default function StoriesDashboard() {
  // State for active tab in content filtering
  const [activeTab, setActiveTab] = useState("all");
  // State for sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // State to track mobile view
  const [isMobile, setIsMobile] = useState(false);
  // State for active navigation item
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Effect to handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Always show sidebar on desktop
      if (!mobile) setSidebarOpen(true);
    };
    // Initial check
    checkMobile();
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    // Cleanup function
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen((p) => !p);

  // Sample stories data
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


  // Tab configuration for content filtering
  const tabs = [
    { id: "all", label: "All", count: 4500 },
    { id: "draft", label: "Draft", count: 1200 },
    { id: "pending", label: "Pending", count: 190 },
    { id: "published", label: "Published", count: 2432 },
    { id: "archived", label: "Archived", count: 520 },
  ];

  // Navigation items for sidebar
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


  return (
    <>
      <Head>
        <title>Stories Dashboard</title>
      </Head>

      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar component */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 border-r bg-white transition-all duration-200 ${
          sidebarOpen
            ? "w-[200px] translate-x-0"
            : "w-20 -translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar header with close button */}
        <div className="flex h-16 items-center justify-between px-4">
          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {/* Different icons for mobile vs desktop */}
              <X className="h-6 w-6 lg:hidden transition-transform hover:rotate-90" />
              <ChevronLeft className="hidden h-6 w-6 lg:block transition-transform hover:-translate-x-1" />
            </button>
          )}
        </div>

        {/* Navigation items */}
        {navItems.map(({ id, icon: IconComponent, label }) => (
          <button
            key={id}
            onClick={() => {
              setActiveNav(id);
              // Auto-close on mobile
              if (isMobile) toggleSidebar();
            }}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              activeNav === id
                ? "bg-blue-900 text-white"
                : "text-gray-600 hover:bg-violet-50 hover:text-violet-800"
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {/* Animated icon with scale effect */}
              <IconComponent
                className={`${
                  activeNav === id ? "text-white" : "text-gray-600"
                } transition-all duration-300 hover:scale-125`}
              />
            </span>
            {/* Only show label when sidebar is open */}
            {sidebarOpen && (
              <span className="truncate transition-opacity duration-200">
                {label}
              </span>
            )}
          </button>
        ))}

        {/* Support button at bottom of sidebar */}
        <div className="border-t p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-xs text-black font-medium hover:bg-blue-100 transition-colors group">
            {/* Animated headphone icon */}
            <HeadphoneIcon className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600" />
            {sidebarOpen && (
              <span className="transition-opacity duration-200">
                Contact Support
              </span>
            )}
          </button>
        </div>

        {/* Sidebar expand button (visible when collapsed) */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border bg-white p-1 shadow-md hover:bg-gray-50 lg:block transition-transform hover:translate-x-1"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 transition-transform hover:scale-125" />
          </button>
        )}
      </aside>

      {/* Main content area */}
      <div
        className={`flex min-h-screen flex-col bg-gray-50 transition-all duration-200 ${
          sidebarOpen ? "lg:ml-[200px]" : "lg:ml-20"
        }`}
      >
        {/* Header with navigation controls */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border border-gray-200 bg-white px-4 py-2 shadow-sm lg:shadow-none rounded-md">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 lg:hidden transition-transform hover:scale-110"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          {/* Back button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 transition-transform hover:-translate-x-1" />
            <span className="font-medium">Stories</span>
          </Link>

          {/* User profile section */}
          <div className="ml-auto hidden lg:flex items-center border rounded-lg px-3 py-1.5 bg-white shadow-sm gap-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              {/* User avatar with hover effect */}
              <img
                src="https://storage.googleapis.com/moviebucket4/a66e3c587b925507a17595d38b9654c3a4847f76.png"
                alt="User"
                className="w-9 h-9 rounded-full object-cover shrink-0 transition-transform hover:scale-110"
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs text-gray-500">Welcome back</span>
                <span className="text-base font-medium text-gray-500">
                  Akshita Patel
                </span>
              </div>
            </div>

            {/* Dropdown chevron */}
            <div className="ml-9">
              <ChevronDownIcon className="w-4 h-4 text-gray-500 transition-transform hover:rotate-180" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Search and action bar */}
          <div className="mb-4 flex flex-col gap-2 rounded-md border border-gray-200 bg-white py-2 px-3 shadow-sm md:flex-row md:items-center md:justify-end">
            {/* Search input */}
            <div className="relative w-full md:w-1/2 lg:w-1/3 mr-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 transition-transform duration-300 hover:scale-125"
              />
              <input
                placeholder="Search"
                className="w-full rounded-md border text-black px-6 py-1.5 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <div className="flex gap-2 mr-6">
                {/* Calendar button */}
                <button className="rounded-md bg-gray-100 p-1.5 hover:bg-gray-200 transition-all">
                  <CalendarIcon
                    size={16}
                    className="text-indigo-900 transition-transform duration-300 hover:scale-125"
                  />
                </button>
                {/* Sort button */}
                <button className="rounded-md bg-gray-100 p-1.5 hover:bg-gray-200 transition-all">
                  <DescendingLinesIcon
                    size={16}
                    className="text-indigo-900 transition-transform duration-300 hover:scale-125"
                  />
                </button>
              </div>
              {/* Primary action button */}
              <button className="whitespace-nowrap rounded-md bg-blue-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800 transition-all hover:-translate-y-0.5">
                Add New Story
              </button>
            </div>
          </div>

          {/* Content filtering tabs */}
          <div className="mb-4 overflow-x-auto border-b">
            <nav className="flex whitespace-nowrap">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === t.id
                      ? "bg-blue-900 text-white"
                      : "border-transparent text-gray-900 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {t.label} ({t.count.toLocaleString()})
                </button>
              ))}
            </nav>
          </div>

          {/* Stories grid */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {stories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}