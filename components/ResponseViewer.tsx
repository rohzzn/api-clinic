import { ResponseData } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResponseViewerProps {
  response: ResponseData | null
}

export default function ResponseViewer({ response }: ResponseViewerProps) {
  if (!response) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No response yet. Send a request to see the results.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Response
          <span className={`px-2 py-0.5 text-sm rounded-full ${
            response.status >= 200 && response.status < 300 ? 'bg-green-100 text-green-800' :
            response.status >= 400 ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {response.status} {response.statusText}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Headers</h3>
          <div className="relative border rounded-lg overflow-auto max-h-[200px]">
            <pre className="p-4 text-sm font-mono whitespace-pre" style={{ tabSize: 2 }}>
              {JSON.stringify(response.headers, null, 2)}
            </pre>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Body</h3>
          <div className="relative border rounded-lg overflow-auto max-h-[500px]">
            <pre className="p-4 text-sm font-mono whitespace-pre" style={{ tabSize: 2 }}>
              {typeof response.data === 'string'
                ? response.data
                : JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

