import { Link } from 'react-router-dom';
import { categories } from '@/lib/categories';

export default function HomePage({ searchQuery }) {
  // If there's a search query, show the listings page instead
  if (searchQuery.trim()) {
    return null;
  }

  return (
    <div>
      {/* Category grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary-700 rounded-full" />
          <h2 className="text-lg font-extrabold text-neutral-900">Browse Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group bg-white border border-neutral-200 rounded-xl p-5 flex flex-col items-center text-center hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary-700 transition-colors">
                <cat.icon className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-neutral-900">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
