const Footer = () => {
  return (
    <div className="banner relative top-[61px] min-h-[400px] w-full bg-white bg-[url(/assets/backgrounds/quaid-lagan-B68Bp4kGxP8-unsplash.jpg)] bg-center grayscale">
      {/* <div className="absolute h-full w-full backdrop-blur-md -z-10"></div> */}
      <div className="isolate p-8 flex flex-col gap-36 md:w-1/2 w-full mx-auto">
        <div>
          <div>
            <p className="text-center text-gray-400 text-md uppercase">Lorem ipsum dolor sit amet?</p>
            <p className="text-center text-2xl text-gray-100 uppercase">Lorem sit ipsum dolor</p>
          </div>
          <div className="mt-16 isolate border-b-2 border-white max-w-[400px] border-opacity-25 hover:border-opacity-100 focus:border-opacity-100 mx-auto">
            <input placeholder="your personal email" className="outline-none bg-transparent text-gray-300 placeholder:text-gray-500 placeholder:uppercase text-sm tracking-wider w-full py-3 px-0" />
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
              <p className="text-gray-400 text-xs tracking-wider">Stripe</p>
              <p className="text-gray-400 text-xs tracking-wider">Clerk</p>
              <p className="text-gray-400 text-xs tracking-wider">Next JS</p>
              <p className="text-gray-400 text-xs tracking-wider">React</p>
              <p className="text-gray-400 text-xs tracking-wider">TypeScript</p>
              <p className="text-gray-400 text-xs tracking-wider">Shadcn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer