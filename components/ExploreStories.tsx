import Link from "next/link"
import { Button } from "./ui/button"

function ExploreStories() {
    return (
        <div className="w-[50%] flex justify-center items-center">
            <section className="flex ">
                <Button asChild>
                    <Link href="/stories">
                        Explore Stories!
                    </Link>
                </Button>
            </section>
        </div>
    )
}

export default ExploreStories