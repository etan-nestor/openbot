// lib/utils.ts

type ClassValue = string | number | boolean | null | undefined | Record<string, boolean> | ClassArray
interface ClassArray extends Array<ClassValue> {}

/**
 * Combines class names conditionally
 * Inspired by clsx (https://github.com/lukeed/clsx) and classnames (https://github.com/JedWatson/classnames)
 * 
 * @example
 * cn('btn', true && 'btn-primary', { 'btn-lg': isLarge })
 * cn(['btn', 'btn-primary'], { 'btn-lg': isLarge })
 */
export function cn(...inputs: ClassValue[]): string {
  let i = 0
  let str = ''
  let tmp: any

  while (i < inputs.length) {
    tmp = inputs[i++]
    if (tmp) {
      if (typeof tmp === 'string') {
        str += (str && ' ') + tmp
      } else if (typeof tmp === 'object') {
        if (Array.isArray(tmp)) {
          tmp = cn(...tmp)
          if (tmp) {
            str += (str && ' ') + tmp
          }
        } else {
          for (const key in tmp) {
            if (tmp[key]) {
              str += (str && ' ') + key
            }
          }
        }
      }
    }
  }
  return str
}

/**
 * Formats a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const target = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`
    }
  }

  return 'just now'
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generates a random hex color
 */
export function randomHexColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

/**
 * Checks if value is empty (null, undefined, empty string/array/object)
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Converts object to query string
 */
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

/**
 * Parses query string to object
 */
export function queryStringToObject(query: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(query))
}

/**
 * Formats bytes to human readable size
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}