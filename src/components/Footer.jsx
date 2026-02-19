import React from 'react'

const Footer = () => {
    return (
        <footer className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 bg-slate-900">
            <div className="flex items-center gap-6">
                <p className="text-[10px] text-slate-500 font-mono">
                    © {new Date().getFullYear()} AURAGEN ENGINE
                </p>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-600 uppercase tracking-tighter">Powered by</span>
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-slate-400 hover:text-primary-500 transition-colors"
                    >
                        Tailwind CSS
                    </a>
                </div>

                <a
                    href="https://tailwindcss.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-300 transition-colors underline decoration-slate-800 underline-offset-4"
                >
                    Docs
                </a>

                <div className="h-3 w-px bg-slate-800"></div>

                <p className="text-[10px] text-slate-600 italic">
                    Automated by Antigravity AI
                </p>
            </div>
        </footer>
    )
}

export default Footer
