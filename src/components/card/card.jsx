import './css/card.scss';
import AddToCart from '../../assets/add-icon.svg';


const Card = ({ title, price, description, category, image,item,addToCart }) => {

    const handleAddToCart = () => {
        
        addToCart(item);

    }

    return (
        
    
        <div className="card-wrapper  col-6 col-lg-3 m-3">
            <img src={image} className="card-img" alt="..."/>
            <div className="card-body d-flex flex-column justify-content-center align-items-center mt-4">
                <h5 className="card-title text-light text-center">{`${title.slice(0, 20)}...`}</h5>
                <p className="card-text text-secondary">{category}</p>
                <p className="card-text text-red">${price}</p>
                <button className="d-flex justify-content-center align-items-center">
                    <img src={AddToCart} alt="Add to cart" />
                    <span className='ms-2 text-secondary' onClick={handleAddToCart}
                    >Add to cart</span>
                    
                </button>
            
            </div>
        </div>

    );
}

export default Card;