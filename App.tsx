import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ALL_TOOLS } from './config/tools';
import HomePage from './components/HomePage';
import ToolLayout from './components/ToolLayout';
import CategoryPage from './components/CategoryPage';
import RankingPage from './components/RankingPage';
import SpecialTopicPage from './components/SpecialTopicPage';
import NotFoundPage from './components/NotFoundPage';
import TopNavBar from './components/TopNavBar';

const LoadingFallback = () => (
    <div className="flex w-full h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
            <div className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }}></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
    </div>
);

interface ToolRouteProps {
    component: React.LazyExoticComponent<React.FC>;
}

const ToolRoute: React.FC<ToolRouteProps> = ({ component: Component }) => (
    <ToolLayout>
        <Suspense fallback={<LoadingFallback />}>
            <Component />
        </Suspense>
    </ToolLayout>
);

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>
        <TopNavBar />
        {children}
    </>
);

const CategoryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>
        <TopNavBar />
        {children}
    </>
);

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>
        <TopNavBar />
        {children}
    </>
);

const App: React.FC = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
            <Routes>
                <Route path="/" element={
                    <HomeLayout>
                        <HomePage />
                    </HomeLayout>
                } />
                <Route path="/category/:categoryId" element={
                    <CategoryLayout>
                        <CategoryPage />
                    </CategoryLayout>
                } />
                <Route path="/ranking" element={
                    <PageLayout>
                        <RankingPage />
                    </PageLayout>
                } />
                <Route path="/topics" element={
                    <PageLayout>
                        <SpecialTopicPage />
                    </PageLayout>
                } />
                {ALL_TOOLS.map((tool) => {
                    const Component = tool.component;
                    return (
                        <Route
                            key={tool.id}
                            path={tool.path}
                            element={<ToolRoute component={Component} />}
                        />
                    );
                })}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
