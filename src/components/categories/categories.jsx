import React from 'react';
import './css/categories.scss';


const Categories = ({categoryItems, filterProducts}) => {
    return (
        <>
        <div className="categories-wrapper d-flex d-md-flex flex-column  flex-wrap">
            <div className="categories-item">
                {categoryItems.map((category,id) => {
                    return (
                        <button className="categories-link" key={id}
                        onClick={() => filterProducts(category)}
                        >{category}</button>
                    )
                })}
                    <button className="categories-link"
                    onClick={() => filterProducts('All')} 
                    >All</button>
            
            </div>
        
        </div>
        </>

    );
}

export default Categories;
