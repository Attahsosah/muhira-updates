'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useI18n } from '@/i18n/I18nContext';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

const LANG_OPTIONS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'rw', label: 'RW' },
] as const;

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { lang, setLang } = useI18n();

  const handleChange = (code: 'en' | 'fr' | 'rw') => {
    const query = { ...router.query, lang: code };
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-gray-900/50 border border-gray-700 px-3 py-1.5 rounded-full text-[11px] font-black text-white hover:border-[#bd8b31] transition-all active:scale-95"
      >
        <FiGlobe className="text-[#bd8b31]" />
        <span>{lang.toUpperCase()}</span>
        <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Transparent overlay to close when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-24 bg-black border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => handleChange(opt.code)}
                className={`w-full px-4 py-3 text-left text-[11px] font-bold border-b border-gray-900 last:border-none transition-colors ${
                  lang === opt.code ? 'text-[#bd8b31] bg-gray-900' : 'text-gray-400 hover:bg-gray-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;