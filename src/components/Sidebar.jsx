import React from 'react'

const Sidebar = ({ settings, setSettings }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setSettings(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : (type === 'number' || type === 'range' ? Number(value) : value)
                }
            }))
        } else {
            setSettings(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : (type === 'number' || type === 'range' ? Number(value) : value)
            }))
        }
    }

    const handlePresetChange = (e) => {
        const preset = e.target.value
        let width = 1920, height = 1080

        if (preset === '4k') { width = 3840; height = 2160 }
        else if (preset === 'mobile') { width = 1080; height = 1920 }
        else if (preset === 'ultrawide') { width = 3440; height = 1440 }

        setSettings(prev => ({ ...prev, preset, width, height }))
    }

    const selectClasses = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-primary-500 transition-all cursor-pointer [&>option]:bg-slate-800 [&>option]:text-slate-200"
    const inputClasses = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-primary-500 transition-all"
    const labelClasses = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
    const sectionClasses = "space-y-4 border-b border-slate-800/50 pb-6 last:border-0"

    return (
        <aside className="w-full lg:w-80 bg-slate-900 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-140px)] p-6 border-r border-slate-800">

            {/* Resolution */}
            <section className={sectionClasses}>
                <h3 className={labelClasses}>Resolution</h3>
                <div className="space-y-3">
                    <select name="preset" value={settings.preset} onChange={handlePresetChange} className={selectClasses}>
                        <option value="1080p">1080p Full HD</option>
                        <option value="4k">4K Ultra HD</option>
                        <option value="mobile">Mobile Portrait</option>
                        <option value="ultrawide">Ultrawide</option>
                        <option value="custom">Custom</option>
                    </select>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <input type="number" name="width" value={settings.width} onChange={handleChange} className={inputClasses} placeholder="Width" />
                        </div>
                        <div>
                            <input type="number" name="height" value={settings.height} onChange={handleChange} className={inputClasses} placeholder="Height" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Colors */}
            <section className={sectionClasses}>
                <h3 className={labelClasses}>Colors</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <div
                            className="h-10 w-full rounded-lg border border-slate-700 cursor-pointer relative overflow-hidden flex items-center justify-center group"
                            style={{ backgroundColor: settings.color1 }}
                            onClick={() => document.getElementById('picker1').click()}
                        >
                            <input
                                id="picker1"
                                type="color"
                                name="color1"
                                value={settings.color1}
                                onChange={handleChange}
                                className="opacity-0 absolute inset-0 cursor-pointer"
                            />
                            <span className="text-[10px] mix-blend-difference font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">PICK</span>
                        </div>
                        <input type="text" name="color1" value={settings.color1} onChange={handleChange} className="bg-transparent border-0 text-[10px] font-mono text-center text-slate-500 hover:text-slate-300 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div
                            className="h-10 w-full rounded-lg border border-slate-700 cursor-pointer relative overflow-hidden flex items-center justify-center group"
                            style={{ backgroundColor: settings.color2 }}
                            onClick={() => document.getElementById('picker2').click()}
                        >
                            <input
                                id="picker2"
                                type="color"
                                name="color2"
                                value={settings.color2}
                                onChange={handleChange}
                                className="opacity-0 absolute inset-0 cursor-pointer"
                            />
                            <span className="text-[10px] mix-blend-difference font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">PICK</span>
                        </div>
                        <input type="text" name="color2" value={settings.color2} onChange={handleChange} className="bg-transparent border-0 text-[10px] font-mono text-center text-slate-500 hover:text-slate-300 outline-none" />
                    </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer group mt-2">
                    <input type="checkbox" name="inverted" checked={settings.inverted} onChange={handleChange} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-0" />
                    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Invert Colors</span>
                </label>
            </section>

            {/* Pattern */}
            <section className={sectionClasses}>
                <h3 className={labelClasses}>Pattern</h3>
                <div className="space-y-4">
                    <select name="pattern" value={settings.pattern} onChange={handleChange} className={selectClasses}>
                        <option value="checkerboard">Checkerboard</option>
                        <option value="dots">Dots</option>
                        <option value="geometric">Geometric Shapes</option>
                        <option value="lines">Lines</option>
                        <option value="noise_grain">Noise / Sand</option>
                        <option value="perlin_noise">Perlin Noise</option>
                        <option value="low_poly">Low-Poly Mesh</option>
                    </select>

                    {settings.pattern === 'low_poly' && (
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Mesh Density</span>
                                    <span className="text-[10px] text-slate-400">{settings.meshDensity}</span>
                                </div>
                                <input type="range" name="meshDensity" min="10" max="100" value={settings.meshDensity} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Variance / Jitter</span>
                                    <span className="text-[10px] text-slate-400">{settings.meshVariance}</span>
                                </div>
                                <input type="range" name="meshVariance" min="0" max="50" value={settings.meshVariance} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>
                        </div>
                    )}

                    {settings.pattern === 'perlin_noise' && (
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Noise Scale</span>
                                    <span className="text-[10px] text-slate-400">{settings.noiseScale}</span>
                                </div>
                                <input type="range" name="noiseScale" min="1" max="100" value={settings.noiseScale} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Texture Density</span>
                                    <span className="text-[10px] text-slate-400">{settings.textureDensity}</span>
                                </div>
                                <input type="range" name="textureDensity" min="0" max="1" step="0.01" value={settings.textureDensity} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>
                        </div>
                    )}

                    {settings.pattern === 'checkerboard' && (
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-[10px] text-slate-500">Grid Size</span>
                                <span className="text-[10px] text-slate-400">{settings.gridSize}px</span>
                            </div>
                            <input type="range" name="gridSize" min="5" max="200" value={settings.gridSize} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                        </div>
                    )}

                    {settings.pattern === 'geometric' && (
                        <div className="space-y-4">
                            <select name="shapeType" value={settings.shapeType} onChange={handleChange} className={selectClasses}>
                                <option value="triangle">Triangles</option>
                                <option value="circle">Circles</option>
                                <option value="octagon">Octagons</option>
                            </select>
                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Shape Size</span>
                                    <span className="text-[10px] text-slate-400">{settings.gridSize}px</span>
                                </div>
                                <input type="range" name="gridSize" min="10" max="250" value={settings.gridSize} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Rotation</span>
                                    <span className="text-[10px] text-slate-400">{settings.shapeRotation}°</span>
                                </div>
                                <input type="range" name="shapeRotation" min="0" max="360" value={settings.shapeRotation} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>

                            <div className="space-y-3 pt-2 border-t border-slate-800/50">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" name="useOffset" checked={settings.useOffset} onChange={handleChange} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-0" />
                                    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Row Offset</span>
                                </label>
                                {settings.useOffset && (
                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="text-[10px] text-slate-500">Offset Pixels</span>
                                            <span className="text-[10px] text-slate-400">{settings.offsetAmount}px</span>
                                        </div>
                                        <input type="range" name="offsetAmount" min="0" max={settings.gridSize} value={settings.offsetAmount} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {settings.pattern === 'lines' && (
                        <div className="space-y-3">
                            <select name="lineType" value={settings.lineType} onChange={handleChange} className={selectClasses}>
                                <option value="static">Static Straight</option>
                                <option value="sine">Sine Wave</option>
                                <option value="triangle">Triangle Wave</option>
                            </select>
                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-slate-500">Line Width</span>
                                    <span className="text-[10px] text-slate-400">{settings.lineWidth}px</span>
                                </div>
                                <input type="range" name="lineWidth" min="1" max="50" value={settings.lineWidth} onChange={handleChange} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Post-Processing */}
            <section className={sectionClasses}>
                <h3 className={labelClasses}>Post-Processing</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" name="postProcessing.pixelate" checked={settings.postProcessing.pixelate} onChange={handleChange} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-0" />
                            <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Pixelate</span>
                        </label>
                        {settings.postProcessing.pixelate && (
                            <input type="range" name="postProcessing.pixelSize" min="2" max="50" value={settings.postProcessing.pixelSize} onChange={handleChange} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" name="postProcessing.scanlines" checked={settings.postProcessing.scanlines} onChange={handleChange} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-0" />
                            <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Scanlines (TV)</span>
                        </label>
                        {settings.postProcessing.scanlines && (
                            <input type="range" name="postProcessing.scanlineIntensity" min="0" max="1" step="0.1" value={settings.postProcessing.scanlineIntensity} onChange={handleChange} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" name="postProcessing.noise" checked={settings.postProcessing.noise} onChange={handleChange} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-0" />
                            <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Grain / Noise</span>
                        </label>
                        {settings.postProcessing.noise && (
                            <input type="range" name="postProcessing.noiseIntensity" min="0" max="0.5" step="0.05" value={settings.postProcessing.noiseIntensity} onChange={handleChange} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                        )}
                    </div>
                </div>
            </section>

            <div className="mt-auto pt-4">
                <button
                    onClick={() => {
                        const canvas = document.querySelector('canvas')
                        if (canvas) {
                            const link = document.createElement('a')
                            link.download = `auragen-export-${settings.width}x${settings.height}.png`
                            link.href = canvas.toDataURL('image/png')
                            link.click()
                        }
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all uppercase tracking-widest"
                >
                    Export PNG
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
