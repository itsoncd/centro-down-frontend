interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
