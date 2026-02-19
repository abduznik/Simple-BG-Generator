import React, { useRef, useEffect } from 'react'

const CanvasPreview = ({ settings }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        const {
            width, height, color1, color2, pattern,
            gridSize, inverted, shapeType, lineType,
            lineWidth, lineFrequency, lineAmplitude,
            postProcessing
        } = settings

        // Set canvas dimensions
        canvas.width = width
        canvas.height = height

        const c1 = inverted ? color2 : color1
        const c2 = inverted ? color1 : color2

        // Clear background
        ctx.fillStyle = c1
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = c2
        ctx.strokeStyle = c2
        ctx.lineWidth = lineWidth

        // --- Pattern Rendering ---
        if (pattern === 'checkerboard') {
            for (let x = 0; x < width; x += gridSize * 2) {
                for (let y = 0; y < height; y += gridSize * 2) {
                    ctx.fillRect(x, y, gridSize, gridSize)
                    ctx.fillRect(x + gridSize, y + gridSize, gridSize, gridSize)
                }
            }
        } else if (pattern === 'dots') {
            const radius = gridSize / 4
            for (let x = gridSize / 2; x < width; x += gridSize) {
                for (let y = gridSize / 2; y < height; y += gridSize) {
                    ctx.beginPath()
                    ctx.arc(x, y, radius, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        } else if (pattern === 'geometric') {
            let rowCount = 0
            for (let y = 0; y < height + gridSize; y += gridSize) {
                const isEvenRow = rowCount % 2 === 0
                const currentOffset = (settings.useOffset && !isEvenRow) ? settings.offsetAmount : 0

                for (let x = -gridSize; x < width + gridSize; x += gridSize) {
                    const drawX = x + currentOffset
                    const drawY = y
                    const centerX = drawX + gridSize / 2
                    const centerY = drawY + gridSize / 2

                    ctx.save()
                    ctx.translate(centerX, centerY)
                    if (settings.shapeRotation !== 0) {
                        ctx.rotate((settings.shapeRotation * Math.PI) / 180)
                    }

                    if (shapeType === 'triangle') {
                        ctx.beginPath()
                        ctx.moveTo(0, -gridSize / 3)
                        ctx.lineTo(gridSize / 3, gridSize / 3)
                        ctx.lineTo(-gridSize / 3, gridSize / 3)
                        ctx.closePath()
                        ctx.fill()
                    } else if (shapeType === 'circle') {
                        ctx.beginPath()
                        ctx.arc(0, 0, gridSize / 3, 0, Math.PI * 2)
                        ctx.fill()
                    } else if (shapeType === 'octagon') {
                        const side = gridSize / 4
                        const half = gridSize / 3
                        ctx.beginPath()
                        ctx.moveTo(-side, -half)
                        ctx.lineTo(side, -half)
                        ctx.lineTo(half, -side)
                        ctx.lineTo(half, side)
                        ctx.lineTo(side, half)
                        ctx.lineTo(-side, half)
                        ctx.lineTo(-half, side)
                        ctx.lineTo(-half, -side)
                        ctx.closePath()
                        ctx.fill()
                    }
                    ctx.restore()
                }
                rowCount++
            }
        } else if (pattern === 'lines') {
            const step = gridSize || 50
            for (let y = 0; y < height + step; y += step) {
                ctx.beginPath()
                if (lineType === 'static') {
                    ctx.moveTo(0, y)
                    ctx.lineTo(width, y)
                } else if (lineType === 'sine') {
                    ctx.moveTo(0, y)
                    for (let x = 0; x < width; x += 5) {
                        const dy = Math.sin(x * lineFrequency) * lineAmplitude
                        ctx.lineTo(x, y + dy)
                    }
                } else if (lineType === 'triangle') {
                    ctx.moveTo(0, y)
                    const period = 50 / lineFrequency
                    for (let x = 0; x < width; x += 10) {
                        const dy = (x % period < period / 2) ? lineAmplitude : -lineAmplitude
                        ctx.lineTo(x, y + dy)
                    }
                }
                ctx.stroke()
            }
        } else if (pattern === 'noise_grain') {
            const density = 0.5
            for (let x = 0; x < width; x += 2) {
                for (let y = 0; y < height; y += 2) {
                    if (Math.random() > density) {
                        ctx.fillRect(x, y, 1, 1)
                    }
                }
            }
        }

        // --- Post-Processing ---

        // Pixelate
        if (postProcessing.pixelate) {
            const size = postProcessing.pixelSize
            const w = Math.ceil(width / size)
            const h = Math.ceil(height / size)

            const tempCanvas = document.createElement('canvas')
            tempCanvas.width = w
            tempCanvas.height = h
            const tempCtx = tempCanvas.getContext('2d')

            tempCtx.imageSmoothingEnabled = false
            tempCtx.drawImage(canvas, 0, 0, width, height, 0, 0, w, h)

            ctx.imageSmoothingEnabled = false
            ctx.drawImage(tempCanvas, 0, 0, w, h, 0, 0, width, height)
        }

        // Scanlines
        if (postProcessing.scanlines) {
            ctx.fillStyle = `rgba(0, 0, 0, ${postProcessing.scanlineIntensity})`
            for (let y = 0; y < height; y += 4) {
                ctx.fillRect(0, y, width, 1.5)
            }
        }

        // Noise (Grain)
        if (postProcessing.noise) {
            const intensity = postProcessing.noiseIntensity
            const imageData = ctx.getImageData(0, 0, width, height)
            const data = imageData.data
            for (let i = 0; i < data.length; i += 4) {
                const noise = (Math.random() - 0.5) * 255 * intensity
                data[i] += noise
                data[i + 1] += noise
                data[i + 2] += noise
            }
            ctx.putImageData(imageData, 0, 0)
        }

    }, [settings])

    return (
        <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center overflow-hidden relative p-4 group">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 bg-slate-900/50 backdrop-blur-sm rounded border border-slate-800 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Preview</span>
            </div>

            <div className="w-full h-full flex items-center justify-center overflow-auto custom-scrollbar">
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900 border border-slate-800"
                    style={{ width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%', imageRendering: settings.postProcessing.pixelate ? 'pixelated' : 'auto' }}
                />
            </div>

            <div className="mt-4 flex items-center gap-4 text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                <span>{settings.width} × {settings.height} px</span>
                <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                <span>{settings.pattern}</span>
            </div>
        </div>
    )
}

export default CanvasPreview
