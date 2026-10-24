import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react'

interface PaginationProps {
  page: number
  setPage: (page: number) => void
  total: number
  limit: number
}

function Pagination({ page, setPage, total, limit }: PaginationProps) {
  const currentPage = page
  const totalPage = Math.ceil(total / limit)

  const handleNext = (): void => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  const handlePrev = (): void => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleClick = (pageNumber: number): void => {
    setPage(pageNumber)
  }

  const renderPages = (): React.ReactNode[] => {
    const numbers: React.ReactNode[] = []
    const startPage = Math.max(1, currentPage - 3)
    const endPage = Math.min(totalPage, currentPage + 3)

    for (let i = startPage; i <= endPage; i++) {
      numbers.push(
        <button
          onClick={() => handleClick(i)}
          key={i}
          className={`w-[35px] h-[35px] rounded-full font-medium flex justify-center items-center
            ${i === currentPage ? 'bg-red-600 border text-white' : 'text-gray-400 border'}
          `}
        >
          {i}
        </button>
      )
    }
    return numbers
  }

  return (
    <div className="flex justify-between items-center md:w-[20%] w-full">
      <ChevronLeftCircle
        size={25}
        onClick={handlePrev}
        className={`cursor-pointer ${currentPage === 1 ? 'text-gray-400' : 'text-red-600'}`}
      />
      {renderPages()}
      <ChevronRightCircle
        size={25}
        onClick={handleNext}
        className={`cursor-pointer ${currentPage === totalPage ? 'text-gray-400' : 'text-red-600'}`}
      />
    </div>
  )
}

export default Pagination