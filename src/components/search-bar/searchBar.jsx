import React from 'react';
import './css/searchBar.scss';
import searchIcon from '../../assets/akar-icons_search.svg'


const SearchBar = ({searchProducts}) => {
    return (
        <div className="input-group input-wrapper  rounded-2 align-items-center d-none d-lg-flex" >
            <div className="input-group-append p-2">
                <img src={searchIcon} alt=""/>
            </div>
            <input type="search"  className="form-control border border-0" placeholder="Search..." onChange={(e) => searchProducts(e.target.value)} />

        </div>
    );
    }

export default SearchBar;

