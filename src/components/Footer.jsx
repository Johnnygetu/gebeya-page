import { Link } from 'react-router-dom';
import { Store, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { categories } from '@/lib/categories';

export default function Footer() {
  const sections = [
    {
      title: 'Categories',
      links: categories.map((c) => ({ label: c.label, to: `/category/${c.slug}` })),
    },
    {
      title: 'Sell',
      links: [
        { label: 'Post a Listing', to: '/post' },
        { label: 'For Dealers', to: '/post' },
        { label: 'For Agents', to: '/post' },
        { label: 'Pricing', to: '/' },
        { label: 'Seller Guide', to: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/' },
        { label: 'Contact', to: '/' },
        { label: 'Terms & Conditions', to: '/' },
        { label: 'Privacy Policy', to: '/' },
        { label: 'FAQ', to: '/' },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Gebiya</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-xs">
              Ethiopia's smart marketplace. Buy and sell anything — cars, real estate, electronics,
              furniture, and more — no commission, no middleman.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold text-white mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10 pt-6 border-t border-neutral-800">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Phone className="w-4 h-4 text-primary-500" />
            <span>+251 911 234 567</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Mail className="w-4 h-4 text-primary-500" />
            <span>hello@mekina.et</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Gebiya. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">Built for Ethiopia's community.</p>
        </div>
      </div>
    </footer>
  );
}
