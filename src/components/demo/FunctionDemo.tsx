import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchWikipedia } from '@/functions/fetchWikipedia.function'
import { fetchTeampilot } from '@teampilot/sdk'

export const FunctionDemo = async () => {
  const prompt = 'How did Luna 25 land on the moon?'

  const customFunctions = [fetchWikipedia]

  const result = await fetchTeampilot({
    message: prompt,
    accessLevel: 'LINK_WRITE',
    customFunctions,
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Custom Functions</CardTitle>
          <CardDescription>
            Lets checkout how to use custom Functions
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden flex flex-col gap-4">
          <div>
            <strong>Prompt:</strong>
            <div>{prompt}</div>
          </div>
          <div>
            <strong>Functions:</strong>
            <div>{customFunctions?.map((f) => f.nameForAI).join(', ')}</div>
          </div>
          <div>
            <strong>Answer:</strong>
            <div className="italic">{result.message.content}</div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
