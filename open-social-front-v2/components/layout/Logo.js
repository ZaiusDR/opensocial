import Link from "next/link"

const Logo = (props) => {
  return(
    <Link href="/" className={`${props.visible} flex-0 btn btn-ghost px-2`}>
      <div className="font-title font-extrabold text-3xl">
        <span className="capitalize text-primary">Open</span>
        <span className="capitalize text-base-content">Social</span>
      </div>
    </Link>
  )
}

export default Logo
