import Image from "next/image"
import Link from "next/link"
function Headers() {
  return <header className="flex p-5 justify-between sticky top-0 bg-slate-50 z-50 shadow-md">
    {/* left div */}
    <div className="flex space-x-2 items-center">
    <Image src=' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4TL6cjvRcIXeMmkPCQpaLlXVak9YDgeUGIhRkU_UACA&s' 
                alt='logo'
                 height={20}
                 width={30}
                 />
  
     <div>
        <h1 className="font-bold"><span className="text-violet-500">AI </span>Image Generator</h1>
        <h2 className="text-xs">Powered by Dall-e, Chat GPT & Microsoft Azure</h2>
     </div>
    </div>
     {/* right side of div */}
     <div className="flex text-xs md:text-base text-gray-500">
        <Link href="https://www.linkedin.com/in/ankita-bose-5a798518b/" className="px-2 font-thin text-right"> My LinkedIn Account </Link>
     </div>
  </header>
     
}

export default Headers