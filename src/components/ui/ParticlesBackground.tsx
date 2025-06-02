'use client'

import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: {
                enable: true,
                force: 30
              }
            },
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#3b82f6", "#ff4500", "#6366f1"],
          },
          links: {
            color: "#3b82f6",
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.1
            }
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
            trail: {
              enable: true,
              length: 10,
              fillColor: "#0f172a"
            }
          },
          number: {
            density: {
              enable: true,
            },
            value: 60,
          },
          opacity: {
            value: 0.7,
            animation: {
              enable: true,
              speed: 1
            }
          },
          shape: {
            type: ["circle", "triangle"]
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 3
            }
          },
        },
        detectRetina: true,
      }}
    />
  )
}