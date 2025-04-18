// Removing Toaster import to fix runtime error
// import { Toaster } from "@/components/ui/toaster";

export default function ChatBotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            {children}
            {/* Temporarily removed Toaster to fix runtime error */}
            {/* <Toaster /> */}
        </div>
    );
} 