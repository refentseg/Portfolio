import { ChevronLeft, ChevronRight } from "lucide-react";
import { MetaData } from "../app/models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({ metaData, onPageChange }: Props) {
    const{currentPage,totalCount,totalPages,pageSize} =metaData
  
    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    };
  
    return (
      <nav aria-label="Page navigation" className="flex mt-4 justify-end ">
        <ul className="inline-flex gap-x-4">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 ml-0 leading-tight text-gray-200 bg-white/30 backdrop-blur-md  rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <ChevronLeft size={20}/>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 leading-tight text-gray-200  hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === index + 1
                    ? 'bg-green-700 text-white'
                    : 'bg-white/30'
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 leading-tight text-gray-200 bg-white/30 backdrop-blur-sm  rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <ChevronRight size={20}/>
            </button>
          </li>
        </ul>
      </nav>
    );
  }