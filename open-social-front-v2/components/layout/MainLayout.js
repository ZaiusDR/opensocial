import Drawer from "@/components/layout/Drawer"
import GoToTopButton from "@/components/UI/GoToTopButton"
import WhyOpenSocialModal from "@/components/why/WhyOpenSocialModal"

const MainLayout = () => {
  return(
    <>
      <WhyOpenSocialModal />
      <Drawer />
      <GoToTopButton />
    </>
  )
}

export default MainLayout
