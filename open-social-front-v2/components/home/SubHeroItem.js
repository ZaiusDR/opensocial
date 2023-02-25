import Image from "next/image"

const SubHeroItem = (props) => {
  return (
    <div className="card shadow-xl overflow-hidden">
      <figure><Image className="object-cover" src={props.imageUrl} alt="Shoes" width={600} height={400} priority /></figure>
      <div className="card-body items-center">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.subText}</p>
      </div>
    </div>
  )
}

export default SubHeroItem
