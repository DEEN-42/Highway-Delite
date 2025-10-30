'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/header/Search';

interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/experiences`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch experiences');
        }

        const result = await response.json();
        
        if (result.success) {
          setExperiences(result.data);
          setFilteredExperiences(result.data);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const filtered = experiences.filter((experience) =>
      experience.title.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredExperiences(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={true} onSearch={handleSearch} searchQuery={searchQuery} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-[#FFD643] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[#161616] text-lg font-medium">Loading Experiences</p>
              <p className="text-[#656565] text-sm">Fetching available adventures...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={true} onSearch={handleSearch} searchQuery={searchQuery} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-center space-y-2 max-w-md">
              <p className="text-red-600 text-xl font-semibold">Failed to Load Experiences</p>
              <p className="text-[#656565] text-sm">{error}</p>
              
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-[#FFD643] text-[#161616] rounded-lg font-medium hover:bg-[#ffd020] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Search functional={true} onSearch={handleSearch} searchQuery={searchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {filteredExperiences.map((experience) => (
            <div key={experience._id} className="w-full max-w-[280px] rounded-xl overflow-hidden">
              <div className="relative w-full h-[170px] bg-gray-200">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full px-4 py-3 bg-[#F0F0F0] flex flex-col gap-5">
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex items-center justify-between gap-2">
                    <h3 className="text-[#161616] font-medium text-base leading-5 truncate flex-1">
                      {experience.title}
                    </h3>
                    <div className="h-[24px] px-2 py-1 bg-[#D6D6D6] rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-[#161616] font-medium text-[11px] leading-4 whitespace-nowrap">
                        {experience.location}
                      </span>
                    </div>
                  </div>
                  <p className="w-full text-[#6C6C6C] font-normal text-xs leading-4 line-clamp-2">
                    {experience.description}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[#161616] font-normal text-xs leading-4">
                      From
                    </span>
                    <span className="text-[#161616] font-medium text-[20px] leading-6">
                      ₹{experience.price}
                    </span>
                  </div>
                  <Link href={`/experience/${experience._id}`}>
                    <button className="w-[99px] h-[30px] px-2 py-[6px] bg-[#FFD643] rounded flex items-center justify-center hover:bg-[#ffd020] transition-colors">
                      <span className="text-[#161616] font-medium text-sm leading-[18px]">
                        View Details
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && !loading && !error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#161616] text-lg">
              {searchQuery 
                ? `No experiences found matching "${searchQuery}"`
                : 'No experiences available at the moment.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
