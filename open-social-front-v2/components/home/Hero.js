import SubHero from "@/components/home/SubHero"

const Hero = (props) => {
  return (
    <div className="hero min-h-screen gradient-hero relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="hero-content text-center">
        <div>
          <div className="max-w-screen pb-18 animate-slide-up">
            <h1 className="text-5xl font-black tracking-tight text-white">
              Discover <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">OpenSocial</span>
            </h1>
            <p className="text-xl py-6 text-white/80 max-w-xl mx-auto">Browse open-source projects tackling climate change, poverty, social justice, and more — filtered by topic, language, and activity.</p>
            <p className="text-2xl font-black tracking-tight text-white/90 mb-6">Let&apos;s code a better World!! 🦄</p>
            <button
              className="btn btn-lg m-3 uppercase gradient-btn shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all"
              onClick={props.onClick}
            >
              Explore Projects
            </button>
          </div>
          <SubHero />
        </div>
      </div>
    </div>
  )
}

export default Hero
