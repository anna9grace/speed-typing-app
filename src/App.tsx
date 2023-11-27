import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './constants';
import { MainPage } from './components/pages/MainPage/MainPage';
import { EmptyPage } from './components/pages/EmptyPage/EmptyPage';
import { LoginScreen } from './components/pages/LoginPage/LoginPage';
import { ResultPage } from './components/pages/ResultPage/ResultPage';
import { StatsPage } from './components/pages/StatsPage/StatsPage';
import { DefaultLayout } from './components/layout/DefaultLayout/DefaultLayout';

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route
          path={AppRoutes.ROOT}
          element={<MainPage />}
        />
        <Route
          path={AppRoutes.LOGIN}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoutes.RESULT}
          element={<ResultPage />}
        />
        <Route
          path={AppRoutes.STATS}
          element={<StatsPage />}
        />
        <Route
          path="*"
          element={<EmptyPage />}
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
