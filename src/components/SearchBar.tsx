
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className={`flex items-center ${className}`}>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
