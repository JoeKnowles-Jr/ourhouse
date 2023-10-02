import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ShoppingListModal from "../components/list/ShoppingListModal";
import { useShoppingLists } from "../context/ShoppingListProvider";
import ConfirmShoppingListDeleteModal from "../components/list/ConfirmShoppingListDeleteModal";
import { useShoppingListItems } from "../context/ShoppingListItemsProvider";
import ToastMessage from "../components/ToastMessage";
import ShoppingList from "../components/list/ShoppingList";
import ListShopModal from "../components/list/ListShopModal"

const ShoppingListList = () => {
  const { shoppingListItems } = useShoppingListItems();
  const { shoppingLists, msg, errorMsg } = useShoppingLists();
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [showListShopModal, setShowListShopModal] = useState(false);
  const [type, setType] = useState("");
  const [activeShoppingList, setActiveShoppingList] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const itemsMap = shoppingListItems.reduce((acc, curr) => {
    if (!acc[curr.list]) {
      acc[curr.list] = [];
    }
    acc[curr.list].push(curr);
    return acc;
  }, {});

  const closeShoppingListModal = () => {
    setActiveShoppingList({});
    setShowShoppingListModal(false);
    setType("");
  };

  const closeConfirmShoppingListDeleteModal = () => {
    setActiveShoppingList({});
    setShowConfirmModal(false);
  };

  const closeListShopModal = () => {
    setShowListShopModal(false)
  }

  const handleAdd = () => {
    setType("Add");
    setShowShoppingListModal(true);
  };

  const shoppingCompleted = (shoppingList) => {
    closeListShopModal()
    setActiveShoppingList(shoppingList)
    setShowConfirmModal(true)
  }

  return (
    <div>

      <ToastMessage
        type="Success"
        show={msg ? true : false}
        message={msg}
        handleClose={() => setMsg("")}
      />
      {/* <ToastMessage
        type="Error"
        show={errorMsg ? true : false}
        message={errorMsg}
        handleClose={() => setErrorMsg("")}
      /> */}
      <ShoppingListModal
        show={showShoppingListModal}
        handleClose={closeShoppingListModal}
        type={type}
        shoppingList={activeShoppingList}
      />
      <ConfirmShoppingListDeleteModal
        show={showConfirmModal}
        handleClose={closeConfirmShoppingListDeleteModal}
        id={activeShoppingList.id}
      />
      <ListShopModal
        show={showListShopModal}
        handleClose={closeListShopModal}
        shoppingList={activeShoppingList}
        listItems={itemsMap[activeShoppingList.id]}
        shoppingCompleted={shoppingCompleted}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px"
        }}>
        <h2 className="text-center">ShoppingList List</h2>
        <Button onClick={handleAdd}>Add ShoppingList</Button>
      </div>

      <div
        className="d-flex flex-row justify-content-around">
        <div style={{
          width: "30%"
        }}>

          <Table
            striped
            bordered
            responsive
            variant="dark"
          // style={{ maxWidth: "800px", justifyContent: "center" }}
          >
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Id</th>
                <th style={{ width: "70%" }}>Store</th>
                <th style={{ width: "10%" }}>Items</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shoppingLists && shoppingLists.map((shoppingList, idx) => (
                <tr
                  key={idx}
                  onClick={() => {
                    setActiveShoppingList(shoppingList);
                  }}
                >
                  <td>{idx + 1}</td>
                  <td>{shoppingList.store}</td>
                  <td>{itemsMap[shoppingList.id] && itemsMap[shoppingList.id].length}</td>
                  <td
                    style={{
                      width: "120px"
                    }}
                    className="d-flex flex-row justify-content-around"
                  >
                    <i
                      className="bi bi-pencil-square icon"
                      onClick={() => {
                        setActiveShoppingList(shoppingList);
                        setType("Edit");
                        setShowShoppingListModal(true);
                      }}></i>
                    <i
                      className="bi bi-trash icon"
                      onClick={() => {
                        setActiveShoppingList(shoppingList);
                        setShowConfirmModal(true);
                      }}></i>
                    <i
                      className="bi bi-cart3 icon"
                      onClick={() => {
                        setActiveShoppingList(shoppingList);
                        setShowListShopModal(true);
                      }}>

                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div style={{
          width: "60%"
        }}>
          {activeShoppingList.store && <ShoppingList shoppingList={activeShoppingList} listItems={itemsMap[activeShoppingList.id]} />}
        </div>
      </div>



    </div>
  );
};

export default ShoppingListList;



