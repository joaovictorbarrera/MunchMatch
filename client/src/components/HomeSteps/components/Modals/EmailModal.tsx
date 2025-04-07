import { FormEvent, useEffect } from "react"

export default function EmailModal({setOpen}: {setOpen: (cond:boolean) => void}) {

    function sendToEmail(e: FormEvent<HTMLFormElement>) {
        //TODO
        e.preventDefault()
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="w-full h-full absolute left-0 top-0 flex justify-center items-start">
            <div onClick={() => setOpen(false)} className="absolute bg-black opacity-50 h-full w-full z-0">
            </div>
            <div className="mt-[40vh] flex flex-col gap-10 bg-mm-bg w-150 opacity-100 z-10 rounded-2xl p-5 relative">
                <header className="text-mm-text text-2xl">Send results to email</header>
                <form onSubmit={sendToEmail} className="flex flex-col items-center gap-5">
                    <label>Email <input type="text" className="bg-white border-2" /></label>
                    <button type="submit" className="bg-mm-secondary text-mm-text p-2 cursor-pointer hover:brightness-90">Submit</button>
                </form>
                <button onClick={() => setOpen(false)} className="cursor-pointer">Close</button>
            </div>
        </div>
    )
}
