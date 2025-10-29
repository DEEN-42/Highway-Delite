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
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching experiences:', err);
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
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-[#161616] text-lg">Loading experiences...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={true} onSearch={handleSearch} searchQuery={searchQuery} />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-600 text-lg">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Search functional={true} onSearch={handleSearch} searchQuery={searchQuery} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* {searchQuery && (
          <div className="mb-6">
            <p className="text-[#161616] text-lg">
              {filteredExperiences.length} result{filteredExperiences.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiences.map((experience) => (
            <div key={experience._id} className="w-[280px] h-[312px] rounded-xl overflow-hidden">
              <div className="relative w-[280px] h-[170px] bg-gray-200">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[280px] h-[142px] px-4 py-3 bg-[#F0F0F0] flex flex-col gap-5">
                <div className="w-[248px] h-[68px] flex flex-col gap-3">
                  <div className="w-[248px] h-[24px] flex items-center justify-between gap-2">
                    <h3 className="text-[#161616] font-medium text-base leading-5 truncate flex-1">
                      {experience.title}
                    </h3>
                    <div className="h-[24px] px-2 py-1 bg-[#D6D6D6] rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-[#161616] font-medium text-[11px] leading-4 whitespace-nowrap">
                        {experience.location}
                      </span>
                    </div>
                  </div>
                  <p className="w-[248px] h-[32px] text-[#6C6C6C] font-normal text-xs leading-4 line-clamp-2">
                    {experience.description}
                  </p>
                </div>
                <div className="w-[248px] h-[30px] flex items-center justify-between">
                  <div className="h-[24px] flex items-center gap-[6px]">
                    <span className="h-[16px] text-[#161616] font-normal text-xs leading-4">
                      From
                    </span>
                    <span className="h-[24px] text-[#161616] font-medium text-[20px] leading-6">
                      ₹{experience.price}
                    </span>
                  </div>
                  <Link href={`/experience/${experience._id}`}>
                    <button className="w-[99px] h-[30px] px-2 py-[6px] bg-[#FFD643] rounded flex items-center justify-center">
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
