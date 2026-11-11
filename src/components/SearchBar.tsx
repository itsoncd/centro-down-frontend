import { cn } from "@/utils/class-name.utils";

interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string) => void;
  className?: string;
  value?: string;
  ariaLabel?: string;
}

export const SearchBar = ({ placeholder, onSearch, className, value, ariaLabel }: SearchBarProps) => {
  return (
    <input
      type="text"
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      className={cn(
        "border border-gray-300 rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    />
  );
};
