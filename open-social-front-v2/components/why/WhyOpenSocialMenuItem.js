const WhyOpenSocialMenuItem = () => {
  return(
    <button
      className="btn btn-outline btn-primary font-bold w-full hover:gradient-btn transition-all"
      onClick={() => document.getElementById('why_modal').showModal()}
    >
      Why OpenSocial?
    </button>
  )
}

export default WhyOpenSocialMenuItem
