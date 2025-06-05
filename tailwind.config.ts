
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Novas cores principais do projeto - tema velocidade/força
				velocity: {
					lime: '#32FF32',     // Verde limão vibrante
					electric: '#00FF41', // Verde elétrico
					neon: '#39FF14',     // Verde neon
					dark: '#0A0A0A',     // Preto profundo
					charcoal: '#1A1A1A', // Carvão
					shadow: '#111111',   // Sombra
					accent: '#28FF28',   // Accent verde
					glow: '#00FF7F',     // Verde brilhante
				},
				// Cores antigas mantidas para compatibilidade
				corpoideal: {
					purple: '#32FF32',
					darkpurple: '#28FF28',
					lightpurple: '#00FF41',
					gray: '#8E9196',
					dark: '#0A0A0A',
				}
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				body: ['Roboto', 'sans-serif'],
				display: ['Orbitron', 'monospace'], // Fonte futurística para títulos
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
					  opacity: '0',
					  transform: 'translateY(10px)'
					},
					'100%': {
					  opacity: '1',
					  transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
					  transform: 'scale(0.95)',
					  opacity: '0'
					},
					'100%': {
					  transform: 'scale(1)',
					  opacity: '1'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px #32FF32, 0 0 10px #32FF32, 0 0 15px #32FF32'
					},
					'50%': {
						boxShadow: '0 0 10px #32FF32, 0 0 20px #32FF32, 0 0 30px #32FF32'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'neon-flicker': {
					'0%, 100%': {
						textShadow: '0 0 5px #32FF32, 0 0 10px #32FF32'
					},
					'50%': {
						textShadow: '0 0 2px #32FF32, 0 0 5px #32FF32, 0 0 8px #32FF32'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.4s ease-out',
				'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite',
			},
			backgroundImage: {
				'velocity-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
				'lime-gradient': 'linear-gradient(135deg, #32FF32 0%, #00FF41 50%, #39FF14 100%)',
				'neon-gradient': 'linear-gradient(90deg, #32FF32, #00FF41, #39FF14)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
