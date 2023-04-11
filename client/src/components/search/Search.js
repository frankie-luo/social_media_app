import React from "react";
import './Search.css'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'

function Search() {
    return (
        <div className="Search">
            <img src={Logo} alt="Logo" className="Logo" />
            <div className="SearchBar">
                <input placeholder="#Explore" />
                <div className="s-icon">
                    <UilSearch/>
                </div>
            </div>
        </div>
    )
}

export default Search