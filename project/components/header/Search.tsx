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
      <div className="w-full h-[87px] px-[124px] py-4 flex items-center justify-between">
        <Link href="/" className="w-[100px] h-[55px] relative flex items-center">
          <Image
            src="/HD-Logo.png"
            alt="Highway Delite"
            width={100}
            height={55}
            className="object-contain"
            priority
          />
        </Link>

        <div className="w-[443px] h-[42px] flex items-center gap-4">
          <div className="w-[340px] h-[42px] px-4 bg-[#EDEDED] rounded flex items-center">
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
            className="w-[87px] h-[42px] px-5 bg-[#FFD643] rounded-lg flex items-center justify-center"
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
