import SubHeroItem from "@/components/home/SubHeroItem"


const SubHero = () => {
  const content = [{
    key: 0,
    imageUrl: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=75",
    title: "Into making social impact?",
    subText: "Contribute with Non-profit Open Source Projects.",
  },
  {
    key: 1,
    imageUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=75",
    title: "Explore and Collaborate!",
    subText: "Find projects by Topics or the Language you love.",
  },
  {
    key: 2,
    imageUrl: "https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=75",
    title: "Looking for active projects?",
    subText: "Find all projects activity data and stats in a single place.",
  }];

  return (
    <div className="container px-6 mx-auto max-w-screen mt-16">
      <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
        {content.map(item =>
          <SubHeroItem key={item.key} imageUrl={item.imageUrl} title={item.title} subText={item.subText} />
        )}
      </div>
    </div>
  )
}

export default SubHero
