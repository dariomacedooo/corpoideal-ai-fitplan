
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
					foreground: 'hsl(var(--card-foreground))',
					soft: '#FAFAFA'
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
				// Custom modern colors
				corpoideal: {
					purple: '#8B5CF6',
					darkpurple: '#6E59A5',
					lightpurple: '#D6BCFA',
					gray: '#6B7280',
					dark: '#1F2937',
				},
				// New enhanced color palette
				purple: {
					soft: '#D5BFFF',
					light: '#E5D4FF',
					vibrant: '#7D3CFF',
					deep: '#6B2FDD',
					darker: '#5A25BB',
					border: '#C4B5FD'
				},
				orange: {
					soft: '#FFD199',
					light: '#FFE4B3',
					border: '#FED7AA'
				},
				border: {
					soft: '#E5E7EB'
				}
			},
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				sans: ['Inter', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem'
			},
			boxShadow: {
				subtle: '0px 2px 8px rgba(0, 0, 0, 0.05)',
				modern: '0px 4px 20px rgba(0, 0, 0, 0.08)',
				'modern-hover': '0px 8px 32px rgba(0, 0, 0, 0.12)'
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
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
