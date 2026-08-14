import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  Star,
  Phone,
  Mail,
  Share2,
  Heart,
  Tag,
  ChevronRight,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getCategoryBySlug } from '@/lib/categories';
import { formatPrice, timeAgo, formatMileage, formatArea } from '@/lib/format';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchListing = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchError) {
        setError(fetchError.message);
      } else if (!data) {
        setError('Listing not found');
      } else {
        setListing(data);
      }
      setLoading(false);
    };
    fetchListing();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-8 h-8 border-3 border-primary-700 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm text-neutral-500">Loading listing...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <Tag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <p className="text-lg font-semibold text-neutral-900 mb-1">
          {error || 'Listing not found'}
        </p>
        <p className="text-sm text-neutral-500 mb-4">
          This listing may have been removed or is no longer available.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>
      </div>
    );
  }

  const category = getCategoryBySlug(listing.category);

  const formatSpecValue = (field, value) => {
    if (value === null || value === undefined || value === '') return '—';
    if (field.format === 'mileage') return formatMileage(Number(value));
    if (field.format === 'area') return formatArea(Number(value));
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  const conditionBadgeColor = (condition) => {
    switch (condition) {
      case 'New':
        return 'bg-green-600 text-white';
      case 'Certified Pre-Owned':
      case 'Refurbished':
        return 'bg-blue-600 text-white';
      case 'Like New':
        return 'bg-teal-600 text-white';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-neutral-500 mb-4 flex-wrap">
        <Link to="/" className="hover:text-primary-700 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        {category && (
          <>
            <Link
              to={`/category/${category.slug}`}
              className="hover:text-primary-700 transition-colors"
            >
              {category.label}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
          </>
        )}
        <span className="text-neutral-900 font-medium truncate">{listing.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Image + details */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="relative aspect-[16/10] bg-neutral-100 rounded-2xl overflow-hidden mb-4">
            {listing.image_url ? (
              <img
                src={listing.image_url}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                <Tag className="w-16 h-16" />
              </div>
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {listing.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-700 text-white text-xs font-bold rounded-md uppercase tracking-wide shadow-md">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </span>
              )}
              <span
                className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide shadow-md ${conditionBadgeColor(
                  listing.condition
                )}`}
              >
                {listing.condition}
              </span>
            </div>
          </div>

          {/* Title + price (mobile) */}
          <div className="lg:hidden mb-4">
            <h1 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-1">
              {listing.title}
            </h1>
            <p className="text-2xl font-extrabold text-primary-700">
              {formatPrice(listing.price)}
            </p>
            {listing.negotiable && listing.price > 0 && (
              <span className="inline-block mt-1 text-xs text-primary-600 font-medium">
                Price is negotiable
              </span>
            )}
          </div>

          {/* Specs */}
          {category && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-neutral-900 mb-3">Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.specFields.map((spec) => {
                  const value = listing.attributes[spec.attributeKey];
                  return (
                    <div
                      key={spec.key}
                      className="p-3 bg-neutral-50 rounded-lg border border-neutral-100"
                    >
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wide font-semibold mb-0.5">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold text-neutral-800">
                        {formatSpecValue(spec, value)}
                      </p>
                    </div>
                  );
                })}
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <p className="text-[10px] text-neutral-400 uppercase tracking-wide font-semibold mb-0.5">
                    Condition
                  </p>
                  <p className="text-sm font-semibold text-neutral-800">{listing.condition}</p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {listing.description && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-neutral-900 mb-2">Description</h2>
              <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>
          )}

          {/* Safety tips */}
          <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary-700" />
              <h3 className="text-sm font-bold text-primary-900">Safety Tips</h3>
            </div>
            <ul className="text-xs text-primary-700 space-y-1">
              <li>Meet the seller in a safe, public place</li>
              <li>Inspect the item carefully before paying</li>
              <li>Never pay in advance or share sensitive information</li>
            </ul>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-44 space-y-4">
            {/* Price card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5">
              <h1 className="hidden lg:block text-xl font-extrabold text-neutral-900 leading-tight mb-2">
                {listing.title}
              </h1>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-3xl font-extrabold text-primary-700">
                  {formatPrice(listing.price)}
                </p>
              </div>
              {listing.negotiable && listing.price > 0 && (
                <span className="inline-block text-xs text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded-md">
                  Negotiable
                </span>
              )}
              <div className="flex items-center gap-2 mt-3 text-sm text-neutral-500">
                <MapPin className="w-4 h-4" />
                <span>{listing.location || 'Location not specified'}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Posted {timeAgo(listing.created_at)}
              </p>

              {/* Contact buttons */}
              <div className="flex flex-col gap-2 mt-4">
                {listing.seller_phone && (
                  <a
                    href={`tel:${listing.seller_phone}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-700 text-white text-sm font-bold rounded-xl hover:bg-primary-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Seller
                  </a>
                )}
                <button className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-primary-200 text-primary-700 text-sm font-bold rounded-xl hover:bg-primary-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
                <div className="flex gap-2 mt-1">
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 text-neutral-600 text-xs font-medium rounded-lg hover:bg-neutral-50 transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    Save
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 text-neutral-600 text-xs font-medium rounded-lg hover:bg-neutral-50 transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Seller info */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-neutral-900 mb-3">Seller Information</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold text-base">
                  {(listing.seller_name || listing.seller_type).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">
                    {listing.seller_name || listing.seller_type}
                  </p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    {listing.seller_type}
                    {(listing.seller_type === 'Dealer' || listing.seller_type === 'Agent') && (
                      <BadgeCheck className="w-3.5 h-3.5 text-primary-600" />
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Mail className="w-3.5 h-3.5" />
                <span>{listing.seller_phone || 'Contact via phone'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link
          to={category ? `/category/${category.slug}` : '/'}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {category ? category.label : 'Listings'}
        </Link>
      </div>
    </div>
  );
}
