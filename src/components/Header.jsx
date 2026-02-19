import React from 'react'

const Header = () => {
    return (
        <header className="px-6 py-3 flex items-center justify-between border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center border border-slate-700">
                    <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-sm font-bold text-slate-200 tracking-tight">
                        AuraGen
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500">BETA v1.1.0</span>
            </div>
        </header>
    )
}

export default Header
