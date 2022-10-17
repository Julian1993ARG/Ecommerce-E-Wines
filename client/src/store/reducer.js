// import data from '../dataExample.json'

const initialState = {
  allPublications: [],
  publications: [],
  products: [],
  allProducts: [],
  detailPublication: {},
  detailProduct: {},
  favorites: [],
  carrito: [],
  recomendedPublication: []

}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_PUBLICATIONS':
      return { ...state, allPublications: action.payload, publications: action.payload, error: action.payload }

    case 'GET_BY_ID_PUBLICATION':
      return { ...state, detailPublication: action.payload }
    case 'POST_PUBLICATION':
      return { ...state, detailPublication: action.payload }
    case 'GET_PRODUCTS':
      return { ...state, allProducts: action.payload, products: action.payload }
    case 'GET_BY_ID_PRODUCT':
      return { ...state, detailProduct: action.payload }
    case 'POST_PRODUCT':
      return { ...state, detailProduct: action.payload }
    case 'SEARCH_PRODUCT_BY_NAME':
      return { ...state, detailProduct: action.payload }
    case 'FILTER_PUBLICATIONS':
      return { ...state, publications: action.payload }
    case 'CLEAR_FILTER':
      return { ...state, publications: state.allPublications }
    case 'ADD_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] }
    case 'REMOVE_FAVORITES':
      return { ...state, favorites: state.favorites.filter(fav => fav !== action.payload) }
    case 'ADD_CARRITO':
      return { ...state, carrito: [...state.carrito.filter(p => p.id !== action.payload.id), action.payload] }
    case 'REMOVE_CARRITO':
      return { ...state, carrito: state.carrito.filter(item => item.id !== action.payload) }
    case 'RECOMENDED_PUBLICATIONS':
      return { ...state, recomendedPublication: action.payload }
    default:
      return { ...state }
  }
}
