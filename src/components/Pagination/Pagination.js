import "./Pagination.css";
import { usePagination } from "./usePagination";
import { DOTS } from "./usePagination";

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
      } = props;

      const paginationrange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
      }); 

    const onPrevious = () => onPageChange(currentPage - 1);
    const onNext = () => onPageChange(currentPage+1);
    
    return(
      <div className="pagination_container">
        <ul>
          {currentPage >1 &&
            <li onClick={onPrevious } >
              <div className="arrow_left"></div>
            </li>
          }
          {paginationrange.map((pagenumber)=>{
              if (pagenumber === DOTS) {
                return <li className="pagination_item">&#8230;</li>;
              }
            return(
              <li key={pagenumber} 
                onClick={()=>onPageChange(pagenumber)} 
                className={`pagenumber_list ${currentPage === pagenumber ? "selected" : ""}`}>
                {pagenumber}
              </li>    
            )
            })
          }
          {currentPage < Math.ceil(totalCount/pageSize) && 
            <li onClick={onNext}>
              <div className="arrow_right"></div>
            </li>
          }
        </ul>
      </div>
    )
}

export default Pagination;