import React, {useState} from "react";
import http from "../plugins/http";
import {useEffect} from "react";
import UseStore from "../store/UseStore";


const Pagination = () =>{
    const {activePage, setActivePage, currentPage, setCurrentPage,  setPaginationStart, setPaginationEnd} = UseStore()
    const [data,setData] = useState([])
    const [page, setPage] = useState([])
    http.get("/getallposts")
        .then(res =>{
            setData(res.data)
        })

    useEffect(() => {
        const pages = Math.ceil(data.length / 10);
        let newPages = [];
        for (let i = 1; i <= pages; i++) {
            newPages.push(i);
        }
        setPage(newPages);
        setActivePage(currentPage)
    }, [data]);


    function Page(pageNumber) {
        setCurrentPage(pageNumber)
        // console.log(currentPage)
        if(pageNumber===1){
            setPaginationStart(0)
            setPaginationEnd(10)

        } else {
            const lastPage = (pageNumber*10)-1
            const firstPage = lastPage -10
            setPaginationStart(firstPage)
            setPaginationEnd(lastPage)
        }
    };




    return(
        <div className="d-flex gap-1 overflow-scroll">
            {page.map((x,i)=><div onClick={()=>Page(x)}   className={`border p-1 ${activePage === x ? 'active' : ''}`} key={i}>{x}</div>)}

        </div>
    )
}

export default Pagination