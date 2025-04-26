import { useContext } from "react";
import { StoreContext } from "../api/stores/store";

export function useStore() {
    return useContext(StoreContext);
}
