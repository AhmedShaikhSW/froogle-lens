import React from "react";
import Typography from "@mui/joy/Typography";

export default function Header({
    logo, title
} : {
    logo: React.ReactNode;
    title: string;
}) {

    return (
        <header className="flex items-center justify-center p-4 mt-4">
            <div className="flex fixed w-screen justify-center p-2 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 sm:mt-2">
                <div className="mt-6 mr-4">{logo}</div>
                <Typography
                    level="h1"
                    color="neutral"
                    fontFamily={"inherit"}
                    fontWeight={"bold"}
                    sx={{
                        background: "linear-gradient(to right bottom, #2E73E7, #54CBD3)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    {title}
                </Typography>
            </div>
        </header>
    );
}
