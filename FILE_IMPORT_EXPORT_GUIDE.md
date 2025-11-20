# File Import/Export Implementation Guide

## Overview

Complete guide for implementing file import/export functionality in ZenUML to support multiple formats and tools.

---

## Supported Formats

### Export Formats
1. **ZenUML Native (.uml)** - JSON-based
2. **StarUML (.mdj)** - JSON-based
3. **XMI (.xmi)** - XML-based
4. **SVG (.svg)** - Vector graphics
5. **PNG (.png)** - Raster image
6. **PDF (.pdf)** - Document format

### Import Formats
1. **ZenUML (.uml)**
2. **StarUML (.mdj)**
3. **XMI (.xmi)**
4. **Lucidchart (JSON)**
5. **Draw.io (XML)**

---

## Implementation Architecture

### Backend Structure

```
/backend/
├── export/
│   ├── __init__.py
│   ├── base_exporter.py
│   ├── uml_exporter.py
│   ├── staruml_exporter.py
│   ├── xmi_exporter.py
│   ├── svg_exporter.py
│   └── pdf_exporter.py
│
├── import/
│   ├── __init__.py
│   ├── base_importer.py
│   ├── uml_importer.py
│   ├── staruml_importer.py
│   ├── xmi_importer.py
│   ├── lucidchart_importer.py
│   └── drawio_importer.py
│
└── routes/
    └── file_operations.py
```

### Frontend Structure

```
/frontend/src/
├── components/
│   ├── dialogs/
│   │   ├── ExportDialog.jsx
│   │   └── ImportDialog.jsx
│   ├── panels/
│   │   └── FileOperationsPanel.jsx
│   └── menus/
│       └── FileMenu.jsx
│
├── services/
│   ├── exportService.js
│   └── importService.js
│
└── utils/
    ├── fileConverters.js
    └── formatValidators.js
```

---

## 1. ZenUML Native Format (.uml)

### Export Structure

```json
{
  "version": "2.0",
  "exportDate": "2024-11-18T10:00:00Z",
  "project": {
    "id": "proj-1",
    "name": "My Project",
    "description": "Project description",
    "created": "2024-11-01T00:00:00Z",
    "updated": "2024-11-18T10:00:00Z"
  },
  "diagrams": [
    {
      "id": "diag-1",
      "name": "Class Diagram",
      "type": "class",
      "description": "Main classes",
      "nodes": [
        {
          "id": "node-1",
          "type": "classNode",
          "position": { "x": 100, "y": 100 },
          "data": {
            "label": "User",
            "stereotype": null,
            "attributes": ["id: String", "name: String"],
            "methods": ["getName(): String"]
          }
        }
      ],
      "edges": [
        {
          "id": "edge-1",
          "source": "node-1",
          "target": "node-2",
          "type": "association",
          "data": { "label": "has" }
        }
      ]
    }
  ]
}
```

### Backend Implementation

```python
# /backend/export/uml_exporter.py
from datetime import datetime
import json

class UMLExporter:
    def __init__(self, diagram_data):
        self.diagram_data = diagram_data
    
    def export(self):
        """Export diagram to ZenUML format"""
        export_data = {
            "version": "2.0",
            "exportDate": datetime.utcnow().isoformat() + "Z",
            "project": self._export_project(),
            "diagrams": self._export_diagrams()
        }
        return json.dumps(export_data, indent=2)
    
    def _export_project(self):
        """Export project metadata"""
        return {
            "id": self.diagram_data["project"]["id"],
            "name": self.diagram_data["project"]["name"],
            "description": self.diagram_data["project"].get("description", ""),
            "created": self.diagram_data["project"]["created"],
            "updated": self.diagram_data["project"]["updated"]
        }
    
    def _export_diagrams(self):
        """Export all diagrams"""
        diagrams = []
        for diagram in self.diagram_data["diagrams"]:
            diagrams.append({
                "id": diagram["id"],
                "name": diagram["name"],
                "type": diagram["type"],
                "description": diagram.get("description", ""),
                "nodes": diagram.get("nodes", []),
                "edges": diagram.get("edges", [])
            })
        return diagrams
```

### Frontend Implementation

```javascript
// /frontend/src/services/exportService.js
export const exportToUML = async (projectData) => {
  try {
    const response = await axios.post('/api/export/uml', projectData);
    const blob = new Blob([response.data], { type: 'application/json' });
    downloadFile(blob, `${projectData.project.name}.uml`);
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};

const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};
```

---

## 2. StarUML Format (.mdj)

### Export Structure

```json
{
  "_type": "Project",
  "name": "My Project",
  "ownedElements": [
    {
      "_type": "UMLModel",
      "name": "Model1",
      "ownedElements": [
        {
          "_type": "UMLClassDiagram",
          "name": "Class Diagram",
          "ownedViews": [
            {
              "_type": "UMLClassView",
              "model": { "$ref": "..." },
              "bounds": { "x": 100, "y": 100, "w": 150, "h": 100 }
            }
          ]
        }
      ]
    }
  ]
}
```

### Backend Implementation

```python
# /backend/export/staruml_exporter.py
class StarUMLExporter:
    def __init__(self, diagram_data):
        self.diagram_data = diagram_data
    
    def export(self):
        """Export to StarUML format"""
        return {
            "_type": "Project",
            "name": self.diagram_data["project"]["name"],
            "ownedElements": self._convert_diagrams()
        }
    
    def _convert_diagrams(self):
        """Convert ZenUML diagrams to StarUML format"""
        diagrams = []
        for diagram in self.diagram_data["diagrams"]:
            diagram_type = self._get_staruml_type(diagram["type"])
            diagrams.append({
                "_type": "UMLModel",
                "name": diagram["name"],
                "ownedElements": [{
                    "_type": diagram_type,
                    "name": diagram["name"],
                    "ownedViews": self._convert_elements(diagram)
                }]
            })
        return diagrams
    
    def _get_staruml_type(self, zenuml_type):
        """Map ZenUML diagram type to StarUML type"""
        mapping = {
            "class": "UMLClassDiagram",
            "sequence": "UMLSequenceDiagram",
            "usecase": "UMLUseCaseDiagram"
        }
        return mapping.get(zenuml_type, "UMLDiagram")
```

---

## 3. XMI Format (.xmi)

### Export Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xmi:XMI xmi:version="2.1" 
         xmlns:xmi="http://schema.omg.org/spec/XMI/2.1"
         xmlns:uml="http://www.omg.org/spec/UML/20131001">
  <uml:Model name="MyProject">
    <packagedElement xmi:type="uml:Class" name="User">
      <ownedAttribute name="id" type="String"/>
      <ownedAttribute name="name" type="String"/>
      <ownedOperation name="getName" returnType="String"/>
    </packagedElement>
  </uml:Model>
</xmi:XMI>
```

### Backend Implementation

```python
# /backend/export/xmi_exporter.py
from xml.etree.ElementTree import Element, SubElement, tostring

class XMIExporter:
    def __init__(self, diagram_data):
        self.diagram_data = diagram_data
    
    def export(self):
        """Export to XMI format"""
        xmi = Element('xmi:XMI')
        xmi.set('xmi:version', '2.1')
        xmi.set('xmlns:xmi', 'http://schema.omg.org/spec/XMI/2.1')
        xmi.set('xmlns:uml', 'http://www.omg.org/spec/UML/20131001')
        
        model = SubElement(xmi, 'uml:Model')
        model.set('name', self.diagram_data["project"]["name"])
        
        self._add_elements(model)
        
        return tostring(xmi, encoding='unicode')
    
    def _add_elements(self, parent):
        """Add diagram elements to XMI"""
        for diagram in self.diagram_data["diagrams"]:
            for node in diagram.get("nodes", []):
                self._add_node(parent, node)
```

---

## 4. SVG Export

### Backend Implementation

```python
# /backend/export/svg_exporter.py
class SVGExporter:
    def __init__(self, diagram_data):
        self.diagram_data = diagram_data
    
    def export(self):
        """Export to SVG format"""
        svg = self._create_svg_root()
        
        # Add background
        self._add_background(svg)
        
        # Add edges first (so they appear behind nodes)
        for edge in self.diagram_data.get("edges", []):
            self._add_edge(svg, edge)
        
        # Add nodes
        for node in self.diagram_data.get("nodes", []):
            self._add_node(svg, node)
        
        return self._svg_to_string(svg)
    
    def _create_svg_root(self):
        """Create SVG root element"""
        svg = Element('svg')
        svg.set('xmlns', 'http://www.w3.org/2000/svg')
        svg.set('width', '1200')
        svg.set('height', '800')
        return svg
    
    def _add_node(self, svg, node):
        """Add node to SVG"""
        # Implementation depends on node type
        pass
    
    def _add_edge(self, svg, edge):
        """Add edge to SVG"""
        # Implementation depends on edge type
        pass
```

---

## 5. PDF Export

### Backend Implementation

```python
# /backend/export/pdf_exporter.py
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

class PDFExporter:
    def __init__(self, diagram_data):
        self.diagram_data = diagram_data
    
    def export(self):
        """Export to PDF format"""
        c = canvas.Canvas("diagram.pdf", pagesize=letter)
        
        # Add title
        c.setFont("Helvetica-Bold", 16)
        c.drawString(50, 750, self.diagram_data["project"]["name"])
        
        # Add diagram content
        self._draw_diagram(c)
        
        c.save()
        return open("diagram.pdf", "rb").read()
    
    def _draw_diagram(self, canvas):
        """Draw diagram elements on canvas"""
        # Implementation
        pass
```

---

## 6. Import Implementation

### Base Importer

```python
# /backend/import/base_importer.py
from abc import ABC, abstractmethod

class BaseImporter(ABC):
    def __init__(self, file_content):
        self.file_content = file_content
    
    @abstractmethod
    def validate(self):
        """Validate file format"""
        pass
    
    @abstractmethod
    def import_data(self):
        """Import and convert to ZenUML format"""
        pass
    
    def _validate_structure(self, required_keys):
        """Validate required structure"""
        for key in required_keys:
            if key not in self.file_content:
                raise ValueError(f"Missing required key: {key}")
```

### StarUML Importer

```python
# /backend/import/staruml_importer.py
class StarUMLImporter(BaseImporter):
    def validate(self):
        """Validate StarUML format"""
        required_keys = ["_type", "name", "ownedElements"]
        self._validate_structure(required_keys)
    
    def import_data(self):
        """Convert StarUML to ZenUML format"""
        self.validate()
        
        return {
            "project": {
                "name": self.file_content["name"],
                "description": ""
            },
            "diagrams": self._convert_diagrams()
        }
    
    def _convert_diagrams(self):
        """Convert diagrams"""
        diagrams = []
        for element in self.file_content.get("ownedElements", []):
            if element["_type"] == "UMLModel":
                for owned in element.get("ownedElements", []):
                    diagrams.append(self._convert_diagram(owned))
        return diagrams
```

---

## API Endpoints

### Export Endpoints

```python
# /backend/routes/file_operations.py

@router.post("/api/export/uml")
async def export_uml(project_data: dict):
    """Export to ZenUML format"""
    exporter = UMLExporter(project_data)
    content = exporter.export()
    return FileResponse(
        io.BytesIO(content.encode()),
        media_type="application/json",
        filename=f"{project_data['project']['name']}.uml"
    )

@router.post("/api/export/staruml")
async def export_staruml(project_data: dict):
    """Export to StarUML format"""
    exporter = StarUMLExporter(project_data)
    content = exporter.export()
    return FileResponse(
        io.BytesIO(json.dumps(content).encode()),
        media_type="application/json",
        filename=f"{project_data['project']['name']}.mdj"
    )

@router.post("/api/export/xmi")
async def export_xmi(project_data: dict):
    """Export to XMI format"""
    exporter = XMIExporter(project_data)
    content = exporter.export()
    return FileResponse(
        io.BytesIO(content.encode()),
        media_type="application/xml",
        filename=f"{project_data['project']['name']}.xmi"
    )

@router.post("/api/export/svg")
async def export_svg(diagram_data: dict):
    """Export to SVG format"""
    exporter = SVGExporter(diagram_data)
    content = exporter.export()
    return FileResponse(
        io.BytesIO(content.encode()),
        media_type="image/svg+xml",
        filename=f"{diagram_data['name']}.svg"
    )

@router.post("/api/export/pdf")
async def export_pdf(diagram_data: dict):
    """Export to PDF format"""
    exporter = PDFExporter(diagram_data)
    content = exporter.export()
    return FileResponse(
        io.BytesIO(content),
        media_type="application/pdf",
        filename=f"{diagram_data['name']}.pdf"
    )
```

### Import Endpoints

```python
@router.post("/api/import/uml")
async def import_uml(file: UploadFile):
    """Import from ZenUML format"""
    content = await file.read()
    data = json.loads(content)
    importer = UMLImporter(data)
    result = importer.import_data()
    return result

@router.post("/api/import/staruml")
async def import_staruml(file: UploadFile):
    """Import from StarUML format"""
    content = await file.read()
    data = json.loads(content)
    importer = StarUMLImporter(data)
    result = importer.import_data()
    return result

@router.post("/api/import/xmi")
async def import_xmi(file: UploadFile):
    """Import from XMI format"""
    content = await file.read()
    importer = XMIImporter(content.decode())
    result = importer.import_data()
    return result
```

---

## Frontend Components

### Export Dialog

```javascript
// /frontend/src/components/dialogs/ExportDialog.jsx
import React, { useState } from 'react';

export const ExportDialog = ({ projectData, onClose }) => {
  const [format, setFormat] = useState('uml');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await axios.post(`/api/export/${format}`, projectData);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectData.project.name}.${getExtension(format)}`;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const getExtension = (format) => {
    const extensions = {
      uml: 'uml',
      staruml: 'mdj',
      xmi: 'xmi',
      svg: 'svg',
      pdf: 'pdf'
    };
    return extensions[format];
  };

  return (
    <div className="export-dialog">
      <h2>Export Diagram</h2>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="uml">ZenUML (.uml)</option>
        <option value="staruml">StarUML (.mdj)</option>
        <option value="xmi">XMI (.xmi)</option>
        <option value="svg">SVG (.svg)</option>
        <option value="pdf">PDF (.pdf)</option>
      </select>
      <button onClick={handleExport} disabled={exporting}>
        {exporting ? 'Exporting...' : 'Export'}
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
```

### Import Dialog

```javascript
// /frontend/src/components/dialogs/ImportDialog.jsx
import React, { useState } from 'react';

export const ImportDialog = ({ onImport, onClose }) => {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const format = getFormat(file.name);
      const response = await axios.post(`/api/import/${format}`, formData);
      
      onImport(response.data);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setImporting(false);
    }
  };

  const getFormat = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const formats = {
      uml: 'uml',
      mdj: 'staruml',
      xmi: 'xmi'
    };
    return formats[ext] || 'uml';
  };

  return (
    <div className="import-dialog">
      <h2>Import Diagram</h2>
      <input
        type="file"
        accept=".uml,.mdj,.xmi"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleImport} disabled={!file || importing}>
        {importing ? 'Importing...' : 'Import'}
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
```

---

## Dependencies

### Backend
```
pip install reportlab  # PDF export
pip install lxml       # XML handling
pip install python-pptx # PowerPoint (optional)
```

### Frontend
```
npm install file-saver
npm install jszip       # For multi-file exports
```

---

## Testing

### Backend Tests

```python
# /backend/tests/test_export.py
def test_uml_export():
    data = {...}
    exporter = UMLExporter(data)
    result = exporter.export()
    assert "version" in result
    assert "diagrams" in result

def test_staruml_export():
    data = {...}
    exporter = StarUMLExporter(data)
    result = exporter.export()
    assert result["_type"] == "Project"
```

### Frontend Tests

```javascript
// /frontend/src/services/__tests__/exportService.test.js
describe('exportService', () => {
  it('should export to UML format', async () => {
    const data = {...};
    await exportToUML(data);
    // Verify download
  });
});
```

---

## Conclusion

This implementation provides:
✅ Multiple export formats
✅ Multiple import formats
✅ Format conversion
✅ Data validation
✅ Error handling
✅ User-friendly UI

Ready for implementation!
