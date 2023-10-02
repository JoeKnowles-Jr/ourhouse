import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const ShoppingListContext = createContext({});

export const useShoppingLists = () => useContext(ShoppingListContext);

const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addShoppingList = async (shoppingList) => {
    shoppingList.created_at = new Date();
    shoppingList.updated_at = new Date();
    const { data, error } = await supabase
      .from("lists")
      .insert(shoppingList)
      .select();
    if (data) {
      setShoppingLists((prevShoppingLists) => [...prevShoppingLists, data[0]]);
      setMsg("Shopping list added successfully");
    }
    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const editShoppingList = async (shoppingList, id) => {
    const { data, error } = await supabase
      .from("lists")
      .update(shoppingList)
      .eq("id", id)
      .select();
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("Shopping list updated");
      const updatedShoppingLists = shoppingLists.map((shoppingList) => {
        if (id === shoppingList.id) {
          return { ...shoppingList, ...data[0] };
        }
        return shoppingList;
      });
      setShoppingLists(updatedShoppingLists);
    }
  };

  const deleteShoppingList = async (id) => {
    const { error } = await supabase.from("lists").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMsg("Shopping list deleted successfully");
      setShoppingLists((prevShoppingLists) =>
        prevShoppingLists.filter((shoppingList) => shoppingList.id !== id)
      );
    }
  };

  const fetchAll = async () => {
    const { data, error } = await supabase.from("lists").select();
    if (data) setShoppingLists(data);
    if (error) setErrorMsg("Error in Fetching ShoppingLists");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        addShoppingList,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        editShoppingList,
        deleteShoppingList
      }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListProvider;
