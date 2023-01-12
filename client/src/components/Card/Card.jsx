import style from './card.module.css'
/* import { MdFavoriteBorder } from 'react-icons/md' */
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addCarrito, addFavorites, getByPublication, getQuestions, removeCarrito, removeFavorites } from '../../store/actions/actions'

export default function Card ({ id, title, name, image, price, userId, stock, count, socket }) {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites)
  const carrito = useSelector(state => state.carrito)
  const user = useSelector(state => state.user)

  const isInFavorites = (id) => {
    for (let x = 0; x < favorites.length; x++) {
      if (favorites[x].publicationId === id) return true
    }
    return false
  }

  const isInCarrito = (id) => {
    return carrito.some(p => p.id === id)
  }

  const addToCarrito = (id, price, title, image, name, count) => {
    console.log(price)
    window.localStorage.setItem(id, JSON.stringify({ price, title, image, name, count: 1, stock: count }))
    dispatch(addCarrito({ id, price, title, image, name, count: 1, stock: count }))
  }

  /* const addToFavorites = (id, price, title, image, name) => {
    window.localStorage.setItem(id, JSON.stringify({ price, title, image, name }))
    dispatch(addFavorites({ id, price, title, image, name }))
  } */

  const removeFromCarrito = (id) => {
    window.localStorage.removeItem(id)
    dispatch(removeCarrito(id))
  }

  const addFavoritesFunction = (id, publicationId) => {
    dispatch(addFavorites({ userId: id, publicationId }))
    socket.emit('sendFavorite', {
      senderName: user.username,
      receiverId: userId,
      publicationTitle: title
    })
  }

  return (

    <div className={`card ${style.card}`}>
      <Link to={`/publication/${id}`}>
        <div className={style.iconContainer}>
          {user && user.id !== userId &&
            <FaHeart
              className={isInFavorites(id) ? style.iconActive : style.icon} onClick={() => {
                isInFavorites(id)
                  ? dispatch(removeFavorites(
                    user.id,
                    id
                  ))
                  : addFavoritesFunction(user.id, id)
              }}
            />}
          <div />
        </div>
        <div className={`card-img-top ${style.imgContainer}`}>
          <img className={style.img} src={image} alt='Wine-Img' />
        </div>
      </Link>
      <div className={`card-body ${style.dataContainer}`}>
        <div className={`card-text ${style.infoContainer}`}>
          <h3 className={`card-title ${style.title}`}>{title}</h3>
          <div className={style.namePrice}>
            <h4 className={style.name}>{name}</h4>
            <h4 className={style.price}>${price.toLocaleString('MX')}</h4>
          </div>
          <div className={` ${style.btnContainer}`}>
            <Link
              to={`/publication/${id}`} className={`${style.moreBtn}`} onClick={() => {
                dispatch(getByPublication(id))
                dispatch(getQuestions(id))
              }}
            >Más Info
            </Link>
            {console.log(stock, 'count')}
            {(user.id !== userId && stock)
              ? <button
                  className={`${style.addBtn}`} onClick={() => {
                    window.localStorage.getItem(id) ? removeFromCarrito(id) : addToCarrito(id, price, title, image, name, count)
                  }}
                >
                {isInCarrito(id) ? 'Remover' : 'Añadir'}
            </button> //eslint-disable-line
              : null}
          </div>
        </div>
      </div>

    </div>
  )
}
