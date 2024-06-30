import React, {useState, useEffect} from "react";
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import Pagination from "../components/Pagination";
import UseStore from "../store/UseStore";
import Filter from "../components/Filter";


const BlogPage = ({loggedIn, addFavorite}) => {
    const {currentPage, paginationStart, paginationEnd, setActivePage} = UseStore()
    const [data,setData] = useState([])
    const slicedData = data.slice(paginationStart, paginationEnd);
    const [filtered, setFiltered] = useState(null)
    const [filterOn, setFilterOn] = useState(false)

    function getPosts() {
        http.get("/getallposts")
            .then(res =>{
                console.log(res)
                setData(res.data.reverse())
            })
    }
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="d-flex flex-column gap-2">
            <Filter data={data} setFiltered={setFiltered} setFilterOn={setFilterOn}></Filter>
            {filterOn ? "" :  <Pagination></Pagination>}
            <div className="d-flex flex-wrap justify-content-center">
                {(filterOn ? filtered : slicedData).map(x => <SinglePost setData={setData} addFavorite={addFavorite}
                                                                         getPosts={getPosts}
                                                                         loggedIn={loggedIn} key={x.id} post={x}/>)}
                {filterOn && filtered.length === 0 && <div>Filter didnt find anything</div>}


            </div>
        </div>

    );
};

export default BlogPage;