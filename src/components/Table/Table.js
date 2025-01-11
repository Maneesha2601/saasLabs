import React, { useEffect, useMemo, useState } from 'react';
import { WebUrl} from '../../utilis/data';
import Pagination from '../Pagination/Pagination';
import "./Table.css";


const Table = () =>{
    const [ data , setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    let pageSize = 5;

    const getData = async() => {
        try{
            if(!WebUrl)
            {
                throw new Error("Invalid Url");
            }
            const response = await fetch(WebUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json(); 
            setData(json);
        }
        catch(error) {
            console.log(error);
        }
      
    }
    useEffect(()=>{
        getData()
    },[]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return data.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,pageSize,data]);

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Percentage funded</th>
                        <th>Amount Pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>
                            No data available
                        </td>
                      </tr>)
                    :(currentTableData.map((e) => (
                      <tr key={e["s.no"]}>
                          <td>{e["s.no"]}</td>
                          <td>{e["percentage.funded"]}</td>
                          <td>{e["amt.pledged"]}</td>
                      </tr>
                    )))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={pageSize}
                siblingCount = {1}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}

export default Table;