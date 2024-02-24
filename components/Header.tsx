import { BookOpen, FilePen } from "lucide-react"
import Link from "next/link"

function Header() {
    return (
        <>
            <header className="">
                <div className="flex flex-col justify-center text-center mt-5">
                    <h1 className="text-3xl font-bold">Story Teller AI</h1>
                    <p className="text-2xl font-serif">Bring your story to <span className="font-bold">Life!</span></p>
                </div>
                <div className="flex justify-end gap-2 m-5 absolute -top-2 right-0">
                    <Link href={"/"}><FilePen className="border border-black rounded-md" /></Link>
                    <Link href={"/stories"}><BookOpen className="border border-black rounded-md" /></Link>
                </div>
            </header>
        </>
    )
}

export default Header