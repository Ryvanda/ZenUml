import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Copy, Download } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const CodeGeneratorModal = ({ open, onClose, nodes }) => {
  const generateJavaCode = () => {
    return nodes
      .filter(node => node.type === 'classNode')
      .map(node => {
        const className = node.data.label;
        const attributes = node.data.attributes || [];
        const methods = node.data.methods || [];
        
        let code = `public class ${className} {\n`;
        
        // Generate attributes
        attributes.forEach(attr => {
          const cleaned = attr.replace(/[+\-#]/g, '').trim();
          code += `    private ${cleaned};\n`;
        });
        
        if (attributes.length > 0) code += '\n';
        
        // Generate methods
        methods.forEach(method => {
          const cleaned = method.replace(/[+\-#]/g, '').trim();
          code += `    public ${cleaned} {\n        // TODO: Implement\n    }\n\n`;
        });
        
        code += `}`;
        return code;
      })
      .join('\n\n');
  };

  const generatePythonCode = () => {
    return nodes
      .filter(node => node.type === 'classNode')
      .map(node => {
        const className = node.data.label;
        const attributes = node.data.attributes || [];
        const methods = node.data.methods || [];
        
        let code = `class ${className}:\n`;
        
        if (attributes.length > 0 || methods.length > 0) {
          code += `    def __init__(self):\n`;
          
          attributes.forEach(attr => {
            const name = attr.split(':')[0].replace(/[+\-#]/g, '').trim();
            code += `        self.${name} = None\n`;
          });
          
          if (attributes.length > 0 && methods.length > 0) code += '\n';
          
          methods.forEach(method => {
            const name = method.split('(')[0].replace(/[+\-#]/g, '').trim();
            code += `    def ${name}(self):\n        # TODO: Implement\n        pass\n\n`;
          });
        } else {
          code += `    pass\n`;
        }
        
        return code;
      })
      .join('\n\n');
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: "The generated code has been copied successfully.",
    });
  };

  const javaCode = generateJavaCode();
  const pythonCode = generatePythonCode();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#252526] border-[#3e3e42] text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle>Code Generator</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="java" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#2a2d2e]">
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="cpp">C++</TabsTrigger>
          </TabsList>
          <TabsContent value="java" className="mt-4">
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4">
              <div className="flex justify-end space-x-2 mb-2">
                <Button size="sm" variant="outline" onClick={() => handleCopy(javaCode)} className="bg-[#2a2d2e] border-[#3e3e42]">
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <ScrollArea className="h-96">
                <pre className="text-sm font-mono text-gray-300">
                  {javaCode || '// No classes to generate'}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="python" className="mt-4">
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4">
              <div className="flex justify-end space-x-2 mb-2">
                <Button size="sm" variant="outline" onClick={() => handleCopy(pythonCode)} className="bg-[#2a2d2e] border-[#3e3e42]">
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <ScrollArea className="h-96">
                <pre className="text-sm font-mono text-gray-300">
                  {pythonCode || '# No classes to generate'}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="cpp" className="mt-4">
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4">
              <ScrollArea className="h-96">
                <pre className="text-sm font-mono text-gray-300">
                  // C++ code generation coming soon...
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CodeGeneratorModal;