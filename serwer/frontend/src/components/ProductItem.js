function ProductItem (props) {
    const { sku, name, price, type, toggleProductDelete, ...description } = props;

    function checkboxHandler (event) {
        toggleProductDelete(sku, event.target.checked);
    }

    const descriptionComponent = {
        DVD:<DVDDescription {...description}/>,
        Book:<BookDescription {...description}/>,
        Furniture:<FurnitureDescription {...description}/>
    }

    return (
        <li className="product-list__item">
            <input type="checkbox" className="delete-checkbox" onChange={checkboxHandler}/> 
            <h4>{sku}</h4>
            <h3>{name}</h3>
            <h4>{price}$</h4>
            {descriptionComponent[type]}
        </li>
    )
}

function DVDDescription (props) {
    const { size } = props;
    return (
    <h4>Size: {size}MB</h4>
    )
}

function BookDescription (props) {
    const { weight } = props;
    return (
        <h4>Weight: {weight}Kg</h4>
    )
}

function FurnitureDescription (props) {
    const { height, width, length } = props;
    return (
        <h4>Dimensions: {height}x{width}x{length}</h4>
    )
}

export default ProductItem;