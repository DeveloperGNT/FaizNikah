import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Sparkles, 
  Share2,
  Bookmark,
  CheckCircle,
  Quote
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/faizNikahData';
import { BlogArticle } from '../types';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, EASINGS, isReducedMotion } from '../utils/motion';

interface BlogPageProps {
  initialBlogId?: string;
  onNavigate: (page: string) => void;
  onOpenCounselor: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  initialBlogId, 
  onNavigate, 
  onOpenCounselor 
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(
    initialBlogId ? (BLOG_ARTICLES.find(a => a.id === initialBlogId) || null) : null
  );
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hadith & Islamic Ethics', 'Marital Character', 'Nikah & Sunnah'];

  const filteredArticles = selectedCategory === 'All' 
    ? BLOG_ARTICLES 
    : BLOG_ARTICLES.filter(a => a.category === selectedCategory);

  const containerRef = useGsapContext(() => {
    if (isReducedMotion()) return;

    // Header reveal
    gsap.fromTo(
      '.blog-header',
      { opacity: 0, y: 20, force3D: true },
      { opacity: 1, y: 0, duration: 0.7, ease: EASINGS.editorial, delay: 0.08 }
    );

    // Filter pills reveal
    gsap.fromTo(
      '.blog-cat-pill',
      { opacity: 0, y: 12, force3D: true },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: EASINGS.editorial, delay: 0.15 }
    );

    // Articles reveal
    gsap.fromTo(
      '.blog-article-card',
      { opacity: 0, y: 24, force3D: true },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.65, ease: EASINGS.editorial, delay: 0.2 }
    );
  }, [selectedCategory]);

  return (
    <div ref={containerRef} className="w-full bg-[#f8fbed] min-h-screen py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="blog-header max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E8E4D6]/70 border border-[#C8C5B4]/60 rounded-full mb-3 text-[11px] font-semibold text-[#526333] uppercase tracking-wider">
            <span>Foundation Library &amp; Moral Counseling</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11150D] font-medium tracking-tight">
            Islamic Guidance &amp; Marital Ethics
          </h1>
          <p className="text-sm sm:text-base text-[#404946] mt-3 leading-relaxed">
            Scholarly treatises, Hadith commentaries, and family counseling essays penned by the counselors of Haji Mehmed Isaac Farash Foundation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`blog-cat-pill text-xs px-4 py-2 rounded-full transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#0B4940] text-[#F7F4EA] border-[#0B4940] font-semibold shadow-sm'
                  : 'bg-[#F7F4EA] text-[#404946] border-[#C8C5B4] hover:bg-[#E8E4D6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <article 
              key={article.id}
              className="blog-article-card bg-[#E8E4D6]/40 border border-[#C8C5B4]/70 rounded-xl overflow-hidden shadow-[0_12px_36px_-8px_rgba(17,21,13,0.05)] hover:border-[#0B4940]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-[#C8C5B4]">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] bg-[#11150D]/80 text-[#F7F4EA] px-2.5 py-1 rounded font-medium">
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-semibold text-[#526333] uppercase tracking-wider block">
                    {article.category}
                  </span>

                  <h3 className="font-serif text-xl text-[#11150D] font-medium leading-snug">
                    {article.originalTitleHindi || article.title}
                  </h3>

                  {article.originalTitleHindi && (
                    <div className="text-xs text-[#0B4940] font-medium">
                      {article.title}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#404946] leading-relaxed line-clamp-3 font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#C8C5B4]/40 flex items-center justify-between">
                  <div className="text-[11px] text-[#404946]">
                    <span>By <strong>{article.author}</strong></span>
                  </div>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-semibold text-[#0B4940] hover:text-[#14584C] hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11150D]/65 backdrop-blur-sm">
          <div className="bg-[#F7F4EA] border border-[#C8C5B4] rounded-lg max-w-3xl w-full p-6 sm:p-10 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-1.5 text-[#404946] hover:text-[#11150D] hover:bg-[#E8E4D6] rounded-full"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs text-[#526333] font-semibold uppercase tracking-wider">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#11150D] font-medium mt-2 leading-snug">
                  {selectedArticle.originalTitleHindi || selectedArticle.title}
                </h1>
                {selectedArticle.originalTitleHindi && (
                  <h3 className="font-serif text-lg text-[#0B4940] italic mt-1">
                    {selectedArticle.title}
                  </h3>
                )}
                <div className="text-xs text-[#404946] mt-2 flex items-center gap-2">
                  <span>PENNED BY: <strong>{selectedArticle.author}</strong></span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="w-full h-64 rounded bg-[#E8E4D6] overflow-hidden">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-stone text-sm sm:text-base text-[#191d14] leading-relaxed space-y-4">
                <div className="bg-[#E8E4D6]/50 p-4 rounded border-l-4 border-[#0B4940] text-sm text-[#11150D] font-medium">
                  {selectedArticle.excerpt}
                </div>
                
                <p>
                  In Islamic jurisprudence and marital philosophy, entering the covenant of Nikah requires spiritual preparation, rectitude of intention, and moral self-restraint. Our scholars at the Haji Mehmed Isaac Farash Foundation consistently emphasize that true tranquility (Sakinah) in marriage begins long before the solemnization, in the moral character and honesty of each candidate.
                </p>

                <p>
                  As recorded in sacred traditions, marital harmony flourishes when both partners prioritize mutual forbearance, truthfulness in business dealings, and the protection of private honor. When financial greed, unfulfilled debts, or false representations enter matrimonial negotiations, barakah is diminished.
                </p>

                <blockquote className="font-serif text-lg text-[#0B4940] italic my-4 p-4 bg-[#F7F4EA] border border-[#C8C5B4] rounded">
                  "The most blessed marriage is that which incurs the least financial burden."
                  <span className="block text-xs text-[#526333] font-sans not-italic mt-1">
                    — Musnad Ahmad 24595
                  </span>
                </blockquote>

                <p>
                  FaizNikah's counseling council remains available to assist families in resolving interpersonal misunderstandings, drafting fair Mahr agreements, and solemnizing simple, honorable weddings in compliance with the noble Sunnah.
                </p>
              </div>

              <div className="pt-6 border-t border-[#C8C5B4]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button 
                  onClick={onOpenCounselor}
                  className="w-full sm:w-auto bg-[#0B4940] text-[#F7F4EA] px-5 py-2.5 rounded text-xs font-semibold hover:bg-[#14584C]"
                >
                  Consult Counselor on this Topic
                </button>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-semibold text-[#404946] hover:text-[#11150D]"
                >
                  Back to Guidance Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
