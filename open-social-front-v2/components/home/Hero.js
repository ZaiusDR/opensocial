import SubHero from "@/components/home/SubHero"

const Hero = (props) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div>
          <div className="max-w-screen pb-18">
            <h1 className="text-5xl font-bold">Welcome to OpenSocial!</h1>
            <p className="text-3xl py-6">A Social Impact Open Source Projects Aggregator</p>
            <button className="btn btn-primary btn-lg m-3 uppercase animate-pulse" onClick={props.onClick}>Start Exploring</button>
          </div>
          <SubHero />
        </div>
      </div>
    </div>
  )
}

export default Hero
