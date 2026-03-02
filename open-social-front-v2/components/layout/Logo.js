import Link from "next/link"

const Logo = (props) => {
  return(
    <Link href="https://www.open-social.net" className={`${props.visible} flex-0 btn btn-ghost px-2`}>
      <div className="font-sans font-black tracking-tight text-3xl">
        <span className="gradient-text">Open</span>
        <span className="text-base-content">Social</span>
      </div>
    </Link>
  )
}

export default Logo
