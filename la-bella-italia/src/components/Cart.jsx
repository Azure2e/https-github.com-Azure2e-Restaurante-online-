import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'

function formatCurrency(num = 0) {
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Cart() {
 const { items, addItem: _addItem, removeItem, updateQty, clearCart, total } = useCart()
  const [open, setOpen] = useState(false)
  const totalItems = items.reduce((acc, it) => acc + (it.qty || 1), 0)

  function sendToWhatsApp() {
    if (!items.length) {
      toast.warning('Seu carrinho está vazio')
      return
    }
    const lines = items.map((it) => `${it.qty}x ${it.title} — ${formatCurrency(it.priceValue)} cada`)
    lines.push('')
    lines.push(`Total: ${formatCurrency(total)}`)
    const message = `Olá! Quero fazer um pedido:\n\n${lines.join('\n')}`
    const url = `https://wa.me/5511977776666?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    toast.success('Abrindo WhatsApp para finalizar o pedido…')
    setOpen(false)
  }

  return (
    <>
      <button className="cart-fab" aria-label="Abrir carrinho" onClick={() => setOpen((s) => !s)}>
        <FiShoppingCart size={22} />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </button>

      <aside className={`cart-drawer ${open ? 'open' : ''}`} role="dialog" aria-label="Carrinho de pedidos">
        <div className="cart-header">
          <h3>Seu Pedido</h3>
          <button className="btn-clear" onClick={() => { clearCart(); toast.info('Carrinho esvaziado') }}>Esvaziar</button>
        </div>

        <div className="cart-body">
          {!items.length && <p style={{ padding: 12 }}>Seu carrinho está vazio — adicione pratos clicando em "Adicionar".</p>}
          {items.map((it, idx) => (
            <div key={idx} className="cart-item">
              <img src={it.img} alt={it.title} onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png' }} />
              <div className="cart-info">
                <h4>{it.title}</h4>
                <div className="cart-controls">
                  <button className="qty-btn" onClick={() => updateQty(idx, (it.qty || 1) - 1)}><FiMinus /></button>
                  <span className="qty">{it.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(idx, (it.qty || 1) + 1)}><FiPlus /></button>
                </div>
                <div className="cart-price">{formatCurrency(it.priceValue * (it.qty || 1))}</div>
              </div>
              <button className="btn-remove" onClick={() => removeItem(idx)} aria-label={`Remover ${it.title}`}><FiTrash2 /></button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <strong>Total:</strong> <span>{formatCurrency(total)}</span>
          </div>
          <div className="cart-actions">
            <button onClick={() => { setOpen(false) }} className="btn-secondary">Continuar navegando</button>
            <button onClick={sendToWhatsApp} className="btn-primary">Enviar pelo WhatsApp</button>
          </div>
        </div>
      </aside>
    </>
  )
}