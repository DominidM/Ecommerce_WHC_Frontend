import React, { useState, useEffect, useRef } from 'react';

interface Marca {
    nombre: string;
    logoSrc: string;
}

const Marcas: React.FC = () => {
    const marcas: Marca[] = [
        { nombre: 'Sloan', logoSrc: '/marca1.png' },
        { nombre: 'Genebre', logoSrc: '/marca2.jpg' },
        { nombre: 'Vainsa', logoSrc: '/marca3.jpg' },
        { nombre: 'Trebol', logoSrc: '/marca4.png' },
        { nombre: 'Helvex', logoSrc: '/marca5.png' },
        { nombre: 'Leeyes', logoSrc: '/marca6.PNG' },
        { nombre: 'Sunmixer', logoSrc: '/marca7.jpg' },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [, setIntervalId] = useState<number | null>(null);

    const marcaWidth = 150;
    const espacioEntreMarcas = 20;
    const totalMarcaWidth = marcaWidth + espacioEntreMarcas;

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const newIntervalId = window.setInterval(() => {
                setScrollPosition(prevPosition => {
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    const newPosition = prevPosition + totalMarcaWidth;

                    if (newPosition > maxScroll) {
                        return 0;
                    }
                    return newPosition;
                });
            }, 2000);

            setIntervalId(newIntervalId); // ✅ guardamos el id correctamente

            return () => {
                clearInterval(newIntervalId);
                setIntervalId(null);
            };
        }
    }, [totalMarcaWidth]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollPosition;
        }
    }, [scrollPosition]);

    return (
        <div className="w-full overflow-hidden py-8 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 whitespace-nowrap text-center sm:text-left">
                    Trabajamos con las mejores marcas
                </h2>
                <div className="h-0.5 bg-gray-300 w-full sm:w-32" />
            </div>
            <div ref={containerRef} className="flex overflow-x-hidden whitespace-nowrap scroll-smooth">
                {marcas.map((marca, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[150px] h-[100px] flex items-center justify-center"
                        style={{ marginRight: `${espacioEntreMarcas}px` }}
                    >
                        <img
                            src={marca.logoSrc}
                            alt={marca.nombre}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                ))}
                {marcas.map((marca, index) => (
                    <div
                        key={`clone-${index}`}
                        className="flex-shrink-0 w-[150px] h-[100px] flex items-center justify-center"
                        style={{ marginRight: `${espacioEntreMarcas}px` }}
                    >
                        <img
                            src={marca.logoSrc}
                            alt={marca.nombre}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marcas;