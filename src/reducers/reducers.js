import Cache from "../utils/Cache";
import {getAllHosts} from "../utils/HostHandler";
import isArray from "lodash/isArray";
let hosts = Cache.get('Hosts');

export const Hosts = (state, action) => {
    switch (action.type) {
      case 'ADD_HOST':
      {
        if (isArray(action.Host)) {
          return state.concat(action.Host);
        }
        let newState = state.filter((item)=>(item.domain !== action.Host.domain));
        newState.unshift(action.Host);
        return newState;
      }
      case
      'SEARCH_HOSTS'
      :
      {

        return hosts.filter((host)=>(host.domain.startsWith(action.search)));
      }
      case
      'REMOVE_HOST'
      :
      {
        let hosts = state.filter(item=>item.domain !== action.hostname);
        return [...hosts]
      }
      case
      'UPDATE_HOST'
      :
      {
        let hosts = state.map(item=> {
          if (item.domain === action.Target) {
            item.domain = action.Host.domain;
            item.ip = action.Host.ip;
            item.ip = action.Host.ip;
            item.active = action.Host.active;
          }
          return item;
        });
        return [...hosts];
      }
      default:
      {
        if (state === undefined) {
          let Hosts = getAllHosts().get('Hosts');
          Cache.set(Hosts, 'Hosts');
          return Hosts;
        }
        return state;
      }
    }
  }
  ;

export const Categories = (categories, action)=> {
  switch (action.type) {
    case "ADD_CATEGORY":
    {
      let $exist = categories.filter((category)=>(category.name === action.category));
      if ($exist.length === 0)
        return categories.concat({name: action.category, active: true})
      return [...categories];
    }
    case "REMOVE_CATEGORY":
    {
      return [...categories]
    }
    default :
    {
      if (categories === undefined) {
        let Categories = Cache.get('Categories') === null ? getAllHosts().get('Categories') : Cache.get('Categories');
        Cache.set(Categories, 'Categories');
        return Categories;
      }
      return categories;
    }
  }
};

export const CategoryFilter = (state = null, action) => {
  switch (action.type) {
    case "SET_FILTER":
    {
      return action.filter;
    }
    default:
    {
      return state === null ? ['Default'] : state;
    }
  }
};

export const Loader = (state = null, action) => {
  switch (action.type) {
    case "TOGGLE_LOADER":
    {
      return action.loader;
    }
    default:
    {
      return state === undefined ? false : state;
    }
  }
};

export const lastAction = (state = null, action) =>action;



