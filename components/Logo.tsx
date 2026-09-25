export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path d="M4 24 L12 10 L17 18 L21 12 L30 24 Z" fill="currentColor" opacity="0.85" />
        <path
          d="M9 26c0-3.5 2.8-6 7-6h1c4.2 0 7 2.5 7 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="17" cy="27" r="0.9" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-semibold tracking-tight text-brown-900">
          Cà phê
        </span>
        <span className="font-serif text-sm font-semibold tracking-tight text-maroon-700 -mt-1">
          Miền ký ức
        </span>
      </span>
    </span>
  );
}
