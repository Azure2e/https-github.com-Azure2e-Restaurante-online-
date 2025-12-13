import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const MENU = {
  entradas: [
    { title: 'Carpaccio di Manzo', desc: 'Finíssimas fatias de filé mignon com rúcula, parmesão e molho de limão siciliano', price: 'R$ 58,00', img: 'https://images.unsplash.com/photo-1608890230219-4b84e9d6003a?w=800' },
  ],
  principais: [
    { title: 'Ossobuco alla Milanese', desc: 'Jarra de ossobuco braseada por 8h com risotto alla milanese e gremolata', price: 'R$ 128,00', img: 'https://images.unsplash.com/photo-1625937286079-9689a0ef8b6a?w=800' }
  ],
  massas: [
    { title: 'Spaghetti Carbonara', desc: 'Gema de ovo caipira, guanciale crocante, pecorino romano', price: 'R$ 72,00', img: 'https://images.unsplash.com/photo-1621996346565-e3b8d0e6c33a?w=800' }
  ],
  sobremesas: [
    { title: 'Tiramisù', desc: 'O clássico italiano com café espresso, mascarpone e cacau', price: 'R$ 32,00', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' }
  ],
  bebidas: [
    { title: 'Vinho Chianti', desc: 'Vinho tinto italiano clássico, safra 2018', price: 'R$ 150,00', img: 'https://images.unsplash.com/photo-1513618700700-87781dceaa9c?w=800' }
  ]
}

export default function Menu({ openModal }) {
  // Safely derive initial tab value at component initialization
  const defaultTab = (() => {
    try {
      if (typeof window === 'undefined') return 'entradas'
      const q = new URLSearchParams(window.location.search)
      const requested = q.get('tab')
      return requested && MENU[requested] ? requested : 'entradas'
    } catch {
      return 'entradas'
    }
  })()

  const [tab, setTab] = useState(defaultTab)
  const [query, setQuery] = useState('')
  const { addItem } = useCart()

  function fallbackImage(e) { e.target.onerror = null; e.target.src = '/placeholder.png' }

  function handleAddToCart(item) {
    addItem(item)
    toast.success(`${item.title} adicionado ao carrinho!`)
  }

  const filtered = MENU[tab].filter((it) =>
    (it.title + ' ' + it.desc).toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section id="cardapio">
      <h2>Cardápio</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
        <div className="tab-buttons" role="tablist">
          {Object.keys(MENU).map(key => (
            <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => { setTab(key); setQuery('') }} role="tab" aria-selected={tab === key}>
              {key[0].toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', marginBottom: 18, textAlign: 'center' }}>
        <input
          type="search"
          placeholder="Buscar no cardápio — ex: carbonara, risotto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 620, width: '100%', padding: 12, borderRadius: 10, border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}
        />
      </div>

      <div id={tab} className="tab-content active">
        <div className="menu-grid">
          {filtered.map((item, idx) => (
            <div key={idx} className="prato reveal" onClick={() => openModal(item)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') openModal(item) }}>
              <img src={item.img} alt={item.title} onError={fallbackImage} loading="lazy" />
              <div className="prato-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="preco">{item.price}</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn-primary" onClick={(e) => { e.stopPropagation(); handleAddToCart(item) }}>
                      Adicionar
                    </button>
                    <button className="btn-primary" style={{ background: '#999' }} onClick={(e) => { e.stopPropagation(); openModal(item) }}>
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>Nenhum prato encontrado</p>}
        </div>
      </div>
    </section>
  )
}