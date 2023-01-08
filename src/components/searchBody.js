import React, {useState, useRef} from "react";

import Input from "./input";
import Button from "./button";
import './style.css'

function SearchBody () {
    const [value,setValue] = useState('');
    const [repo,setRepo] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState("false");
    const timeout = useRef()


    const pageSize = 20;
    let pages = []
    console.log(pages)
    let totalPagesCount = Math.ceil(totalItems/pageSize) 
    

    for (let i=1; i<=totalPagesCount; i++){
        pages.push(i)
    }

    const hendler = () =>{  
        timeout.current = setTimeout(() => {
        (async () => {
            try {
            setLoading("true")
            let gitAPI = `https://api.github.com/search/repositories?q=${value}&per_page=${pageSize}&page=${currentPage}`
            const res = await fetch(gitAPI);
                if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
            const data = await res.json();
                setRepo(data.items)
                setTotalItems(data.total_count)
                console.log(data)
                

            } catch (err) {
            console.log(err)
            setLoading("null");
            }
            
        })();
    }, 600)

    }
    const handleChange = event => {
    setValue(event.target.value);
    }
    function onPageCanged(pageNumber){
        timeout.current = setTimeout(() => {
        (async () => {
            try {
                setLoading("true")
            let gitAPI = `https://api.github.com/search/repositories?q=${value}&per_page=${pageSize}&page=${pageNumber}`
            const res = await fetch(gitAPI);
                if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
            const data = await res.json();
                setRepo(data.items)
                setTotalItems(data.total_count)
                console.log(data)
            } catch (err) {
                setLoading("null");
            }
        })();
    }, 600)

    setCurrentPage(pageNumber)

    }
    function onPageCangedPrew(pageNumber){
        timeout.current = setTimeout(() => {
        (async () => {
            try {
                setLoading("true")
            let gitAPI = `https://api.github.com/search/repositories?q=${value}&per_page=${pageSize}&page=${pageNumber}`
            const res = await fetch(gitAPI);
                if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
            const data = await res.json();
                setRepo(data.items)
                setTotalItems(data.total_count)
                console.log(data)
            } catch (err) {
                setLoading("null");
            }
        })();
        }, 600)

    setCurrentPage(pageNumber-1)
    }
    function onPageCangedNext(pageNumber){
        timeout.current = setTimeout(() => {
        (async () => {
            try {
                setLoading("true")
            let gitAPI = `https://api.github.com/search/repositories?q=${value}&per_page=${pageSize}&page=${pageNumber}`
            const res = await fetch(gitAPI);
                if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
            const data = await res.json();
                setRepo(data.items)
                setTotalItems(data.total_count)
                console.log(data)
            } catch (err) {
                setLoading("null");
            }
        })();
        }, 600)

    setCurrentPage(pageNumber+1)
    }
        return (
    <div className="search-body-wrapper">
            <div className="search-input">
                <Input value={value} change={handleChange}/>
                <Button triger={hendler}/>
            </div>
            {loading === "false" ? (
        <div className="hello-page">
            <span> Введіть назву </span>
        </div>
    ) : loading === "null" ? (
        <div className="notFound">
            <h1>Не знайдено 😢</h1>
            <span>спробуй ще раз</span>
        </div>
    ) : (
            <div className="search-result-wrapper">
        <div className="cards-body-wrapper container">
                <div className="cards-container row">
                { repo.map( ( el ) => (
                    <div className="card col-12">
                        <div className="owner">
                            <div className="avatar">
                            <img src={el.owner.avatar_url} alt="" />
                            </div>
                        </div>
                    <div className="card-wrapper">
                        <div className="card-name">
                        <a href={el.clone_url}>{el.owner.login}/{ el.name }</a>
                        </div>
                        <div className="card-detail">
                            <div className="card-description">
                                <span>{ el.description }</span>
                            </div>
                            <div className="underline">
                            <div className="card-language">
                                <span>{el.language}</span>
                            </div>
                            <div className="card-date">
                                <span>Updated on {el.updated_at}</span>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                    
                )) }
                </div>
        </div>
        <div className="pagination-wrapper">
                <div className="pagination">
                <span className='prewPage' onClick={()=>{onPageCangedPrew(currentPage)}}>prew</span>
                    <div className="wrapMapPages">
            {pages.map(p =>{
                if (p < currentPage + 3 && p >  currentPage - 3) {
                    return <span className={currentPage === p && 'selectedPages' || 'unSelectedPages'} onClick={()=>{onPageCanged(p)}}>{p}</span>
                }
            })}
                    </div>
                <span  className='nextPage' onClick={()=>{onPageCangedNext(currentPage)}}>next</span>
            </div>
        </div>
       
        </div>
        )}
    </div>

    )}

export default SearchBody