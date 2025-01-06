import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RequestData } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface RequestBuilderProps {
  onSubmit: (requestData: RequestData) => void
}

export default function RequestBuilder({ onSubmit }: RequestBuilderProps) {
  const [method, setMethod] = useState('GET')
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const requestData: RequestData = {
      method,
      url,
      headers: headers.split('\n').reduce((acc, header) => {
        const [key, value] = header.split(':')
        if (key && value) {
          acc[key.trim()] = value.trim()
        }
        return acc
      }, {} as Record<string, string>),
      body: body || undefined,
    }
    onSubmit(requestData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/4">
              <Label htmlFor="method">Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="HEAD">HEAD</SelectItem>
                  <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
              />
            </div>
          </div>
          <Tabs defaultValue="headers">
            <TabsList>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            <TabsContent value="headers">
              <Textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder="Enter headers (one per line, e.g. Content-Type: application/json)"
                className="font-mono text-sm h-[200px]"
              />
            </TabsContent>
            <TabsContent value="body">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter request body"
                className="font-mono text-sm h-[200px]"
              />
            </TabsContent>
          </Tabs>
          <Button type="submit" className="w-full">Send Request</Button>
        </form>
      </CardContent>
    </Card>
  )
}

