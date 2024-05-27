import { useEffect, useState } from "react"

const GoToTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  }, [])

  const handleVisibleButton = () => {
    setShowGoTop( window.scrollY > 1000 )
  }

  const handleScrollUp = () => {
    window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
  }

  return (
    <button
      className={`${showGoTop ? "" : "hidden"} btn btn-circle btn-primary !fixed bottom-8 end-8 shadow-md animate-fade`}
      onClick={handleScrollUp}
    >
      <span className="[&>svg]:w-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </span>
    </button>
  )
}

export default GoToTopButton
