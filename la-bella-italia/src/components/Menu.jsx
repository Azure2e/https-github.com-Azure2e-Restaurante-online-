import React, { useEffect, useState } from 'react'

const MENU = {
  entradas: [
    { title: 'Carpaccio di Manzo', desc: 'Finíssimas fatias de filé mignon com rúcula, parmesão e molho de limão siciliano', price: 'R$ 58,00', img: 'https://images.unsplash.com/photo-1608890230219-4b84e9d6003a?w=800' },
    // adicione mais
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
  const [tab, setTab] = useState('entradas')

  useEffect(() => {
    // default to entradas
    setTab('entradas')
  }, [])

  return (
    <section id="cardapio">
      <h2>Cardápio</h2>

      <div className="tab-buttons">
        {Object.keys(MENU).map(key => (
          <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
            {key[0].toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div id={tab} className="tab-content active">
        <div className="menu-grid">
          {MENU[tab].map((item, idx) => (
            <div className="prato" key={idx} onClick={() => openModal(item)}>
              <img src={item.img} alt="" />
              <div className="prato-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="preco">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}