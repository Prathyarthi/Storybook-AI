"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { Frame } from "@gptscript-ai/gptscript"

function StoryWriter() {
    const [story, setStory] = useState<string>("")
    const [pages, setPages] = useState<number>()
    const [progress, setProgress] = useState("")
    const [started, setStarted] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean | null>(null)
    const [currentTool, setCurrentTool] = useState<string>("")
    const [events, setEvents] = useState<Frame[]>([])

    const storiesPath = "public/stories"

    const handleClick = async () => {
        setStarted(true)
        setFinished(false)
        setProgress("Working...")

        const response = await axios.post("/api/run_script", {
            story,
            pages,
            path: storiesPath,
        })

        if (response && response.data) {
            console.log("Streaming started!");

            const reader = response.data.getReader()
            const decoder = new TextDecoder()

            handleStream(reader, decoder)

        }
        else {
            setFinished(true)
            setStarted(false)
            console.log("Failed to start streaming!");
        }
    }

    async function handleStream(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder) {
        while (true) {
            const { done, value } = await reader.read()

            if (done) break;

            const chunk = decoder.decode(value)

            const eventData = chunk
                .split("\n\n")
                .filter((line) => line.startsWith("event:"))
                .map((line) => line.replace(/^event: /, ""))

            eventData.forEach((data) => {
                try {
                    const parsedData = JSON.parse(data)

                    if (parsedData.type === "callProgress") {
                        setProgress(parsedData.output[parsedData.output.length - 1].content)
                        setCurrentTool(parsedData.tool?.description || "")
                    }
                    else if (parsedData.type === "callStart") {
                        setCurrentTool(parsedData.tool?.description || "")
                    }
                    else if (parsedData.type === "runFinish") {
                        setFinished(true)
                        setStarted(false)
                    }
                    else {
                        setEvents((prevEvents) => [...prevEvents], parsedData)
                    }
                } catch (error) {
                    console.log("Failed to parse JSON", error);

                }
            })
        }
    }

    return (
        <div className="lg:flex lg:flex-row flex flex-col justify-center items-center container mt-5 lg:space-x-4">
            <section className="lg:w-[50%] w-full h-96 flex flex-col justify-center items-center border p-2 border-black rounded-md">
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

            <section className="flex-1 w-full">
                <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
                    <div>
                        {finished === null && (
                            <>
                                <p className="mr-5 animate-pulse">Generating Story...</p>
                                <br />
                            </>
                        )}
                        <span className="mr-5">{">>"}</span>
                        {progress}
                    </div>

                    {currentTool && (
                        <div className="py-10">
                            <span className="mr-5">{"[Current Tool]"}</span>
                            {currentTool}
                        </div>
                    )}

                    <div className="space-y-5">
                        {events.map((event, index) => (
                            <div key={index}>
                                <span className="mr-5">{">>"}</span>
                                {renderEventMessage(event)}
                            </div>
                        ))}
                    </div>

                    {started && (
                        <div>
                            <span className="mr-5 animate-in">{"[AI story generator has started]"}</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default StoryWriter