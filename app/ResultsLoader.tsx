import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

export default function ResultsLoader() {
    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
            <Typography level="body3" textTransform={"uppercase"}>Results</Typography>
            <Typography level="body3">Sample</Typography>
        </Card>
    );
}
