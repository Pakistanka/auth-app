import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { queryClient } from '@/shared/lib/query-client';
import { AppRouter } from './router';
import ruRU from 'antd/locale/ru_RU';

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU}>
        <AppRouter />
      </ConfigProvider>
    </QueryClientProvider>
  );
};
