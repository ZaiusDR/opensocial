const WhyOpenSocialMenuItem = () => {
  return(
    <li>
      <button className="btn bg-primary font-bold" onClick={() => document.getElementById('why_modal').showModal()}>Why
        OpenSocial?
      </button>
    </li>
  )
}

export default WhyOpenSocialMenuItem
