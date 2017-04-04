export const AddHost = (Host)=> ({type: "ADD_HOST", Host});
export const AddCategory = (category)=> ({type: "ADD_CATEGORY", category});
export const SearchHosts = (search)=> ({type: "SEARCH_HOSTS", search});
export const FilterCategory = (filter)=> ({type: "SET_FILTER", filter});
export const UpdateHost = (Host, Target)=> ({type: "UPDATE_HOST", Host, Target});
export const ToggleLoader = (loader)=> ({type: "TOGGLE_LOADER", loader});
export const RemoveHost = (hostname)=> ({type: "REMOVE_HOST", hostname});
