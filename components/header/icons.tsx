import classes from './Header.module.css';

export function LogoIcon() {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 22C8 16.4772 12.4772 12 18 12H22C27.5228 12 32 16.4772 32 22V28H8V22Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 6C23.866 6 27 9.13401 27 13C27 13.3407 26.9716 13.6748 26.9171 14M20 6C16.134 6 13 9.13401 13 13C13 13.3407 13.0284 13.6748 13.0829 14M20 6V14M26.9171 14C26.4929 16.8354 24.1822 19.0961 21.3191 19.4583M13.0829 14C13.5071 16.8354 15.8178 19.0961 18.6809 19.4583M26.9171 14H13.0829"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="6" y="28" width="28" height="4" rx="2" fill="currentColor"/>
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg
      className={classes.sunIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 5V3M12 21v-2M5 12H3m18 0h-2M6.3 6.3L4.9 4.9m12.8 12.8l1.4 1.4M6.3 17.7l-1.4 1.4m12.8-12.8l1.4-1.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg
      className={classes.moonIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
} 