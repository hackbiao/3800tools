import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../config/tools';
import type { Tool, ToolCategory } from '../types/tools';

const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    return `${base}${path}`.replace(/\/+/g, '/');
};

const TopNavBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Tool[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<Record<string, HTMLAnchorElement>>({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const results = ALL_TOOLS.filter(
                tool =>
                    tool.name.toLowerCase().includes(query) ||
                    tool.description.toLowerCase().includes(query) ||
                    tool.keywords.some(k => k.toLowerCase().includes(query))
            );
            setSearchResults(results.slice(0, 6));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleCategoryHover = (categoryId: string, element: HTMLAnchorElement | null) => {
        if (element) {
            const rect = element.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 4,
                left: rect.left,
            });
            setActiveDropdown(categoryId);
        }
    };

    const handleCategoryLeave = () => {
        setActiveDropdown(null);
    };

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            navigate(searchResults[0].path);
            setShowSearch(false);
            setSearchQuery('');
        }
    }, [searchResults, navigate]);

    const handleToolClick = useCallback((path: string) => {
        navigate(path);
        setShowSearch(false);
        setSearchQuery('');
    }, [navigate]);

    const toggleTheme = useCallback(() => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const isHomePage = location.pathname === '/' || location.pathname === '';
    const isCategoryPage = location.pathname.startsWith('/category/');

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <Link to="/" className="flex items-center gap-2 group">
                        <picture>
                            <source srcSet={getAssetUrl('assets/logo.webp')} type="image/webp" />
                            <img
                                src={getAssetUrl('logo.png')}
                                alt="叁八零零 Logo"
                                className="w-8 h-8 rounded-lg object-cover transition-transform group-hover:scale-110"
                                loading="eager"
                            />
                        </picture>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-gray-900 dark:text-white text-sm font-semibold leading-tight">叁八零零</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs leading-tight">在线免费工具箱</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            to="/"
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                isHomePage
                                    ? 'text-primary bg-primary/10'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            首页
                        </Link>
                        <Link
                            to="/category/all"
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                isCategoryPage
                                    ? 'text-primary bg-primary/10'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            全部分类
                        </Link>
                    </nav>

                    <div ref={searchRef} className="flex-1 max-w-sm mx-4 relative">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
                                    search
                                </span>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSearch(true);
                                    }}
                                    onFocus={() => setShowSearch(true)}
                                    placeholder="搜索工具..."
                                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                            </div>
                        </form>

                        {showSearch && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[99999]">
                                {searchResults.map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() => handleToolClick(tool.path)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg text-primary">
                                            {tool.icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {tool.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {tool.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                            aria-label="切换主题"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {isDark ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 分类导航栏 - 所有页面都显示 */}
            <div className="border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1.5 relative">
                        {!isHomePage && !isCategoryPage && (
                            <>
                                <Link
                                    to="/"
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap flex-shrink-0"
                                >
                                    <span className="material-symbols-outlined text-sm">home</span>
                                    首页
                                </Link>
                                <span className="text-gray-300 dark:text-gray-700 flex-shrink-0">/</span>
                            </>
                        )}
                        {TOOL_CATEGORIES.map((category) => (
                            <Link
                                key={category.id}
                                ref={(el) => { if (el) categoryRefs.current[category.id] = el; }}
                                to={`/category/${category.id}`}
                                onMouseEnter={(e) => handleCategoryHover(category.id, e.currentTarget)}
                                onMouseLeave={handleCategoryLeave}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap flex-shrink-0"
                            >
                                <span className="material-symbols-outlined text-sm">{category.icon}</span>
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* 下拉菜单 - fixed定位避免被裁剪 */}
            {activeDropdown && (
                <div 
                    className="fixed z-[100000] pointer-events-auto"
                    style={{ 
                        top: dropdownPosition.top, 
                        left: dropdownPosition.left 
                    }}
                    onMouseEnter={() => setActiveDropdown(activeDropdown)}
                    onMouseLeave={handleCategoryLeave}
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-56 py-2 max-h-80 overflow-y-auto">
                        {TOOL_CATEGORIES.find(c => c.id === activeDropdown)?.tools.map((tool) => (
                            <Link
                                key={tool.id}
                                to={tool.path}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                                <span className="material-symbols-outlined text-sm text-primary">{tool.icon}</span>
                                {tool.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default TopNavBar;
