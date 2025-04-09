import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X, Star } from 'lucide-react';

interface ProductFiltersProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (ratings: number[]) => void;
  onReset: () => void;
}

const ProductFilters = ({
  minPrice,
  maxPrice,
  onPriceChange,
  onRatingChange,
  onReset,
}: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    onPriceChange(newRange);
  };
  
  const handleRatingChange = (rating: number) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newSelectedRatings);
    onRatingChange(newSelectedRatings);
  };
  
  const handleReset = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedRatings([]);
    onReset();
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div>
          <Label className="text-sm font-medium mb-2 block">Price Range</Label>
          <div className="px-2">
            <Slider
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={1}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="my-6"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>${priceRange[0].toFixed(2)}</span>
            <span>${priceRange[1].toFixed(2)}</span>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-3 block">Ratings</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <label 
                  htmlFor={`rating-${rating}`} 
                  className="text-sm ml-2 flex items-center"
                >
                  {rating}+ <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReset} 
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
