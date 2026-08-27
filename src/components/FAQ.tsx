import React, { useState, useMemo } from 'react';
import { faqs } from '../data/hackathonData';
import { HelpCircle, ChevronDown, Search, MessageSquare } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Eligibility', 'Teams', 'Registration', 'Rules & Tech', 'Logistics'];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <SectionWrapper id="faq" stageTag="STAGE 10" accent="cyan" bgVariant="midnight" animVariant="glitch-reveal" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-pixel text-xs">
              <span>STAGE 10: FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              FREQUENTLY ASKED <span className="font-pixel text-cyan-400 neon-text-blue">QUESTIONS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Everything you need to know about eligibility, team rules, travel, AI tool guidelines, and judging.
            </p>
          </div>
        </ScrollReveal>

        {/* Search & Category Pills Bar */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search FAQ keywords (e.g. certificates, AI tools, fees)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-pixel transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_#22d3ee]'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <ScrollReveal key={faq.id} variant="fade-up" delay={idx * 0.05}>
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 transition-colors overflow-hidden">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setOpenId(isOpen ? null : faq.id);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                  >
                    <span className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-lg bg-slate-950 text-cyan-400 transition-transform ${isOpen ? 'rotate-180 bg-cyan-400 text-slate-950' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 text-slate-300 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                      <p>
                        {faq.answer.includes('https://') ? (
                          faq.answer.split(/(https:\/\/[^\s]+)/g).map((part, i) =>
                            part.startsWith('https://') ? (
                              <a
                                key={i}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline font-mono break-all font-semibold"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {part}
                              </a>
                            ) : (
                              part
                            )
                          )
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
};
