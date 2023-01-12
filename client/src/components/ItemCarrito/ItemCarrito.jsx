import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCarrito } from '../../store/actions/actions'
// import { useSelector } from 'react-redux'
import Counter from '../Counter/Counter'
import s from './itemCarrito.module.css'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export default function ItemCarrito (props) {
  const { id, title, price, count, image, name, stock } = props
  const dispatch = useDispatch()
  // const countItemCarrito=useSelector

  const removeFromCarrito = (id) => {
    window.localStorage.removeItem(id)
    dispatch(removeCarrito(id))
  }
  return (
    <div className={s.container}>
      <div className={`row border-bottom border-2 fs-4 ${s.item}`}>
        <Row>
          <Col className={s.image}>
            <img className='img-fluid' src={image} alt={image} />
          </Col>
          <Col className={`d-flex flex-column col-4 justify-content-center align-items-left ${s.titleName}`}>
            <Row className='fs-3 text-start'>{title}</Row>
            <Row className='fw-bold'>{name}</Row>
            <Row><span className={`fs-3 fw-semibold text-start ${s.price}`}>$ {price}</span></Row>
          </Col>
          <Col className='d-flex flex-column gap-3 justify-content-center align-items-center'>
            {/* <Row><span className='fs-3 fw-semibold '>$ {price}</span></Row> */}
            <Row><Counter id={id} title={title} price={price} image={image} name={name} count={count} stock={stock} /></Row>
            {/* <span className='fs-3 fw-semibold '>$ {price}</span> */}
            {/* <Counter id={id} title={title} price={price} image={image} name={name} countFromPub={count} /> */}
          </Col>
          {/* <Col className='d-flex align-items-center'>
            <Counter id={id} title={title} price={price} image={image} name={name} countFromPub={count} />
          </Col> */}
          <Col className={`d-flex gap-5 ${s.eliminar}`}>
            <Row>
              <button className={s.button} onClick={() => { removeFromCarrito(id) }}>
                Eliminar
              </button>
            </Row>
            <Row>
              <button className={s.button2}>
                <Link className='text-decoration-none text-dark' to={`/publication/${id}`}>
                  Ver producto
                </Link>
              </button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
