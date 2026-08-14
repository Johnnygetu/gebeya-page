import { Link } from 'react-router-dom';
import { MapPin, BadgeCheck, Star, Tag } from 'lucide-react';
import { formatPrice, timeAgo } from '@/lib/format';

export default function ListingCard({ listing, category }) {
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

  const primarySpecs = category.specFields.slice(0, 4);

  const formatSpecValue = (field, value) => {
    if (value === null || value === undefined || value === '') return '—';
    if (field.format === 'mileage') {
      const num = Number(value);
      return num === 0 ? 'New' : `${num.toLocaleString()} km`;
    }
    if (field.format === 'area') return `${Number(value).toLocaleString()} sqm`;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="card-hover bg-white border border-neutral-200 rounded-xl overflow-hidden group block"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300">
            <Tag className="w-10 h-10" />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {listing.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-700 text-white text-[10px] font-bold rounded-md uppercase tracking-wide shadow-sm">
              <Star className="w-2.5 h-2.5 fill-white" />
              Featured
            </span>
          )}
          <span
            className={`inline-flex items-center px-2 py-1 text-[10px] font-bold rounded-md uppercase tracking-wide shadow-sm ${conditionBadgeColor(
              listing.condition
            )}`}
          >
            {listing.condition === 'Certified Pre-Owned' ? 'Certified' : listing.condition}
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="inline-flex items-center px-2 py-1 bg-white/90 backdrop-blur text-neutral-700 text-[10px] font-semibold rounded-md shadow-sm">
            {listing.seller_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-bold text-neutral-900 leading-tight line-clamp-1">
            {listing.title}
          </h3>
          <span className="text-base font-extrabold text-primary-700 whitespace-nowrap">
            {formatPrice(listing.price)}
          </span>
        </div>

        {listing.negotiable && listing.price > 0 && (
          <p className="text-[10px] text-primary-600 font-medium mb-2">Negotiable</p>
        )}

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-xs text-neutral-600 mb-3">
          {primarySpecs.map((spec) => {
            const value = listing.attributes[spec.attributeKey];
            return (
              <div key={spec.key} className="flex items-center gap-1.5 min-w-0">
                <span className="text-neutral-400 shrink-0">{spec.label}:</span>
                <span className="truncate font-medium">{formatSpecValue(spec, value)}</span>
              </div>
            );
          })}
        </div>

        {/* Seller + location */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 min-w-0">
            {listing.seller_type === 'Dealer' || listing.seller_type === 'Agent' ? (
              <BadgeCheck className="w-3.5 h-3.5 text-primary-600 shrink-0" />
            ) : null}
            <span className="truncate font-medium text-neutral-700">
              {listing.seller_name || listing.seller_type}
            </span>
          </div>
          {listing.location && (
            <div className="flex items-center gap-1 text-xs text-neutral-500 shrink-0">
              <MapPin className="w-3 h-3" />
              <span>{listing.location}</span>
            </div>
          )}
        </div>

        <p className="text-[10px] text-neutral-400 mt-1.5">{timeAgo(listing.created_at)}</p>
      </div>
    </Link>
  );
}
