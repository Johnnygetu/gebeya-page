import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import ListingsPage from '@/components/ListingsPage';
import ListingDetailPage from '@/components/ListingDetailPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                searchQuery.trim() ? (
                  <ListingsPage searchQuery={searchQuery} />
                ) : (
                  <>
                    <HomePage searchQuery={searchQuery} />
                    <ListingsPage searchQuery={searchQuery} />
                  </>
                )
              }
            />
            <Route
              path="/category/:category"
              element={<ListingsPageWrapper searchQuery={searchQuery} />}
            />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/post" element={<PostPlaceholder />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

function ListingsPageWrapper({ searchQuery }) {
  const { category } = useParams();
  return <ListingsPage categorySlug={category} searchQuery={searchQuery} />;
}

function PostPlaceholder() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h1 className="text-2xl font-extrabold text-neutral-900 mb-2">Post a Listing</h1>
      <p className="text-sm text-neutral-500 mb-6">
        This feature will be available soon. You'll be able to post listings for cars,
        real estate, electronics, furniture, and more.
      </p>
    </div>
  );
}
