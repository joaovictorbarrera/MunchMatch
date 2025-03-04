function NavBar() {


    return (
        <nav className='flex items-center justify-between'>
            <a className='pt-5 flex items-center gap-1' href='/'>
                <img className="h-50" src="/MunchMatchLogo.png" alt="" />
            </a>
            <ul className="flex gap-25 text-3xl text-mm-text">
                <li><button className="selected">Home</button></li>
                <li><button>About</button></li>
                <li><button>Contact</button></li>
            </ul>
        </nav>
    )
}

export default NavBar
