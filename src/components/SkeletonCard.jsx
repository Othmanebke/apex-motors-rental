export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skel" />
      <div className="skeleton-body">
        <div className="skel skel-line skel-line--short" />
        <div className="skel skel-line skel-line--long" />
        <div className="skeleton-specs">
          {[1,2,3,4].map(i => <div key={i} className="skel skel-spec" />)}
        </div>
        <div className="skeleton-footer">
          <div className="skel skel-price" />
          <div className="skel skel-btn" />
        </div>
      </div>
    </div>
  )
}
