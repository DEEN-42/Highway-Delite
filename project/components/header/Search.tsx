import Image from 'next/image';
import Link from 'next/link';

interface SearchProps {
  functional?: boolean;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Search({ functional = false, onSearch, searchQuery = '' }: SearchProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSearchClick = () => {
    // Search is already happening on input change
    // This button is just for visual consistency
  };

  return (
    <header className="bg-[#F9F9F9] sticky top-0 z-50 shadow-[0_2px_16px_0_rgba(0,0,0,0.1)]">
      <div className="w-full h-auto min-h-[70px] sm:min-h-[87px] px-4 sm:px-8 lg:px-[124px] py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <Link href="/" className="w-[80px] sm:w-[100px] h-[44px] sm:h-[55px] relative flex items-center flex-shrink-0">
          <Image
            src="/HD-Logo.png"
            alt="Highway Delite"
            width={100}
            height={55}
            className="object-contain"
            priority
          />
        </Link>

        <div className="w-full sm:w-auto sm:max-w-[443px] flex items-center gap-2 sm:gap-4">
          <div className="flex-1 sm:w-[340px] h-[42px] px-3 sm:px-4 bg-[#EDEDED] rounded flex items-center">
            <input
              type="text"
              placeholder={functional ? "Search experiences" : ""}
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full bg-transparent border-0 outline-none text-[#2D2D2D] text-sm font-normal leading-[18px] placeholder:text-[#727272]"
              disabled={!functional}
            />
          </div>
          <button 
            onClick={handleSearchClick}
            className="w-[70px] sm:w-[87px] h-[42px] px-3 sm:px-5 bg-[#FFD643] rounded-lg flex items-center justify-center hover:bg-[#ffd020] transition-colors flex-shrink-0"
            disabled={!functional}
          >
            <span className="text-[#161616] text-sm font-normal leading-[18px]">
              Search
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
