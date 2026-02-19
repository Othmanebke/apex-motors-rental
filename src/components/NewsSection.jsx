const POSTS = [
  {
    id: 1,
    tag: 'Nouveauté',
    title: 'Le Lamborghini Urus SE 2025 est disponible à la location',
    date: '12 fév. 2026',
    img: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'Guide',
    title: 'Top 5 des routes à faire en supercar en France',
    date: '5 fév. 2026',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'Actualité',
    title: 'Location de voitures de luxe : les tendances 2026',
    date: '28 jan. 2026',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
  },
]

export default function NewsSection() {
  return (
    <section className="section-news" id="news">
      <div className="news-header">
        <div>
          <p className="section-label">Restez informés</p>
          <h2 className="section-title">Nos dernières actualités</h2>
        </div>
        <button className="pill-btn outline" style={{ fontSize: '0.78rem', padding: '0.55rem 1.1rem' }}>
          Tout voir →
        </button>
      </div>
      <div className="news-grid">
        {POSTS.map((post) => (
          <div key={post.id} className="news-card">
            <img src={post.img} alt={post.title} className="news-card-img" loading="lazy" />
            <div className="news-card-body">
              <div className="news-card-tag">{post.tag}</div>
              <div className="news-card-title">{post.title}</div>
              <div className="news-card-meta">{post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
