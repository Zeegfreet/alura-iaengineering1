import bannerLogin from '../../../assets/banner_login.png'

export function AuthBanner() {
  return (
    <aside className="hidden md:block">
      <img
        src={bannerLogin}
        alt=""
        className="h-full w-full rounded-xl object-cover"
      />
    </aside>
  )
}
