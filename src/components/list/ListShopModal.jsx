import { useEffect, useState } from "react"
import { Button, Card, Modal } from "react-bootstrap";
import { useShoppingListItems } from "../../context/ShoppingListItemsProvider";

const ListShopModal = ({ show, handleClose, shoppingList, listItems, shoppingCompleted }) => {
    const [itemsInCart, setItemsInCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [shoppingComplete, setShoppingComplete] = useState(false)
    const { editShoppingListItem, errorMsg } = useShoppingListItems()

    const handleAddToCart = async (item) => {
        setLoading(true)
        const updatedItem = {
            ...item, in_cart: true
        }
        await editShoppingListItem(updatedItem, item.id)
        setItemsInCart((prevItems) => [...prevItems, updatedItem])

        setLoading(false)
    }

    const handleRemoveFromCart = async (item) => {
        setLoading(true)
        const updatedItem = {
            ...item, in_cart: false
        }
        await editShoppingListItem(updatedItem, item.id)
        setItemsInCart([...itemsInCart, updatedItem])
        setShoppingComplete(false)
        setLoading(false)
    }

    const handledCompleteShopping = () => {
        shoppingCompleted(shoppingList)
    }

    useEffect(() => {
        const togo = listItems ? listItems.filter(item => item.in_cart != true) : null
        if (togo?.length === 0) {
            setShoppingComplete(true)
        }
    }, [itemsInCart])

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header className="text-center" closeButton>
                <h2>Shopping at {shoppingList.store}</h2>
            </Modal.Header>

            <Card>
                <Card.Body>
                    {listItems && listItems.map((item, idx) => {
                        return <div key={idx}>
                            {!item.in_cart && <div className="d-flex flex-row justify-content-between">
                                <span>{item.name}</span>
                                <Button disabled={loading} onClick={() => handleAddToCart(item)}>Add to cart</Button>
                            </div>}
                            {item.in_cart && <div className="d-flex flex-row justify-content-between">
                                <span>{item.name}</span>
                                <Button disabled={loading} onClick={() => handleRemoveFromCart(item)}>Remove</Button>
                            </div>}

                        </div>
                    })}
                </Card.Body>
            </Card>

            <Button
                disabled={!shoppingComplete}
                onClick={handledCompleteShopping}
            >Complete Shop</Button>

        </Modal>
    )
}


export default ListShopModal


