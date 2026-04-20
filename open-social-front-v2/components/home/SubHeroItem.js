import Image from "next/image"

const SubHeroItem = (props) => {
  return (
    <div
      className="card glass-card shadow-xl overflow-hidden card-hover animate-slide-up"
      style={{ animationDelay: `${props.delay}ms` }}
    >
      <figure className="relative">
        <Image className="object-cover" src={props.imageUrl} alt={props.title} width={600} height={400} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </figure>
      <div className="card-body items-center relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full gradient-btn flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d={props.icon} />
          </svg>
        </div>
        <h2 className="card-title mt-4 text-white">{props.title}</h2>
        <p className="text-white/80">{props.subText}</p>
      </div>
    </div>
  )
}

export default SubHeroItem
