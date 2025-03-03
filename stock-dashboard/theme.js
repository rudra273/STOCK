import React from 'react';

const ColorPalettePreview = () => {
  // Light mode palette
  const lightPalette = {
    background: '#F5F8FA',
    surface: '#FFFFFF',
    primary: '#2563EB',
    secondary: '#6366F1',
    accent: '#0EA5E9',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
    chartColors: ['#2563EB', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']
  };

  // Dark mode palette
  const darkPalette = {
    background: '#111827',
    surface: '#1F2937',
    primary: '#3B82F6',
    secondary: '#818CF8',
    accent: '#38BDF8',
    success: '#34D399',
    danger: '#F87171',
    warning: '#FBBF24',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
    chartColors: ['#3B82F6', '#A78BFA', '#34D399', '#FBBF24', '#F87171']
  };

  // Mock dashboard component to show the colors in context
  const MockDashboard = ({ mode, palette }) => {
    const bgColor = mode === 'light' ? palette.background : palette.background;
    const textColor = mode === 'light' ? palette.textPrimary : palette.textPrimary;
    
    return (
      <div className="w-full p-6 rounded-lg" style={{ backgroundColor: bgColor, color: textColor }}>
        <h2 className="text-xl font-bold mb-4">{mode === 'light' ? 'Light Mode' : 'Dark Mode'} Dashboard</h2>
        
        {/* Color swatches */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Primary Colors</h3>
            <div className="flex flex-col gap-2">
              <ColorSwatch name="Background" color={palette.background} />
              <ColorSwatch name="Surface" color={palette.surface} />
              <ColorSwatch name="Primary" color={palette.primary} />
              <ColorSwatch name="Secondary" color={palette.secondary} />
              <ColorSwatch name="Accent" color={palette.accent} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Functional Colors</h3>
            <div className="flex flex-col gap-2">
              <ColorSwatch name="Success" color={palette.success} />
              <ColorSwatch name="Danger" color={palette.danger} />
              <ColorSwatch name="Warning" color={palette.warning} />
              <ColorSwatch name="Text Primary" color={palette.textPrimary} />
              <ColorSwatch name="Text Secondary" color={palette.textSecondary} />
            </div>
          </div>
        </div>
        
        {/* Chart colors */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Chart Colors</h3>
          <div className="flex gap-2">
            {palette.chartColors.map((color, index) => (
              <div 
                key={index} 
                className="w-8 h-8 rounded-full" 
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        
        {/* Dashboard preview */}
        <div 
          className="p-4 rounded-lg mb-4" 
          style={{ backgroundColor: palette.surface, color: palette.textPrimary, border: `1px solid ${palette.border}` }}
        >
          <h3 className="text-sm font-medium mb-2">Stock Performance</h3>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 h-24 rounded-md" 
                style={{ 
                  backgroundColor: palette.surface, 
                  border: `1px solid ${palette.border}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div className="p-2">
                  <div className="text-xs" style={{ color: palette.textSecondary }}>Stock {i+1}</div>
                  <div className="font-bold">$284.75</div>
                  <div className="text-xs" style={{ color: i % 2 === 0 ? palette.success : palette.danger }}>
                    {i % 2 === 0 ? '+2.4%' : '-1.2%'}
                  </div>
                  <div className="mt-2 h-8 w-full">
                    <div 
                      className="h-full w-full rounded-sm" 
                      style={{ 
                        background: `linear-gradient(90deg, ${palette.chartColors[i % palette.chartColors.length]} 0%, transparent 100%)`,
                        opacity: 0.5
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="h-40 w-full rounded-md p-2" 
            style={{ 
              backgroundColor: palette.surface, 
              border: `1px solid ${palette.border}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div className="text-sm font-medium mb-2">Market Overview</div>
            <div className="flex items-end justify-between h-24 w-full px-4">
              {palette.chartColors.map((color, i) => (
                <div 
                  key={i}
                  className="w-12 rounded-sm"
                  style={{ 
                    backgroundColor: color,
                    height: `${Math.floor(30 + Math.random() * 70)}%` 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button color={palette.primary} textColor="#FFFFFF">Dashboard</Button>
          <Button color={palette.secondary} textColor="#FFFFFF">Portfolio</Button>
          <Button color={palette.accent} textColor="#FFFFFF">Watchlist</Button>
        </div>
      </div>
    );
  };
  
  // Helper components
  const ColorSwatch = ({ name, color }) => (
    <div className="flex items-center gap-2">
      <div 
        className="w-6 h-6 rounded"
        style={{ backgroundColor: color }}
        title={color}
      />
      <div className="text-xs flex-1">{name}</div>
      <div className="text-xs font-mono">{color}</div>
    </div>
  );
  
  const Button = ({ color, textColor, children }) => (
    <button 
      className="px-4 py-2 rounded-md font-medium text-sm"
      style={{ backgroundColor: color, color: textColor }}
    >
      {children}
    </button>
  );
  
  return (
    <div className="flex flex-col gap-8">
      <MockDashboard mode="light" palette={lightPalette} />
      <MockDashboard mode="dark" palette={darkPalette} />
    </div>
  );
};

export default ColorPalettePreview;