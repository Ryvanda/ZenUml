import React from 'react';
import ZenUMLLogo from './branding/ZenUMLLogo';
import ZenUMLIcon from './branding/ZenUMLIcon';
import { Card } from './ui/card';

const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">ZenUML Brand Identity</h1>
          <p className="text-xl text-gray-400">
            Flexible, Collaborative UML Diagramming Tool
          </p>
        </div>

        {/* Primary Logo */}
        <Card className="bg-[#2b2b2c] border-[#3e3e42] p-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Primary Logo</h2>
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-[#1e1e1e] p-12 rounded-lg">
              <ZenUMLLogo size="large" />
            </div>
            <div className="bg-white p-12 rounded-lg">
              <ZenUMLLogo size="large" className="[&>*]:!text-gray-900 [&_.text-white]:!text-gray-900" />
            </div>
          </div>
        </Card>

        {/* Logo Variations */}
        <Card className="bg-[#2b2b2c] border-[#3e3e42] p-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Logo Sizes</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex items-center justify-center">
              <ZenUMLLogo size="large" />
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex items-center justify-center">
              <ZenUMLLogo size="normal" />
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex items-center justify-center">
              <ZenUMLLogo size="small" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center text-gray-400 text-sm">
            <div>Large (40px)</div>
            <div>Normal (32px)</div>
            <div>Small (24px)</div>
          </div>
        </Card>

        {/* Icon Only */}
        <Card className="bg-[#2b2b2c] border-[#3e3e42] p-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Icon Variations</h2>
          <div className="grid grid-cols-4 gap-8">
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex flex-col items-center justify-center space-y-4">
              <ZenUMLIcon size={64} />
              <span className="text-gray-400 text-sm">64px</span>
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex flex-col items-center justify-center space-y-4">
              <ZenUMLIcon size={48} />
              <span className="text-gray-400 text-sm">48px</span>
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex flex-col items-center justify-center space-y-4">
              <ZenUMLIcon size={32} />
              <span className="text-gray-400 text-sm">32px</span>
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg flex flex-col items-center justify-center space-y-4">
              <ZenUMLIcon size={24} />
              <span className="text-gray-400 text-sm">24px (Favicon)</span>
            </div>
          </div>
        </Card>

        {/* Design Concept */}
        <Card className="bg-[#2b2b2c] border-[#3e3e42] p-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Design Concept</h2>
          <div className="space-y-6 text-gray-300">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Zen Philosophy</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Soft, balanced circular form representing harmony</li>
                  <li>• Clean, minimalist design for clarity</li>
                  <li>• Calm blue gradient evoking peace and focus</li>
                  <li>• Smooth curves and rounded corners</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">UML Integration</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Three overlapping rectangles = UML class diagrams</li>
                  <li>• Layered design = hierarchy and structure</li>
                  <li>• Connecting lines = relationships and associations</li>
                  <li>• Geometric precision with organic flow</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Collaboration</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Interlocking elements = teamwork</li>
                  <li>• Transparent layers = shared visibility</li>
                  <li>• Gradient flow = seamless integration</li>
                  <li>• Multiple depths = concurrent work</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Flexibility</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Overlapping forms = adaptable structure</li>
                  <li>• Soft gradients = smooth transitions</li>
                  <li>• Scalable vector design = responsive</li>
                  <li>• Modern aesthetic = forward-thinking</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="bg-[#2b2b2c] border-[#3e3e42] p-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Color Palette</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="h-24 bg-[#3b82f6] rounded-lg border-2 border-white/20"></div>
              <div className="text-center">
                <p className="text-white font-mono text-sm">#3b82f6</p>
                <p className="text-gray-400 text-xs">Primary Blue</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-[#60a5fa] rounded-lg border-2 border-white/20"></div>
              <div className="text-center">
                <p className="text-white font-mono text-sm">#60a5fa</p>
                <p className="text-gray-400 text-xs">Light Blue</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-[#2563eb] rounded-lg border-2 border-white/20"></div>
              <div className="text-center">
                <p className="text-white font-mono text-sm">#2563eb</p>
                <p className="text-gray-400 text-xs">Deep Blue</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-[#93c5fd] rounded-lg border-2 border-white/20"></div>
              <div className="text-center">
                <p className="text-white font-mono text-sm">#93c5fd</p>
                <p className="text-gray-400 text-xs">Sky Blue</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Usage Guidelines */}
        <Card className="bg-[#2b2b2c] border-[#3e3e42] p-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Usage Guidelines</h2>
          <div className="space-y-4 text-gray-300 text-sm">
            <div className="flex items-start space-x-3">
              <span className="text-green-400 font-bold">✓</span>
              <p>Use the full logo in navigation bars and headers</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-400 font-bold">✓</span>
              <p>Use the icon alone for favicons, app icons, and small spaces</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-400 font-bold">✓</span>
              <p>Maintain clear space around the logo equal to the icon's height</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-400 font-bold">✗</span>
              <p>Don't stretch, rotate, or distort the logo</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-400 font-bold">✗</span>
              <p>Don't use colors outside the defined palette</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-400 font-bold">✗</span>
              <p>Don't place the logo on busy backgrounds that reduce legibility</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogoShowcase;
