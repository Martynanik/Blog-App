import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Filter = ({data, setFiltered, setFilterOn}) =>{
    const [selectedDateFrom, setSelectedDateFrom] = useState(null);
    const [selectedDateTill, setSelectedDateTill] = useState(null);

    const [placeholderStartDate, setPlaceholderStartDate] = useState("");
    const [placeholderEndDate, setPlaceholderEndDate] = useState("");

    const nav = useNavigate()
    const refs = {
        name: useRef(),
        title: useRef()
    }
    function FilterItems(command){

        let dataNew = [...data]
        const params = {
            name: refs.name.current.value,
            title: refs.title.current.value,
            startDate: selectedDateFrom,
            endDate: selectedDateTill
        }
        console.log(params.title)
        if(params.name!== "none"){
            dataNew = dataNew.filter(item => item.username === params.name);
            setFilterOn(true)
            console.log(dataNew)

        }
        if(params.title){
            setFilterOn(true)
            const searchedTitle= params.title
            dataNew = dataNew.filter(item => item.title.toLowerCase().includes(searchedTitle.toLowerCase()))
            console.log(dataNew)
        }

        if (selectedDateFrom){
            setFilterOn(true)
            dataNew = dataNew.filter(item => item.timestamp >= Number(params.startDate));
            console.log(dataNew)
        }
        if (selectedDateTill){
            setFilterOn(true)
            dataNew = dataNew.filter(item => item.timestamp <= Number(params.endDate));
            console.log(dataNew)
        }
        setFiltered(dataNew)

        if(command === "clear"  || (!params.title && params.name=== "none" && !selectedDateFrom)){
            setFilterOn(false)
            console.log("suveike clear")
            setPlaceholderStartDate("Pasirinkite datą nuo")
            setPlaceholderEndDate("Pasirinkite datą iki")
        }
    }



    const handleDateChangeStart = date => {
        const specificDate = new Date(date);
        const specificTimestamp = specificDate.getTime();
        setSelectedDateFrom(specificTimestamp);
        setPlaceholderStartDate(specificDate)
        console.log(specificDate)
        console.log(specificTimestamp)
    };
    const handleDateChangeEnd = date => {
        const specificDate = new Date(date);
        const specificTimestamp = specificDate.getTime();
        setSelectedDateTill(specificTimestamp);
        setPlaceholderEndDate(specificDate)
        console.log(specificDate)
        console.log(specificTimestamp)
    };
    return(
        <div className="mb-3">
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex gap-2">
                        <DatePicker
                            onChange={handleDateChangeStart}
                            placeholderText={selectedDateFrom ? `${placeholderStartDate}` : "Pasirinkite datą nuo"}
                            dateFormat="yyyy-MM-dd"

                        />
                        <DatePicker
                            onChange={handleDateChangeEnd}
                            placeholderText={selectedDateTill ? `${placeholderEndDate}` : "Pasirinkite datą iki"}
                            dateFormat="yyyy-MM-dd"

                        />                    </div>
                    <input type="text" ref={refs.title} placeholder="Search for title"/>

                    <select name="name" id="" ref={refs.name}>
                    <option value="none">Select User</option>
                        {data.map((x,i)=>
                            <option value={x.username} key={i}>{x.username}</option>)}
                    </select>

                    <button onClick={FilterItems}>Filter</button>
                    <button onClick={()=>FilterItems("clear")}>Clear Filter</button>
                </div>

        </div>
    )
}

export default Filter