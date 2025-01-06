import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RequestData } from '@/types'

interface HistoryPanelProps {
  history: RequestData[]
  onSelectRequest: (request: RequestData) => void
}

export default function HistoryPanel({ history, onSelectRequest }: HistoryPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[300px] overflow-auto">
          {history.map((request, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left p-2 h-auto"
              onClick={() => onSelectRequest(request)}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-primary/10 px-2 py-0.5 rounded text-xs">
                    {request.method}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {request.response?.status}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground truncate">
                  {request.url}
                </span>
              </div>
            </Button>
          ))}
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No requests made yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

