import { Card } from './ui/card';
import { ChevronLeft, ChevronRight, ChevronDown, Settings, Bell, Menu, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const buildingTabs = [
    { id: 'hot-machine', name: 'HOT MACHINE SHOP' },
    { id: 'fuel-handling', name: 'FUEL-HANDLING AREA', active: true },
    { id: 'turbine', name: 'TURBINE BUILDING' },
    { id: 'cooling', name: 'COOLING TOWER' },
];

interface FactoryDashboardProps {
    isDark: boolean;
}

export function FactoryDashboard({ isDark }: FactoryDashboardProps) {
    const [activeTab, setActiveTab] = useState('fuel-handling');
    const [temperature, setTemperature] = useState(664.5);
    const [pressure, setPressure] = useState(354);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className={`flex items-center justify-between rounded-xl p-6 ${
                isDark
                    ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                    : 'bg-white border border-gray-200 shadow-sm'
            }`}>
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                        <div className="text-2xl">⚡</div>
                    </div>
                    <div>
                        <h2 className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            OPSMASTER
                        </h2>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Industrial Operations Control
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-2">
                    <button className="rounded-full p-2 hover:bg-white/10">
                        <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                    </button>

                    <div className="flex items-center gap-2">
                        {buildingTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-full px-4 py-2 text-sm transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-white text-black'
                                        : isDark
                                            ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    <button className="rounded-full p-2 hover:bg-white/10">
                        <ChevronRight className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="rounded-full p-2 hover:bg-white/10">
                        <Bell className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                    </button>
                    <button className="rounded-full p-2 hover:bg-white/10">
                        <Menu className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Sidebar - Building Data */}
                <div className="space-y-4 lg:col-span-3">
                    <Card className={`p-6 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                            : 'border-gray-200 bg-white shadow-sm'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                BUILDING DATA
                            </h3>
                            <ChevronDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Building:</span>
                                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Turbine</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Area:</span>
                                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>9.0 ha, 0.09 km</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Class:</span>
                                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>A+</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Workers:</span>
                                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>25</span>
                            </div>
                        </div>
                    </Card>

                    <Card className={`p-6 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                            : 'border-gray-200 bg-white shadow-sm'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                STATUS
                            </h3>
                            <ChevronDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Turbine Stability</span>
                                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Transformer</span>
                                <div className={`h-3 w-3 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Power Efficiency</span>
                                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Center - 3D Factory View */}
                <div className="lg:col-span-6">
                    <Card className={`relative overflow-hidden p-0 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-gray-900 to-black'
                            : 'border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 shadow-lg'
                    }`}>
                        {/* Temperature Warning Badge */}
                        <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
                            <div className="rounded-lg bg-white/90 px-4 py-2 backdrop-blur-sm">
                                <p className="text-xs text-gray-900">
                                    High temperature <span className="font-bold">8°</span>
                                </p>
                            </div>
                        </div>

                        {/* 3D Factory Illustration */}
                        <div className="relative flex h-[500px] items-center justify-center overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="h-full w-full" style={{
                                    backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px',
                                }}></div>
                            </div>

                            {/* 3D Factory Buildings */}
                            <div className="relative" style={{
                                transform: 'perspective(1000px) rotateX(15deg) rotateY(-10deg)',
                                transformStyle: 'preserve-3d',
                            }}>
                                {/* Base Platform */}
                                <div className={`h-8 w-[500px] rounded-lg ${
                                    isDark ? 'bg-gray-800' : 'bg-gray-300'
                                } shadow-2xl`}></div>

                                <div className="absolute bottom-8 left-0 flex gap-4" style={{ transformStyle: 'preserve-3d' }}>
                                    {/* Main Building Complex */}
                                    <div className="relative">
                                        {/* Large Factory Building */}
                                        <div className={`h-48 w-64 rounded-t-lg ${
                                            isDark ? 'bg-gray-700' : 'bg-gray-400'
                                        } border-2 ${isDark ? 'border-gray-600' : 'border-gray-500'}`}>
                                            {/* Windows Grid */}
                                            <div className="grid grid-cols-8 gap-2 p-4">
                                                {[...Array(32)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-3 w-3 rounded-sm ${
                                                            i % 3 === 0 ? 'bg-yellow-300/80 animate-pulse' : 'bg-blue-400/40'
                                                        }`}
                                                        style={{ animationDelay: `${i * 0.1}s` }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hot Tower */}
                                    <div className="relative">
                                        <div className="h-56 w-20 rounded-t-lg bg-gradient-to-t from-red-400 to-red-600 border-2 border-red-500 shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-t from-red-500/0 to-red-300/50 animate-pulse"></div>
                                        </div>
                                        <div className="absolute -top-4 left-1/2 h-16 w-16 -translate-x-1/2">
                                            <div className="h-full w-full rounded-full bg-red-400/30 blur-xl animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Cooling Tower */}
                                    <div className="relative">
                                        <div className={`h-56 w-20 rounded-t-lg ${
                                            isDark ? 'bg-gray-600' : 'bg-gray-400'
                                        } border-2 ${isDark ? 'border-gray-500' : 'border-gray-500'} shadow-xl`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-500/0 to-white/20"></div>
                                        </div>
                                    </div>

                                    {/* Smokestacks */}
                                    <div className="flex gap-2">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="relative">
                                                <div className={`h-40 w-6 rounded-t-full ${
                                                    isDark ? 'bg-gray-700' : 'bg-gray-500'
                                                } border-2 ${isDark ? 'border-gray-600' : 'border-gray-600'}`}></div>
                                                {/* Smoke effect */}
                                                <div className="absolute -top-8 left-1/2 h-12 w-12 -translate-x-1/2">
                                                    <div className={`h-full w-full rounded-full ${
                                                        isDark ? 'bg-gray-400/20' : 'bg-gray-400/30'
                                                    } blur-lg animate-pulse`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Info Points */}
                                {[
                                    { x: 50, y: 100 },
                                    { x: 200, y: 80 },
                                    { x: 350, y: 120 },
                                    { x: 420, y: 100 },
                                ].map((pos, i) => (
                                    <div
                                        key={i}
                                        className="absolute h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center animate-pulse"
                                        style={{
                                            left: pos.x,
                                            bottom: pos.y,
                                            animationDelay: `${i * 0.3}s`,
                                        }}
                                    >
                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <button className={`rounded-lg p-2 ${
                                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/50 hover:bg-white/70'
                            } backdrop-blur-sm`}>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                            <button className={`rounded-lg p-2 ${
                                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/50 hover:bg-white/70'
                            } backdrop-blur-sm`}>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                        </div>

                        <button className="absolute bottom-4 right-4 rounded-lg p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                            <Settings className="h-5 w-5" />
                        </button>
                    </Card>
                </div>

                {/* Right Sidebar - Controls */}
                <div className="space-y-4 lg:col-span-3">
                    <Card className={`p-6 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                            : 'border-gray-200 bg-white shadow-sm'
                    }`}>
                        <div className="mb-4 flex items-center justify-between">
                            <button className="rounded-lg bg-white px-4 py-1.5 text-xs text-black">
                                A-PRESET
                            </button>
                            <button className={`rounded-lg px-4 py-1.5 text-xs ${
                                isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                            }`}>
                                B-PRESET
                            </button>
                            <button className={`rounded-lg px-2 py-1.5 ${
                                isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                            }`}>
                                +
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                TEMP & PRESSURE
                            </h3>
                            <ChevronDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>

                        <div className="space-y-6">
                            {/* Temperature Control */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Temperature (°C)
                  </span>
                                    <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {temperature.toFixed(1)}
                  </span>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="800"
                                    value={temperature}
                                    onChange={(e) => setTemperature(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Pressure Control */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Pressure (Pa)
                  </span>
                                    <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {pressure}
                  </span>
                                </div>
                                <input
                                    type="range"
                                    min="200"
                                    max="500"
                                    value={pressure}
                                    onChange={(e) => setPressure(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Output */}
                            <div className="flex items-center justify-between">
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Output
                </span>
                                <span className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  142 kWh
                </span>
                            </div>
                        </div>
                    </Card>

                    <Card className={`p-4 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                            : 'border-gray-200 bg-white shadow-sm'
                    }`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>MODE</span>
                            <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>
                    </Card>

                    <Card className={`p-4 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                            : 'border-gray-200 bg-white shadow-sm'
                    }`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>FREQUENCY</span>
                            <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>
                    </Card>

                    <Card className={`p-4 ${
                        isDark
                            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                            : 'border-gray-200 bg-white shadow-sm'
                    }`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>AMPERE</span>
                            <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Energy Generating */}
                <Card className={`p-6 ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <h3 className={`mb-4 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ENERGY GENERATING
                    </h3>
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            {/* Circular Progress */}
                            <svg className="h-40 w-40 -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    stroke={isDark ? '#374151' : '#e5e7eb'}
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    stroke="#a3e635"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 60 * 0.75} ${2 * Math.PI * 60}`}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>852</p>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>kW/H</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Power Loss: 5% (8 kWh)</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Time: 5h 32min</span>
                    </div>
                </Card>

                {/* Turbine Stability */}
                <Card className={`p-6 ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <h3 className={`mb-4 text-center text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        TURBINE STABILITY
                    </h3>
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                                    <svg className="h-20 w-20" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="#f87171" />
                                        <path d="M50 10 L50 50 L70 30" stroke="white" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-red-500 px-3 py-1 text-xs text-white">
                                LOAD 76%
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between text-xs">
                            <div className="text-center">
                                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Pressure</p>
                                <p className={`flex items-center gap-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    ⬇ 354 Pa
                                </p>
                            </div>
                            <div className="text-center">
                                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Temperature</p>
                                <p className={`flex items-center gap-1 text-red-500`}>
                                    ⬆ 664.5 °C
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* CO2 Emission Tracking */}
                <Card className={`p-6 ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <h3 className={`mb-4 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        CO₂ EMISSION TRACKING
                    </h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-5xl ${isDark ? 'text-white' : 'text-gray-900'}`}>39%</p>
                            <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Emissions Reduction
                            </p>
                            <button className={`mt-4 text-xs underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                VIEW REPORT
                            </button>
                        </div>
                        <div className="relative">
                            {/* Hexagon Grid */}
                            <svg className="h-32 w-32" viewBox="0 0 100 100">
                                {[...Array(19)].map((_, i) => {
                                    const row = Math.floor(i / 5);
                                    const col = i % 5;
                                    const x = col * 18 + (row % 2) * 9 + 10;
                                    const y = row * 16 + 10;
                                    const isEmission = i === 9 || i === 10 || i === 14;
                                    return (
                                        <polygon
                                            key={i}
                                            points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5"
                                            transform={`translate(${x},${y})`}
                                            fill={isEmission ? '#ef4444' : '#22c55e'}
                                            opacity="0.8"
                                        />
                                    );
                                })}
                            </svg>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <div className="rounded-full bg-white px-2 py-1 text-xs text-black">
                                    5.1 GtCO₂
                                </div>
                            </div>
                            <div className="absolute right-0 top-1/3 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                                2.1 GtCO₂
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
