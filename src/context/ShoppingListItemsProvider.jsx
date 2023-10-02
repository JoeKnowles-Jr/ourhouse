import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const ShoppingListItemContext = createContext({});

export const useShoppingListItems = () => useContext(ShoppingListItemContext);

const ShoppingListItemProvider = ({ children }) => {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addShoppingListItem = async (shoppingListItem) => {
    shoppingListItem.created_at = new Date();
    shoppingListItem.updated_at = new Date();
    const { data, error } = await supabase
      .from("listItems")
      .insert(shoppingListItem)
      .select();
    if (data) {
      setShoppingListItems((prevShoppingListItems) => [...prevShoppingListItems, data[0]]);
      setMsg("Shopping list item added successfully");
    }
    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const editShoppingListItem = async (shoppingListItem, id) => {
    shoppingListItem.updated_at = new Date();
    const { data, error } = await supabase
      .from("listItems")
      .update(shoppingListItem)
      .eq("id", id)
      .select();
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("Shopping list item updated");
      const updatedShoppingListItems = shoppingListItems.map((shoppingListItem) => {
        if (id === shoppingListItem.id) {
          return { ...shoppingListItem, ...data[0] };
        }
        return shoppingListItem;
      });
      setShoppingListItems(updatedShoppingListItems);
    }
  };

  const deleteShoppingListItem = async (id) => {
    const { error } = await supabase.from("listItems").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMsg("Shopping list item deleted successfully");
      setShoppingListItems((prevShoppingListItemss) =>
      prevShoppingListItemss.filter((shoppingListItem) => shoppingListItem.id !== id)
      );
    }
  };

  const fetchAll = async () => {
    const { data, error } = await supabase.from("listItems").select();
    if (data) setShoppingListItems(data);
    if (error) setErrorMsg("Error in Fetching shopping list items");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <ShoppingListItemContext.Provider
      value={{
        shoppingListItems,
        addShoppingListItem,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        editShoppingListItem,
        deleteShoppingListItem
      }}>
      {children}
    </ShoppingListItemContext.Provider>
  );
};

export default ShoppingListItemProvider;
