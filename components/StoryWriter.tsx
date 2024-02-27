"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import axios from "axios"

function StoryWriter() {
    const [story, setStory] = useState("")
    const [pages, setPages] = useState<number>()
    const [progress, setProgress] = useState("")
    const [started, setStarted] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean | null>(null)
    const [currentTool, setCurrentTool] = useState<string>("")

    const path = "public/stories"

    const handleClick = async () => {
        setStarted(true)
        setFinished(false)
        setProgress("Working...")
        // const response = await axios("/api/run_script", {
        //     story,
        //     pages,
        //     path
        // })
    }

    return (
        <div className="flex flex-col justify-center items-center container">
            <section className="w-[50%] flex flex-col justify-center items-center border m-5 p-5 border-black rounded-md">
                <h1>Write Your Story!</h1>
                <Textarea value={story} onChange={(e) => setStory(e.target.value)} placeholder="Write your story" />
                <h2 className="m-5">How many pages?</h2>
                <Select onValueChange={value => setPages(parseInt(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Page Count" />
                    </SelectTrigger>

                    <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                            <SelectItem key={page} value={page.toString()}>
                                {page}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button onClick={handleClick} disabled={!story || !pages || started} className="mt-5">Generate Story</Button>
            </section>

            <section className="flex-1">
                <div className="flex flex-col-reverse w-80 space-y-2 justify-center bg-gray-800 rounded-md text-gray-200 font-mono h-60 overflow-y-auto">
                    <div>
                        {finished === null && (
                            <>
                                <p className="m-5 animate-pulse">Generating Story...</p>
                                <br />
                            </>
                        )}
                        <span className="mr-5">{">>"}</span>
                        {progress}
                    </div>

                    {currentTool && (
                        <div className="py-10">
                            <span className="mr-5">{">>"}</span>
                            {currentTool}
                        </div>
                    )}

                    {started && (
                        <div>
                            <span className="mr-5 animate-in">{"AI story generator has started"}</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default StoryWriter