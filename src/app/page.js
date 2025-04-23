"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {
  ArrowLeft,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
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

// Dynamic import StoryCard to delay non-critical UI load
const StoryCard = dynamic(() => import("./Storycard"), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 rounded-lg animate-pulse" />,
});

export default function StoriesDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (!mobile) setSidebarOpen(true);
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);
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
  

  return (
    <>
      <Head>
        <title>Stories Dashboard</title>
        <meta name="description" content="Manage your stories dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="https://storage.googleapis.com/moviebucket4/a66e3c587b925507a17595d38b9654c3a4847f76.png"
          as="image"
          fetchpriority="high"
        />
      </Head>

      {sidebarOpen && isMobile && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 border-r bg-white transition-all duration-200 ${
          sidebarOpen
            ? "w-[200px] translate-x-0"
            : "w-20 -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6 lg:hidden" />
              <ChevronLeft className="hidden lg:block h-6 w-6" />
            </button>
          )}
        </div>

        {navItems.map(({ id, icon: IconComponent, label }) => (
          <button
            key={id}
            onClick={() => {
              setActiveNav(id);
              if (isMobile) toggleSidebar();
            }}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              activeNav === id
                ? "bg-blue-900 text-white"
                : "text-gray-600 hover:bg-violet-50 hover:text-violet-800"
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <IconComponent
                className={`${
                  activeNav === id ? "text-white" : "text-gray-600"
                } transition-all duration-300 hover:scale-125`}
              />
            </span>
            {sidebarOpen && (
              <span className="truncate transition-opacity duration-200">
                {label}
              </span>
            )}
          </button>
        ))}

        <div className="border-t p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-xs text-black font-medium hover:bg-blue-100 transition-colors group">
            <HeadphoneIcon className="group-hover:scale-110 group-hover:text-blue-600" />
            {sidebarOpen && (
              <span className="transition-opacity duration-200">
                Contact Support
              </span>
            )}
          </button>
        </div>

        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border bg-white p-1 shadow-md hover:bg-gray-50 lg:block transition-transform hover:translate-x-1"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </aside>

      <div
        className={`flex min-h-screen flex-col bg-gray-50 transition-all duration-200 ${
          sidebarOpen ? "lg:ml-[200px]" : "lg:ml-20"
        }`}
      >
        <header className="sticky top-0 z-20 flex items-center gap-3 border border-gray-200 bg-white px-4 py-2 shadow-sm lg:shadow-none rounded-md">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 lg:hidden hover:scale-110"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 hover:-translate-x-1" />
            <span className="font-medium">Stories</span>
          </Link>

          <div className="ml-auto hidden lg:flex items-center border rounded-lg px-3 py-1.5 bg-white shadow-sm gap-5 hover:shadow-md">
            <div className="flex items-center gap-3">
              <Image
                src="https://storage.googleapis.com/moviebucket4/a66e3c587b925507a17595d38b9654c3a4847f76.png"
                alt="User profile"
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover shrink-0 hover:scale-110"
                priority
                quality={85}
              />
              <div className="flex flex-col text-left">
                <span className="text-xs text-gray-500">Welcome back</span>
                <span className="text-base font-medium text-gray-500">
                  Akshita Patel
                </span>
              </div>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex flex-col gap-2 border border-gray-200 bg-white px-3 py-2 shadow-sm rounded-md md:flex-row md:items-center md:justify-end">
            <div className="relative w-full md:w-1/2 lg:w-1/3 mr-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 hover:scale-125"
              />
              <input
                placeholder="Search"
                className="w-full rounded-md border text-black px-6 py-1.5 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-2 mr-6">
                <button className="bg-gray-100 p-1.5 rounded hover:bg-gray-200">
                  <CalendarIcon className="text-indigo-900 hover:scale-125" />
                </button>
                <button className="bg-gray-100 p-1.5 rounded hover:bg-gray-200">
                  <DescendingLinesIcon className="text-indigo-900 hover:scale-125" />
                </button>
              </div>
              <button className="bg-blue-900 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-800 hover:-translate-y-0.5">
                Add New Story
              </button>
            </div>
          </div>

          <div className="mb-4 overflow-x-auto border-b">
            <nav className="flex whitespace-nowrap">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`rounded-lg border-2 px-3 py-2 text-sm font-medium ${
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
