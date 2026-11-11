import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Loader } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Scene from './Scene'

function App() {
  return (
    <>
      {/* HTML Overlay UI */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none p-4 sm:p-6 md:p-12 flex justify-between items-center">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img src="/logo.png" alt="LUMINAPIX Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full shadow-lg" />
          <h1 className="font-display font-bold text-lg sm:text-2xl tracking-widest text-white mix-blend-difference">LUMINAPIX</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs tracking-widest uppercase text-white/50">Scroll to explore</span>
          <a 
            href="/matrix.html" 
            className="pointer-events-auto text-[11px] font-mono tracking-wider px-3 py-1.5 rounded border border-white/25 bg-black/60 text-white/90 hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md shadow-lg"
          >
            Enter Studio ➔
          </a>
        </div>
      </div>

      {/* Bottom Swipe / Scroll Cue on Mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-1.5 text-white/60">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase animate-pulse">Scroll / Swipe to Explore</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex justify-center p-1">
          <div className="w-1 h-1.5 bg-white/80 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="absolute inset-0 w-full h-full bg-[#020202]"
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* ScrollControls makes the page scrollable and drives the scroll offset */}
          <ScrollControls pages={4} damping={0.1}>
            <Scene />
          </ScrollControls>
          
          {/* 2040 Post Processing Effects */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.2} 
            />
            <ChromaticAberration 
              blendFunction={BlendFunction.NORMAL} 
              offset={[0.002, 0.002]} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

export default App
