'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { messagesEn } from './messages.en';
import { messagesFr } from './messages.fr';
import { messagesRw } from './messages.rw';

type Lang = 'en' | 'fr' | 'rw';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// Changed to any record to allow nested objects (categories.item)
const MESSAGES_BY_LANG: Record<Lang, any> = {
  en: messagesEn,
  fr: messagesFr,
  rw: messagesRw,
};

const isSupportedLang = (value: string | string[] | undefined): value is Lang => {
  if (typeof value !== 'string') return false;
  return value === 'en' || value === 'fr' || value === 'rw';
};

const STORAGE_KEY = 'muhira_lang';

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>('en');

  // Resolve language from query or storage
  useEffect(() => {
    let nextLang: Lang = 'en';

    const queryLang = router.query.lang;
    if (isSupportedLang(queryLang)) {
      nextLang = queryLang;
    } else if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isSupportedLang(stored || undefined)) {
        nextLang = stored as Lang;
      }
    }

    setLangState(nextLang);
  }, [router.query.lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const messages = useMemo(() => MESSAGES_BY_LANG[lang], [lang]);

  // UPDATED: Logic to handle dot notation (e.g., "electronics.title")
  const t = useCallback(
    (key: string, fallback?: string) => {
      const keys = key.split('.');
      let result = messages;

      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) break;
      }

      return (typeof result === 'string' ? result : fallback) ?? key;
    },
    [messages]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang, setLang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
};