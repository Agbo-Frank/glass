import './search.css'
import { useState } from 'react'
import {Image} from 'cloudinary-react';
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import { ToggleVar, ToggleFunc } from '../../Apollo/reactiveVariables/Toggle';
import { SEARCH } from '../../Apollo/Operations/queries'

function SearchItem( {product}){
    return(
        <div className="searchItem">
            <Image cloudName="agbofrank" publicId={product.image} secure="true"></Image>
            <div>
                <h5>{product.name}</h5>
                <p>{product.category}</p>
            </div>
        </div>
    )
}

function Search(){
    const [word, setWord] = useState('')
    const [search, {loading, data}] = useLazyQuery(SEARCH)

    const toggle = useReactiveVar(ToggleVar)

    function searching(e){
        setWord(e.target.value)
        console.log(word)
        search({
            variables:{
                word
            }
        })
    }
    return (
    <div className={`search ${toggle[0]?.search && "active"}`}>
        <div className="search-header">
            <div>
                <i className="fa fa-search"></i>
                <input 
                type="text"
                placeholder="Search..."
                value={word}
                onChange={(e) => searching(e)}
                 />
                <i class="fa fa-times" onClick={() => {
                    setWord('')
                    ToggleFunc({type: 'CLOSE_SEARCH_PAGE'})
                    }}></i>
            </div>
        </div>
        <div>
            {
                data?.search?.map((product, i) => (
                    <SearchItem product={product} key={i} />
                ))
            }
        </div>
    </div>
    )
}

export default Search