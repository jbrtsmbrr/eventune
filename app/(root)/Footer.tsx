import Image from "next/image"

const Footer = () => {
  return (
    <div className="banner relative min-h-[400px] w-full bg-white bg-[url(/assets/backgrounds/quaid-lagan-B68Bp4kGxP8-unsplash.jpg)] bg-center grayscale">
      {/* <div className="absolute h-full w-full backdrop-blur-md -z-10"></div> */}
      <div className="isolate p-8 flex flex-col gap-36 md:w-1/2 w-full mx-auto">
        <div>
          <div>
            <p className="text-center text-gray-400 text-sm uppercase">Get latest offers</p>
            <p className="text-center text-gray-100 uppercase tracking-wider text-lg">Stay connected with us</p>
          </div>
          <div className="mt-16 isolate border-b-2 border-white max-w-[400px] border-opacity-25 hover:border-opacity-100 focus:border-opacity-100 mx-auto">
            <input placeholder="enter your email here" className="outline-none bg-transparent text-gray-300 placeholder:text-gray-500 placeholder:uppercase text-sm tracking-wider w-full py-3 px-0" />
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-12 gap-8 md:max-w-1/2 min-w-[400px] mx-auto">
          <div>
            <p className="text-gray-50 uppercase text-xs mb-4">my contact</p>
            <div className="space-y-2">
              <p className="text-gray-400 text-xs tracking-wider">(+63) 9660037411</p>
              <p className="text-gray-400 text-xs tracking-wider">jbrt.dev@gmail.com</p>
              <p className="text-gray-400 text-xs tracking-wider">Metro Manila, Philippines</p>
            </div>
          </div>
          <div>
            <p className="text-gray-50 uppercase text-xs mb-4">Collaborations</p>
            <div className="space-y-2">
              <p className="text-gray-400 text-xs tracking-wider">Personal Portfolio</p>
              <p className="text-gray-400 text-xs tracking-wider">Eventune</p>
              <p className="text-gray-400 text-xs tracking-wider">TrackMe Suite</p>
              <p className="text-gray-400 text-xs tracking-wider">CosMos</p>
            </div>
          </div>
          <div>
            <p className="text-gray-50 uppercase text-xs mb-4">Resources</p>
            <div className="space-y-2">
              <p className="text-gray-400 text-xs tracking-wider">Shadcn</p>
              <p className="text-gray-400 text-xs tracking-wider">Stripe</p>
              <p className="text-gray-400 text-xs tracking-wider">Clerk</p>
              <p className="text-gray-400 text-xs tracking-wider">Icons8</p>
              <p className="text-gray-400 text-xs tracking-wider">Unsplash</p>
            </div>
          </div>
          <div>
            <p className="text-gray-50 uppercase text-xs mb-4">Social Media</p>
            <div className="space-y-2">
              <p className="text-gray-400 text-xs tracking-wider">LinkedIn</p>
              <p className="text-gray-400 text-xs tracking-wider">Instagram</p>
              <p className="text-gray-400 text-xs tracking-wider">Gmail</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex gap-6 items-center">
            <Image alt="footer-logo" src="/assets/icons/eventune-high-resolution-logo-white-transparent.png" height={90} width={90} className="opacity-50" />
            <p className="text-gray-500 font-bold font-serif tracking-widest text-lg">eventune.</p>
          </div>
          <div className="flex-1 text-right">
           <p className="text-sm text-gray-400">{(new Date().getFullYear())} &copy; Eventune</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Footer