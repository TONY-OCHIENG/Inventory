import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle } from 'lucide-react'

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
          className={`w-[20px] h-[20px] text-xs  font-medium flex justify-center items-center
            ${i === currentPage ? 'bg-green-600 border text-white' : 'text-gray-400 border'}
          `}
        >
          {i}
        </button>
      )
    }
    return numbers
  }

  return (
    <div className="flex gap-3 justify-end md:w-[20%] w-full ">
      <ChevronLeft
        size={25}
        onClick={handlePrev}
        className={`cursor-pointer border h-5 w-5 ${currentPage === 1 ? 'text-gray-400' : 'text-green-600'}`}
      />
      {renderPages()}
      <ChevronRight
        size={25}
        onClick={handleNext}
        className={`cursor-pointer border h-5 w-5 ${currentPage === totalPage ? 'text-gray-400' : 'text-green-600'}`}
      />
    </div>
  )
}

export default Pagination