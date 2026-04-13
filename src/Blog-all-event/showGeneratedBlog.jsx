import React, { useEffect, useState } from 'react';
import PlanMarkdown from './PlanMarkdown';
import { useParams, Link } from "react-router-dom";
import SideBar from "../App drawer/sideBar";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import axios from "axios";
import { useThemeContext } from "../ThemeContext";

const baseURL = import.meta.env.VITE_BASE_URL;

const GenerateBlog = () => {
  const { theme, toggleThemeMode } = useThemeContext();
  const { plan_id, publish } = useParams();
  const [markdownBlog, setMarkdownBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (publish === "true") {
          // Owner publishing — fetch via authenticated endpoint
          const resp = await axios.get(`${baseURL}plan/generateBlog?plan_id=${plan_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
          });
          const md = PlanMarkdown({ planData: resp.data });
          setMarkdownBlog(md);
        } else {
          // Public view — use the unauthenticated public endpoint
          const resp = await axios.get(`${baseURL}public/blog?plan_id=${plan_id}`);
          const md = PlanMarkdown({ planData: resp.data });
          setMarkdownBlog(md);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Journey Journal</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight italic mb-4" style={{ fontFamily: "'Newsreader', serif" }}>
            Travel <span className="text-primary">Chronicle</span>
          </h1>
          <hr className="w-16 border-primary/20 mx-auto" />
        </header>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-30 block mb-4 animate-spin">autorenew</span>
            <p className="text-sm italic">Generating your chronicle…</p>
          </div>
        ) : markdownBlog ? (
          <article className="prose prose-sm max-w-none
            prose-headings:font-headline prose-headings:font-light prose-headings:tracking-tight
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-xl
            prose-p:text-on-surface prose-p:leading-relaxed
            prose-strong:text-on-surface
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-md prose-img:max-h-64 prose-img:object-cover
            dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                img: ({ node, ...props }) => (
                  <img className="max-h-64 w-full object-cover rounded-xl shadow-md my-4" {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl font-light tracking-tight italic mb-6 mt-10" style={{ fontFamily: "'Newsreader', serif" }} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-light tracking-tight italic mb-4 mt-8 text-primary" style={{ fontFamily: "'Newsreader', serif" }} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-bold uppercase tracking-widest mb-3 mt-6 text-on-surface-variant text-sm" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base leading-relaxed text-on-surface mb-4" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-2 border-primary/40 pl-6 italic text-on-surface-variant my-6" {...props} />
                ),
              }}
            >
              {markdownBlog}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl opacity-30 block mb-4">menu_book</span>
            <p className="text-sm italic">Could not load blog content.</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-12 pt-6 border-t border-outline/10 flex-wrap">
          <Link
            to={`/Blog/${plan_id}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            All Blogs
          </Link>
          <Link
            to={`/ShareBlog/${plan_id}/true`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary-dim transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">publish</span>
            Publish
          </Link>
        </div>
      </main>
    </div>
  );
};

export default GenerateBlog;
