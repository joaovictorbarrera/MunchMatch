import { useState } from "react";
import { IconContext } from "react-icons";
import { GrMenu } from "react-icons/gr";

function NavBar({page, setPage}: {page:number, setPage: (page: number) => void}) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className='border-b-2 mx-10 border-mm-text'>
            <div className="flex items-center justify-between">
                <a className='pt-5 flex items-center gap-1' href='/'>
                    <img className="h-50" src="/MunchMatchLogo.png" alt="" />
                </a>

                <div className="lg:hidden" >
                    <button onClick={() => setIsOpen(s => !s)}>
                        <IconContext.Provider value={{color: "green", size:"2rem"}}>
                            <GrMenu />
                        </IconContext.Provider>
                    </button>
                </div>

                <ul className="hidden lg:flex gap-25 text-3xl text-mm-text">
                    <li><button onClick={() => setPage(1)} className={`${page == 1 ? 'selected' : ''} cursor-pointer`}>Home</button></li>
                    <li><button onClick={() => setPage(2)} className={`${page == 2 ? 'selected' : ''} cursor-pointer`}>About</button></li>
                    <li><button onClick={() => setPage(3)} className={`${page == 3 ? 'selected' : ''} cursor-pointer`}>Mission</button></li>
                    <li><button onClick={() => setPage(4)} className={`${page == 4 ? 'selected' : ''} cursor-pointer`}>Contact</button></li>
                </ul>
            </div>
            {isOpen && <Menu page={page} setPage={setPage} />}
        </nav>
    )
}

function Menu({page, setPage}: {page:number, setPage: (page: number) => void}) {
    return <ul className="lg:hidden flex flex-col items-center text-center text-2xl text-mm-text">
        <li className="bg-mm-primary w-full p-3 hover:brightness-90"><button onClick={() => setPage(1)} className={`${page == 1 ? 'selected' : ''} cursor-pointer`}>Home</button></li>
        <li className="bg-mm-primary w-full p-3 hover:brightness-90"><button onClick={() => setPage(2)} className={`${page == 2 ? 'selected' : ''} cursor-pointer`}>About</button></li>
        <li className="bg-mm-primary w-full p-3 hover:brightness-90"><button onClick={() => setPage(3)} className={`${page == 3 ? 'selected' : ''} cursor-pointer`}>Mission</button></li>
        <li className="bg-mm-primary w-full p-3 hover:brightness-90"><button onClick={() => setPage(4)} className={`${page == 4 ? 'selected' : ''} cursor-pointer`}>Contact</button></li>
    </ul>
}

export default NavBar
