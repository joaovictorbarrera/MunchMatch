
function NavBar({page, setPage}: {page:number, setPage: (page: number) => void}) {
    
    return (
        <nav className='flex items-center justify-between'>
            <a className='pt-5 flex items-center gap-1' href='/'>
                <img className="h-50" src="/MunchMatchLogo.png" alt="" />
            </a>
            <ul className="flex gap-25 text-3xl text-mm-text">
                <li><button onClick={() => setPage(1)} className={`${page == 1 ? 'selected' : ''} cursor-pointer`}>Home</button></li>
                <li><button onClick={() => setPage(2)} className={`${page == 2 ? 'selected' : ''} cursor-pointer`}>About</button></li>
                <li><button onClick={() => setPage(3)} className={`${page == 3 ? 'selected' : ''} cursor-pointer`}>Contact</button></li>
            </ul>
        </nav>
    )
}

export default NavBar
