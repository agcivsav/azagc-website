'use client'
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'gold' | 'dark' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-red text-white hover:bg-red-hover',
  gold:    'bg-gold text-navy-deep hover:bg-gold-hover',
  dark:    'bg-navy-deep text-white hover:bg-navy-mid',
  ghost:   'border border-white/60 text-white hover:border-white hover:bg-white/10',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 gap-1.5',
  md: 'text-sm px-6 py-3 gap-2',
  lg: 'text-base px-8 py-4 gap-2',
}

interface ButtonBaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsLink   = ButtonBaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

type ButtonProps = ButtonAsButton | ButtonAsLink

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-body font-semibold tracking-wide rounded-sm transition-colors duration-200 cursor-pointer',
      variantStyles[variant],
      sizeStyles[size],
      className,
    )

    if ('href' in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink
      return (
        <Link href={href} className={classes} ref={ref as React.Ref<HTMLAnchorElement>} {...rest}>
          {children}
        </Link>
      )
    }

    return (
      <button className={classes} ref={ref as React.Ref<HTMLButtonElement>} {...(props as ButtonAsButton)}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
