"use client"

import { useState } from "react"
import { Button } from "@/front/components/ui/button"
import { Card } from "@/front/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/front/components/ui/tabs"
import { Play, CheckCircle2 } from "lucide-react"

interface TaskInterfaceProps {
  code: string
  setCode: (code: string) => void
  output: string
  runCode: () => void
  checkAnswer: () => void
}

export function TaskInterface({ code, setCode, output, runCode, checkAnswer }: TaskInterfaceProps) {
  const [activeTab, setActiveTab] = useState("code")

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <Tabs defaultValue="code" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
          <TabsList className="bg-gray-200">
            <TabsTrigger value="code">Code Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={runCode} className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="h-4 w-4 mr-1" /> Run Code
            </Button>
            <Button
              size="sm"
              onClick={checkAnswer}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" /> Check Answer
            </Button>
          </div>
        </div>

        <TabsContent value="code" className="m-0">
          <div className="relative h-[500px] font-mono">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 p-4 font-mono text-sm resize-none w-full h-full focus:outline-none"
              spellCheck="false"
            />
          </div>
        </TabsContent>

        <TabsContent value="output" className="m-0">
          <div className="h-[500px] bg-gray-900 text-gray-100 p-4 font-mono text-sm whitespace-pre-wrap overflow-auto">
            {output || "Run your code to see output here..."}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

