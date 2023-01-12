import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import ItemCarrito from '../ItemCarrito/ItemCarrito'
import style from './carrito.module.css'
import PagarMP from '../MercadoPago/PagarMP'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Cookies from 'universal-cookie'
import { paymentAmount } from '../../store/actions/actions'

export default function Carrito () {
  const carrito = useSelector(state => state.carrito)
  /* const user = useSelector(state => state.user) */
  const history = useHistory()
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const token = cookies.get('TOKEN')
  const user = useSelector(state => state.user)
  const totalAmount = carrito.reduce((acumulador, pactual) => {
    const total = (parseInt(pactual.price) * parseInt(pactual.count))
    return acumulador + total
  }, 0)
  const paymentTotalAmount = totalAmount + 350
  useEffect(() => {
    dispatch(paymentAmount(paymentTotalAmount))
  }, [carrito])
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
            : <div className={style.noCart}><h3>No has agregado nada al carrito aún!</h3><Link className={style.linkBack} to='/home'>Ir a la Tienda</Link></div>}
        </Col>
        {carrito.length > 0
          ? <Col className={`d-flex flex-column col-3 gap-5 ${style.containerOrden}`}>
            <Row className='fs-3 fw-bold'>
              Resumen de orden
            </Row>
            <Row className='fs-4 w-75'>
              <Col className='text-start'>
                <p> Costo de envio a {user.region ? user.region : 'su domicilio'}:</p>
              </Col>
              <Col className='text-end'>
                <span className='fw-bold fs-3'> $ 0</span>
              </Col>
            </Row>
            <Row className='fs-4 w-75 border-bottom border-dark mb-4'>
              <Col className='text-start'>
                <p> Total con envio: </p>
              </Col>
              <Col className='text-end'>
                <span className='fw-bold fs-3'> $ {carrito.length > 0
                  ? totalAmount
                  : 'No hay productos en el carrito'}
                </span>
              </Col>
            </Row>
            {token
              ? <>
                <Link className={`text-decoration-none text-light ${style.button}`} to='/payment'>
                  Pagar con stripe
                </Link>
                <div className={style.button}>
                  <PagarMP />
                </div>  </> // eslint-disable-line
              : history.push('/register')}

            </Col> //eslint-disable-line
          : null}
      </Row>
    </div>
  )
}
