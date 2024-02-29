import gptInstance from "@/lib/StoryBookInstance";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";

export async function POST(req: Request) {
    const { story, pages, path } = await req.json();

    const scriptPath = "app/api/run_script/script.gpt";

    const opts: RunOpts = {
        disableCache: true,
        input: `--story ${story} --pages ${pages} --path ${path}`
    }

    try {
        const encoder = new TextEncoder()
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const run = await gptInstance.run(scriptPath, opts)

                    run.on(RunEventType.Event, (data) => {
                        controller.enqueue(encoder.encode(`event: ${JSON.stringify(data)}\n\n`));
                    })

                    await run.text()
                    controller.close()
                } catch (error) {
                    controller.error(error)
                    console.error(error);
                }
            }
        })
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}