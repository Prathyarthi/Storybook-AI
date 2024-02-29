import Link from "next/link"
import { Button } from "./ui/button"

function ExploreStories() {
    return (
        <div className="">
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