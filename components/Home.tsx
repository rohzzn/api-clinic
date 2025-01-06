'use client'

import { useState } from 'react'
import RequestBuilder from './RequestBuilder'
import ResponseViewer from './ResponseViewer'
import Header from './Header'
import HistoryPanel from './HistoryPanel'
import EnvironmentVariables from './EnvironmentVariables'
import { RequestData, ResponseData } from '@/types'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Download, Upload } from 'lucide-react'
import Footer from './Footer'

export default function Home() {
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [history, setHistory] = useState<RequestData[]>([])
  const [envVariables, setEnvVariables] = useState<{ key: string; value: string }[]>([])

  const handleRequest = async (requestData: RequestData) => {
    if (!requestData.url) {
      toast({
        title: "Error",
        description: "URL is required",
        variant: "destructive",
      })
      return
    }

    try {
      const processedRequest = {
        ...requestData,
        url: replaceEnvVariables(requestData.url),
        headers: Object.fromEntries(
          Object.entries(requestData.headers).map(([key, value]) => [key, replaceEnvVariables(value)])
        ),
      }

      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedRequest),
      })
      const data = await res.json()
      setResponse(data)
      setHistory([{ ...requestData, response: data }, ...history])
    } catch (error) {
      console.error('Error making request:', error)
      setResponse({
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        data: 'Error making request',
      })
    }
  }

  const replaceEnvVariables = (str: string) => {
    return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const variable = envVariables.find(v => v.key === key)
      return variable ? variable.value : `{{${key}}}`
    })
  }

  const exportData = () => {
    const data = {
      history,
      envVariables,
      currentResponse: response
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'api_clinic_data.json'
    a.click()
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          setHistory(data.history || [])
          setEnvVariables(data.envVariables || [])
          setResponse(data.currentResponse || null)
          toast({
            title: "Success",
            description: "Data imported successfully",
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to import data",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <RequestBuilder onSubmit={handleRequest} />
            <ResponseViewer response={response} />
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
              <h2 className="text-lg font-semibold">Import/Export</h2>
              <div className="space-y-2">
                <Button onClick={exportData} className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export Data
                </Button>
                <div>
                  <input
                    type="file"
                    id="import-file"
                    className="hidden"
                    accept=".json"
                    onChange={importData}
                  />
                  <Button asChild variant="outline" className="w-full">
                    <label htmlFor="import-file">
                      <Upload className="mr-2 h-4 w-4" /> Import Data
                    </label>
                  </Button>
                </div>
              </div>
            </div>
            <EnvironmentVariables variables={envVariables} onUpdateVariables={setEnvVariables} />
            <HistoryPanel history={history} onSelectRequest={(req) => handleRequest(req)} />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

