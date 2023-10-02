import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ShoppingListItemModal from "../../components/list/ShoppingListItemModal";
import ConfirmShoppingListItemDeleteModal from "../../components/list/ConfirmShoppingListItemDeleteModal"

const ShoppingList = ({ shoppingList, listItems }) => {
    const [showShoppingListItemModal, setShowShoppingListItemModal] = useState(false);
    const [showConfirmItemDeleteModal, setShowConfirmItemDeleteModal] = useState(false);
    const [type, setType] = useState("");
    const [activeShoppingListItem, setActiveShoppingListItem] = useState({});

    const closeShoppingListItemModal = () => {
        setActiveShoppingListItem({});
        setShowShoppingListItemModal(false);
        setType("");
    };

    const closeConfirmModal = () => {
        setActiveShoppingListItem({});
        setShowConfirmItemDeleteModal(false);
    };

    const handleAdd = () => {
        setType("Add");
        setShowShoppingListItemModal(true);
    };

    return (
        <div>
            <ShoppingListItemModal
                show={showShoppingListItemModal}
                handleClose={closeShoppingListItemModal}
                type={type}
                shoppingListItem={activeShoppingListItem}
                shoppingListId={shoppingList.id}
            />
            <ConfirmShoppingListItemDeleteModal
                show={showConfirmItemDeleteModal}
                handleClose={closeConfirmModal}
                id={activeShoppingListItem.id}
            />
            <div
                style={{
                    border: "1px solid black",
                    width: "50%"
                }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                    {shoppingList && <h3>{shoppingList.store} - {listItems ? listItems.length : 0} items</h3>}
                    <Button onClick={handleAdd}>Add item</Button>
                </div>
                <Table>
                    <tbody>
                        {listItems && listItems.map((item, idx) => (
                            <tr key={idx} className="d-flex flex-rom justify-content-between">
                                <td>{item.name} </td>
                                <td
                                    style={{
                                        width: "80px"
                                    }}
                                    className="d-flex flex-row justify-content-around"
                                >
                                    <i
                                        className="bi bi-pencil-square icon"
                                        onClick={() => {
                                            setActiveShoppingListItem(item);
                                            setType("Edit");
                                            setShowShoppingListItemModal(true);
                                        }}>
                                    </i>
                                    <i
                                        className="bi bi-trash icon"
                                        onClick={() => {
                                            setActiveShoppingListItem(item);
                                            setShowConfirmItemDeleteModal(true);
                                        }}>
                                    </i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

    )
}









export default ShoppingList;


