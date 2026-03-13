import React, { useContext, useEffect, useState } from 'react'
import { SectionContentContext, SectionDataContext, SectionModalContext } from './context/OrderContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firestore';

const LANG_TABS = [
  { code: 'en',  label: 'EN – English' },
  { code: 'fr',  label: 'FR – Français' },
  { code: 'rw',  label: 'RW – Kinyarwanda' },
  { code: 'sw',  label: 'SW – Kiswahili' },
];

function SectionUpdateModal() {

    const [sectionModalOpen, setSectionModalOpen] = useContext(SectionModalContext);
    const [sectionData] = useContext(SectionDataContext);
    const [, setSectionContent] = useContext(SectionContentContext);

    const [activeLang, setActiveLang] = useState('en');
    const [localContent, setLocalContent] = useState({ en: '', fr: '', rw: '', sw: '' });

    // Populate local state from sectionData when modal opens
    useEffect(() => {
        if (sectionModalOpen && sectionData) {
            setLocalContent({
                en: sectionData.content || '',
                fr: sectionData.content_fr || '',
                rw: sectionData.content_rw || '',
                sw: sectionData.content_sw || '',
            });
            setActiveLang('en');
        }
    }, [sectionModalOpen, sectionData]);

    const submitForm = async () => {
        if (!sectionData?.id) return;
        const sectionRef = doc(db, "pageSections", sectionData.id);
        await updateDoc(sectionRef, {
            content:    localContent.en,
            content_fr: localContent.fr,
            content_rw: localContent.rw,
            content_sw: localContent.sw,
        });
        setSectionContent(localContent.en);
        setSectionModalOpen(false);
    };

    if (!sectionModalOpen) return null;

    return (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-4 max-w-lg">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">Edit About Section</h3>
                  <button
                    className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    onClick={() => setSectionModalOpen(false)}
                  >×</button>
                </div>

                {/* Language Tabs */}
                <div className="flex border-b border-gray-200 px-5 pt-3 gap-1">
                  {LANG_TABS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => setActiveLang(code)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-t transition-all ${
                        activeLang === code
                          ? 'bg-emerald-500 text-white'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div className="relative p-6">
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-bold">
                    {LANG_TABS.find(l => l.code === activeLang)?.label}
                  </p>
                  <textarea
                    value={localContent[activeLang]}
                    onChange={(e) => setLocalContent(prev => ({ ...prev, [activeLang]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-emerald-500 transition h-[300px] resize-none text-sm"
                    placeholder={`Enter About Us text in ${LANG_TABS.find(l => l.code === activeLang)?.label}...`}
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-3">
                  <button
                    className="text-red-500 font-bold uppercase px-6 py-2 text-sm"
                    type="button"
                    onClick={() => setSectionModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-emerald-600 transition"
                    type="button"
                    onClick={submitForm}
                  >
                    Save All Languages
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}

export default SectionUpdateModal