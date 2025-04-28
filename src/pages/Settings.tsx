
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    engine: {
      timeout: 30,
      maxModels: 10,
      showAllSteps: true,
      debugMode: false,
    },
    display: {
      showLineNumbers: true,
      darkTheme: false,
      compactView: false,
    },
    export: {
      includeMeta: true,
      formatJson: true,
      includeTimestamp: true,
      appendHtml: false,
    }
  });
  
  const updateSetting = (
    category: 'engine' | 'display' | 'export',
    key: string,
    value: any
  ) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value,
      },
    });
  };
  
  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-500">Configure the Wrongful Foreclosure Law Axion Workbench application</p>
      </div>
      
      <div className="bg-white rounded-xl card-shadow border border-slate-200 p-6">
        <Tabs defaultValue="engine" className="space-y-6">
          <TabsList>
            <TabsTrigger value="engine">Engine</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engine" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">s(CASP) Engine Settings</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="timeout">
                      Computation Timeout (seconds)
                    </label>
                    <Input 
                      id="timeout"
                      type="number" 
                      value={settings.engine.timeout}
                      onChange={(e) => updateSetting('engine', 'timeout', parseInt(e.target.value))}
                      min={1}
                      max={300}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="maxModels">
                      Maximum Models to Generate
                    </label>
                    <Input 
                      id="maxModels"
                      type="number" 
                      value={settings.engine.maxModels}
                      onChange={(e) => updateSetting('engine', 'maxModels', parseInt(e.target.value))}
                      min={1}
                      max={100}
                    />
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="showAllSteps" 
                    checked={settings.engine.showAllSteps}
                    onCheckedChange={(checked) => updateSetting('engine', 'showAllSteps', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="showAllSteps"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show all reasoning steps
                    </label>
                    <p className="text-sm text-slate-500">
                      Displays intermediate steps in the justification
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="debugMode" 
                    checked={settings.engine.debugMode}
                    onCheckedChange={(checked) => updateSetting('engine', 'debugMode', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="debugMode"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Debug mode
                    </label>
                    <p className="text-sm text-slate-500">
                      Enables verbose output and additional debugging information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">Display Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label 
                      htmlFor="showLineNumbers"
                      className="text-sm font-medium text-slate-700"
                    >
                      Show Line Numbers
                    </label>
                    <p className="text-xs text-slate-500">
                      Display line numbers in code previews
                    </p>
                  </div>
                  <Switch 
                    id="showLineNumbers" 
                    checked={settings.display.showLineNumbers}
                    onCheckedChange={(checked) => updateSetting('display', 'showLineNumbers', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label 
                      htmlFor="darkTheme"
                      className="text-sm font-medium text-slate-700"
                    >
                      Dark Theme
                    </label>
                    <p className="text-xs text-slate-500">
                      Use dark theme for the application interface
                    </p>
                  </div>
                  <Switch 
                    id="darkTheme" 
                    checked={settings.display.darkTheme}
                    onCheckedChange={(checked) => updateSetting('display', 'darkTheme', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label 
                      htmlFor="compactView"
                      className="text-sm font-medium text-slate-700"
                    >
                      Compact View
                    </label>
                    <p className="text-xs text-slate-500">
                      Reduce padding and spacing for denser UI
                    </p>
                  </div>
                  <Switch 
                    id="compactView" 
                    checked={settings.display.compactView}
                    onCheckedChange={(checked) => updateSetting('display', 'compactView', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">Export Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="includeMeta" 
                    checked={settings.export.includeMeta}
                    onCheckedChange={(checked) => updateSetting('export', 'includeMeta', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="includeMeta"
                      className="text-sm font-medium leading-none"
                    >
                      Include metadata
                    </label>
                    <p className="text-sm text-slate-500">
                      Add case metadata to exported files
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="formatJson" 
                    checked={settings.export.formatJson}
                    onCheckedChange={(checked) => updateSetting('export', 'formatJson', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="formatJson"
                      className="text-sm font-medium leading-none"
                    >
                      Format JSON
                    </label>
                    <p className="text-sm text-slate-500">
                      Pretty print JSON output with indentation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="includeTimestamp" 
                    checked={settings.export.includeTimestamp}
                    onCheckedChange={(checked) => updateSetting('export', 'includeTimestamp', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="includeTimestamp"
                      className="text-sm font-medium leading-none"
                    >
                      Include timestamp
                    </label>
                    <p className="text-sm text-slate-500">
                      Add generation timestamp to exported files
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="appendHtml" 
                    checked={settings.export.appendHtml}
                    onCheckedChange={(checked) => updateSetting('export', 'appendHtml', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="appendHtml"
                      className="text-sm font-medium leading-none"
                    >
                      Append HTML
                    </label>
                    <p className="text-sm text-slate-500">
                      Append HTML justifications to existing files when exporting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-6 mt-6 border-t border-slate-200">
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
