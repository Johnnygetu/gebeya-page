import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { allConditions, allSellerTypes } from '@/lib/categories';

export const defaultFilters = {
  condition: '',
  sellerType: '',
  minPrice: '',
  maxPrice: '',
  attributeFilters: {},
};

export default function FilterBar({
  filters,
  onFiltersChange,
  category,
  resultCount,
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateAttributeFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      attributeFilters: { ...filters.attributeFilters, [key]: value },
    });
  };

  const clearAll = () => {
    onFiltersChange(defaultFilters);
  };

  const activeCount =
    (filters.condition ? 1 : 0) +
    (filters.sellerType ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    Object.values(filters.attributeFilters).filter((v) => v !== '').length;

  const selectClass =
    'w-full appearance-none bg-white border border-neutral-200 rounded-lg pl-3 pr-9 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all cursor-pointer';
  const labelClass = 'block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wide';

  const SelectWrapper = ({ label, value, onChange, options }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
        >
          <option value="">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'true' ? 'Yes' : opt === 'false' ? 'No' : opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );

  const quickFilters = category.filters.slice(0, 3);
  const advancedFilters = category.filters.slice(3);

  return (
    <div className="bg-white border-b border-neutral-200 sticky top-[105px] lg:top-[149px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-700" />
              <span className="text-sm font-semibold text-neutral-900">Filters</span>
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary-700 text-white text-xs font-bold rounded-full">
                  {activeCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500 hidden sm:inline">
                <span className="font-semibold text-neutral-900">{resultCount}</span> listings
              </span>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 hover:text-primary-800 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
              {(advancedFilters.length > 0 || true) && (
                <button
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {advancedOpen ? 'Less filters' : 'More filters'}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Quick filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {quickFilters.map((filter) => (
              <SelectWrapper
                key={filter.key}
                label={filter.label}
                value={filters.attributeFilters[filter.key] || ''}
                onChange={(v) => updateAttributeFilter(filter.key, v)}
                options={filter.options || []}
              />
            ))}
            <SelectWrapper
              label="Condition"
              value={filters.condition}
              onChange={(v) => updateFilter('condition', v)}
              options={allConditions}
            />
            <SelectWrapper
              label="Seller"
              value={filters.sellerType}
              onChange={(v) => updateFilter('sellerType', v)}
              options={allSellerTypes}
            />
          </div>

          {/* Advanced filters */}
          {advancedOpen && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2 border-t border-neutral-100 animate-fade-in">
              {advancedFilters.map((filter) => (
                <SelectWrapper
                  key={filter.key}
                  label={filter.label}
                  value={filters.attributeFilters[filter.key] || ''}
                  onChange={(v) => updateAttributeFilter(filter.key, v)}
                  options={filter.options || []}
                />
              ))}
              <div>
                <label className={labelClass}>Min Price (ETB)</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className={labelClass}>Max Price (ETB)</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  placeholder="Any"
                  className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
