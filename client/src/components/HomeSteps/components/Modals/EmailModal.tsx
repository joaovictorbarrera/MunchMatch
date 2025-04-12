import { FormEvent, useEffect, useState } from "react"

export default function EmailModal({resultLink, setOpen}: {resultLink: string, setOpen: (cond:boolean) => void}) {
    const [emailAddress, setEmailAddress] = useState<string>("")

    function sendToEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL + "/email" : "/email"
        fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({resultLink, emailAddress})
        } )

        setOpen(false)
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
                    <label>Email <input value={emailAddress} onChange={e => setEmailAddress(e.target.value)} type="text" className="bg-white border-2" /></label>
                    <button type="submit" className="bg-mm-secondary text-mm-text p-2 cursor-pointer hover:brightness-90">Submit</button>
                </form>
                <button onClick={() => setOpen(false)} className="cursor-pointer">Close</button>
            </div>
        </div>
    )
}
