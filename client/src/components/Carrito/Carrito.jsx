import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import ItemCarrito from '../ItemCarrito/ItemCarrito'
import style from './carrito.module.css'
import PagarMP from '../MercadoPago/PagarMP'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Cookies from 'universal-cookie'

export default function Carrito () {
  const carrito = useSelector(state => state.carrito)
  /* const user = useSelector(state => state.user) */
  const history = useHistory()
  const cookies = new Cookies()
  const token = cookies.get('TOKEN')
  const user = useSelector(state => state.user)
  const totalAmount = carrito.reduce((acumulador, pactual) => {
    const total = (parseInt(pactual.price) * parseInt(pactual.count))
    return acumulador + total
  }, 0)

  return (
    <div className={style.container}>
      <Row className={`${style.cont}`}>
        <Col className={`d-flex flex-column col-9 gap-3 ${style.containerItems}`}>
          {carrito.length > 0
            ? carrito.map(p => {
              return (
                <ItemCarrito key={p.id} id={p.id} title={p.title} price={p.price} count={p.count} image={p.image} name={p.name} stock={p.stock} />
              )
            })
            : <h3 className='fs-4'>No has agregado nada al carrito aún!</h3>}
        </Col>
        <Col className={`d-flex flex-column col-3 gap-5 ${style.containerOrden}`}>
          <Row className='fs-3 fw-bold'>
            Resumen de orden
          </Row>
          <Row className='fs-4 w-75'>
            <Col className='text-start'>
              <p> Costo de envio a {user.region && user.region !== null && user.region !== 'null' ? user.region : 'su domicilio'}:</p>
            </Col>
            <Col className='text-end'>
              <span className='fw-bold fs-3'> $ 350</span>
            </Col>
          </Row>
          <Row className='fs-4 w-75 border-bottom border-dark mb-4'>
            <Col className='text-start'>
              <p> Total con envio: </p>
            </Col>
            <Col className='text-end'>
              <span className='fw-bold fs-3'> $ {carrito.length > 0
                ? totalAmount + 350
                : 'No hay productos en el carrito'}
              </span>
            </Col>
          </Row>
          {/* <Link className={`text-decoration-none text-light ${style.button}`} to={`/payment/${totalAmount}`}>
            Pagar con stripe
          </Link> */}
          <div className={style.button}>
            <PagarMP />
          </div>
          {token
            ? <button className={style.button}>
              <Link className='text-decoration-none text-light' to={`/payment/${totalAmount}`}>
                Pagar
              </Link>
              </button> //eslint-disable-line
            : history.push('/register')}
          {token ? <PagarMP /> : history.push('/register')}

        </Col>
      </Row>
    </div>
  )
}
