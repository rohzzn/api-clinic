import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, X } from 'lucide-react'

interface EnvironmentVariable {
  key: string
  value: string
}

interface EnvironmentVariablesProps {
  variables: EnvironmentVariable[]
  onUpdateVariables: (variables: EnvironmentVariable[]) => void
}

export default function EnvironmentVariables({ variables, onUpdateVariables }: EnvironmentVariablesProps) {
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')

  const addVariable = () => {
    if (newKey && newValue) {
      onUpdateVariables([...variables, { key: newKey, value: newValue }])
      setNewKey('')
      setNewValue('')
    }
  }

  const removeVariable = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index)
    onUpdateVariables(updatedVariables)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="max-h-[200px] overflow-auto space-y-2">
            {variables.map((variable, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={variable.key} readOnly className="font-mono text-sm" />
                <Input value={variable.value} readOnly className="font-mono text-sm" />
                <Button variant="ghost" size="icon" onClick={() => removeVariable(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newKey">Key</Label>
              <Input
                id="newKey"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Variable name"
                className="font-mono"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="newValue">Value</Label>
              <Input
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Variable value"
                className="font-mono"
              />
            </div>
            <Button onClick={addVariable} className="self-end">
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

