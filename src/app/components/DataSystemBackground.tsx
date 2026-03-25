export function DataSystemBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Circuit patterns - top */}
            <div className="absolute top-0 left-0 right-0 h-32 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1200 120">
                    {/* Horizontal lines with dots */}
                    <g>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <g key={i}>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                                    <circle
                                        key={`${i}-${j}`}
                                        cx={280 + i * 30}
                                        cy={20 + j * 12}
                                        r="2"
                                        fill="#94a3b8"
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            {/* Circuit patterns - bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1200 120">
                    <g>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <g key={i}>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                                    <circle
                                        key={`${i}-${j}`}
                                        cx={280 + i * 30}
                                        cy={20 + j * 12}
                                        r="2"
                                        fill="#94a3b8"
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            {/* Left side circuit elements */}
            <div className="absolute left-8 top-1/4 w-48 h-48 opacity-30">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="40" cy="100" r="35" stroke="#60a5fa" strokeWidth="2" fill="none" />
                    <circle cx="40" cy="100" r="8" fill="#60a5fa" />
                    <path d="M 75 100 L 120 100" stroke="#60a5fa" strokeWidth="2" />
                    <circle cx="120" cy="100" r="6" fill="#60a5fa" />

                    <path d="M 40 65 L 40 30 M 40 135 L 40 170" stroke="#60a5fa" strokeWidth="2" />
                    <circle cx="40" cy="30" r="6" fill="#60a5fa" />
                    <circle cx="40" cy="170" r="6" fill="#60a5fa" />

                    <path d="M 20 80 L 20 50 L 60 50" stroke="#10b981" strokeWidth="2" />
                    <circle cx="20" cy="80" r="4" fill="#10b981" />

                    <rect x="10" y="130" width="20" height="20" stroke="#60a5fa" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {/* Tech symbols scattered */}
            <div className="absolute top-20 right-32 opacity-20">
                <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" stroke="#94a3b8" strokeWidth="2" fill="none" />
                    <circle cx="40" cy="40" r="15" stroke="#94a3b8" strokeWidth="2" fill="none" />
                    <line x1="40" y1="10" x2="40" y2="25" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="55" x2="40" y2="70" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="10" y1="40" x2="25" y2="40" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="55" y1="40" x2="70" y2="40" stroke="#94a3b8" strokeWidth="2" />
                </svg>
            </div>

            <div className="absolute top-1/3 right-1/4 opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <path d="M 15 30 L 30 15 L 45 30 L 30 45 Z" stroke="#94a3b8" strokeWidth="2" fill="none" />
                    <circle cx="30" cy="30" r="8" fill="#94a3b8" />
                </svg>
            </div>

            <div className="absolute bottom-1/4 right-20 opacity-20">
                <svg width="70" height="70" viewBox="0 0 70 70">
                    <polygon points="35,10 60,60 10,60" stroke="#94a3b8" strokeWidth="2" fill="none" />
                    <circle cx="35" cy="40" r="10" stroke="#94a3b8" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {/* Circuit boards right side */}
            <div className="absolute right-8 top-1/2 w-32 h-64 opacity-30">
                <svg viewBox="0 0 120 250" className="w-full h-full">
                    <path d="M 20 50 L 60 50 L 60 100 L 100 100" stroke="#60a5fa" strokeWidth="2" />
                    <path d="M 60 50 L 60 20" stroke="#60a5fa" strokeWidth="2" />
                    <circle cx="60" cy="50" r="6" fill="#60a5fa" />
                    <circle cx="100" cy="100" r="6" fill="#60a5fa" />

                    <path d="M 30 150 L 70 150 L 70 200" stroke="#10b981" strokeWidth="2" />
                    <circle cx="70" cy="150" r="6" fill="#10b981" />
                    <circle cx="70" cy="200" r="6" fill="#10b981" />

                    <rect x="40" y="180" width="25" height="25" stroke="#60a5fa" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {/* Decorative arrows and lines */}
            <div className="absolute top-80 right-16 opacity-25">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <path d="M 25 5 L 25 35 M 25 35 L 15 25 M 25 35 L 35 25" stroke="#64748b" strokeWidth="2" fill="none" />
                </svg>
            </div>

            <div className="absolute top-60 right-24 opacity-25">
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <path d="M 5 20 L 35 20 M 35 20 L 25 10 M 35 20 L 25 30" stroke="#64748b" strokeWidth="2" fill="none" />
                </svg>
            </div>

            <div className="absolute bottom-96 right-12 opacity-25">
                <svg width="45" height="45" viewBox="0 0 45 45">
                    <path d="M 22 5 L 22 35 M 22 35 L 12 25 M 22 35 L 32 25" stroke="#64748b" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {/* Bottom right tech elements */}
            <div className="absolute bottom-16 right-32 opacity-30">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="8" fill="#64748b" />
                    <path d="M 50 25 L 50 42 M 50 58 L 50 75 M 25 50 L 42 50 M 58 50 L 75 50" stroke="#64748b" strokeWidth="2" />
                    <circle cx="50" cy="25" r="5" fill="#64748b" />
                    <circle cx="50" cy="75" r="5" fill="#64748b" />
                    <circle cx="25" cy="50" r="5" fill="#64748b" />
                    <circle cx="75" cy="50" r="5" fill="#64748b" />
                </svg>
            </div>

            <div className="absolute bottom-20 right-80 opacity-30">
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <line x1="10" y1="10" x2="50" y2="10" stroke="#64748b" strokeWidth="2" />
                    <line x1="10" y1="30" x2="50" y2="30" stroke="#64748b" strokeWidth="2" />
                    <line x1="10" y1="50" x2="50" y2="50" stroke="#64748b" strokeWidth="2" />
                    <line x1="10" y1="10" x2="10" y2="50" stroke="#64748b" strokeWidth="2" />
                    <line x1="30" y1="10" x2="30" y2="50" stroke="#64748b" strokeWidth="2" />
                    <line x1="50" y1="10" x2="50" y2="50" stroke="#64748b" strokeWidth="2" />
                </svg>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-300/30"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-300/30"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-300/30"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-300/30"></div>
        </div>
    );
}
