import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { getCategoryBySlug } from '@/lib/categories';
import FilterBar, { defaultFilters } from '@/components/FilterBar';
import ListingCard from '@/components/ListingCard';
import { AlertCircle, Loader2, PackageSearch, ChevronDown } from 'lucide-react';

export default function ListingsPage({ categorySlug, searchQuery }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('newest');

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setListings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load listings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Reset filters when category changes
  useEffect(() => {
    setFilters(defaultFilters);
  }, [categorySlug]);

  const scopedListings = useMemo(() => {
    if (!categorySlug) return listings;
    return listings.filter((l) => l.category === categorySlug);
  }, [listings, categorySlug]);

  const filteredListings = useMemo(() => {
    let result = [...scopedListings];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          (l.description || '').toLowerCase().includes(q) ||
          (l.location || '').toLowerCase().includes(q) ||
          (l.seller_name || '').toLowerCase().includes(q) ||
          JSON.stringify(l.attributes).toLowerCase().includes(q)
      );
    }

    // Condition filter
    if (filters.condition) result = result.filter((l) => l.condition === filters.condition);
    // Seller type filter
    if (filters.sellerType) result = result.filter((l) => l.seller_type === filters.sellerType);
    // Price filters
    if (filters.minPrice) result = result.filter((l) => l.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((l) => l.price <= Number(filters.maxPrice));

    // Attribute filters
    if (category) {
      for (const [key, value] of Object.entries(filters.attributeFilters)) {
        if (value) {
          result = result.filter((l) => {
            const attrVal = l.attributes[key];
            if (typeof attrVal === 'boolean') return String(attrVal) === value;
            return String(attrVal) === value;
          });
        }
      }
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [scopedListings, searchQuery, filters, category, sortBy]);

  const featuredListings = useMemo(() => {
    const featured = filteredListings.filter((l) => l.featured);
    // Interleave by category so the featured row shows a mix of categories
    const byCategory = {};
    for (const l of featured) {
      if (!byCategory[l.category]) byCategory[l.category] = [];
      byCategory[l.category].push(l);
    }
    const categoryKeys = Object.keys(byCategory);
    const interleaved = [];
    let added = true;
    let idx = 0;
    while (added && interleaved.length < 4) {
      added = false;
      for (const key of categoryKeys) {
        if (byCategory[key][idx]) {
          interleaved.push(byCategory[key][idx]);
          added = true;
        }
      }
      idx++;
    }
    return interleaved;
  }, [filteredListings]);

  const regularListings = useMemo(
    () => filteredListings.filter((l) => !l.featured),
    [filteredListings]
  );

  const showFeatured = featuredListings.length > 0 && !searchQuery && Object.values(filters).every((v) => v === '' || (typeof v === 'object' && Object.values(v).every((x) => x === '')));

  if (!categorySlug && !category && categorySlug !== undefined) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <PackageSearch className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <p className="text-lg font-semibold text-neutral-900 mb-1">Category not found</p>
        <p className="text-sm text-neutral-500">This category does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Featured section */}
      {showFeatured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary-700 rounded-full" />
            <h2 className="text-lg font-extrabold text-neutral-900">Featured Listings</h2>
            <span className="text-sm text-neutral-400">({featuredListings.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredListings.map((listing) => {
              const cat = getCategoryBySlug(listing.category);
              if (!cat) return null;
              return (
                <ListingCard key={listing.id} listing={listing} category={cat} />
              );
            })}
          </div>
        </section>
      )}

      {/* Filter bar */}
      <div className="mt-6">
        {category && (
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            category={category}
            resultCount={filteredListings.length}
          />
        )}
      </div>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sort + count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-primary-700 rounded-full" />
            <h2 className="text-lg font-extrabold text-neutral-900">
              {searchQuery ? 'Search Results' : category ? category.label : 'All Listings'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-neutral-500 font-medium hidden sm:inline">Sort by:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-neutral-200 rounded-lg pl-3 pr-9 py-2 text-sm text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-primary-700 animate-spin mb-3" />
            <p className="text-sm text-neutral-500">Loading listings...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <AlertCircle className="w-10 h-10 text-primary-700 mb-3" />
            <p className="text-sm font-semibold text-neutral-900 mb-1">Something went wrong</p>
            <p className="text-sm text-neutral-500 mb-4">{error}</p>
            <button
              onClick={fetchListings}
              className="px-4 py-2 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <PackageSearch className="w-12 h-12 text-neutral-300 mb-3" />
            <p className="text-base font-semibold text-neutral-900 mb-1">No listings found</p>
            <p className="text-sm text-neutral-500 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setFilters(defaultFilters);
              }}
              className="px-4 py-2 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Regular listings grid */}
        {!loading && !error && regularListings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularListings.map((listing) => {
              const cat = getCategoryBySlug(listing.category);
              if (!cat) return null;
              return (
                <ListingCard key={listing.id} listing={listing} category={cat} />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
