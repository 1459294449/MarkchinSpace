'use client';

import React, { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto' | 'pure-black' | 'pure-white';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'auto';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;

    // 移除所有主题类
    root.classList.remove('theme-pure-black', 'theme-pure-white', 'theme-original');

    switch (selectedTheme) {
      case 'pure-black':
        root.classList.add('theme-pure-black');
        break;
      case 'pure-white':
        root.classList.add('theme-pure-white');
        break;
      case 'light':
      case 'dark':
      case 'auto':
        root.classList.add('theme-original');
        break;
    }
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['auto', 'pure-white', 'pure-black'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);

    // 触发背景图片组件更新
    window.dispatchEvent(new CustomEvent('themeChange', { detail: nextTheme }));
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'pure-white':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'pure-black':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
        );
      case 'auto':
      case 'light':
      case 'dark':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getTitle = () => {
    switch (theme) {
      case 'pure-white':
        return '纯白模式';
      case 'pure-black':
        return '纯黑模式';
      case 'auto':
      case 'light':
      case 'dark':
        return '原始主题';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="glass-card p-2 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
      title={getTitle()}
    >
      {getIcon()}
    </button>
  );
}

// 简化版本，用于移动端
export function ThemeToggleSimple() {
  const [theme, setTheme] = useState<Theme>('auto');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'auto';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new CustomEvent('themeChange', { detail: nextTheme }));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-white/80 hover:text-white transition-colors"
      title={theme === 'light' ? '切换到夜间模式' : '切换到日间模式'}
    >
      {theme === 'light' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}
