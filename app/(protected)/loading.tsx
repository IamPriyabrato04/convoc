import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
    );
};

export default Loader;
