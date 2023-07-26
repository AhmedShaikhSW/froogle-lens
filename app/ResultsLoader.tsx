'use client'
import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";

interface Results {
    first: {
        label: string;
        confidence: number;
    };
    second: {
        label: string;
        confidence: number;
    };
    third: {
        label: string;
        confidence: number;
    };
}

export default function ResultsLoader() {
    const [ results, setResults ] = React.useState<Results>();

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://0.0.0.0:5000/results', {
                method: 'GET',
            });

            const data = await response.json();
    
            if (Object.keys(data).length !== 0 ) {
                setResults(data);
            }
        }

        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [results]);

    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
            <Typography level="body3" textTransform={"uppercase"}>Results</Typography>
            <Table aria-label="results table">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Confidence&nbsp;(%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{(results?.first.label || '').replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())}</td>
                        <td>{results?.first.confidence.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>{(results?.second.label || '').replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())}</td>
                        <td>{results?.second.confidence.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>{(results?.third.label || '').replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())}</td>
                        <td>{results?.third.confidence.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    );
}
