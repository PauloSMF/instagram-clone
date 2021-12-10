import React from "react"
import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = 'Página não encontrada!';
    }, []);

    return (
        <div className="bg-gray-background">
            <div className="mx-auto max-w-screen-lg">
                <p className="text-cente text-2xl">
                    Página não encontrada!
                </p>
            </div>
        </div>
    );
}