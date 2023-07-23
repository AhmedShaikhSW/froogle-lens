'use client'
import React from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions"
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Button from "@mui/joy/Button";
import { useDropzone, FileWithPath, FileRejection } from "react-dropzone";

const maxFileSize = 5 * 1000 * 1000; // 5MB

function fileSizeValidator(file: FileWithPath) {
    if (file.size > maxFileSize) {
        return {
            code: "file-too-large",
            message: `File is too large, max file size is ${maxFileSize / 1000 / 1000}MB`,
        };
    }
}

export default function ImageUploader() {
    const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "text/html": [".html", ".htm"],
        },
        maxFiles: 1,
        validator: fileSizeValidator as any,
    });

    const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path}, {(file.size/1000).toFixed(2)} KB
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }: FileRejection ) => (
        <li key={(file as FileWithPath).path}>
          {(file as FileWithPath).path}, ~{(file.size/1000000).toFixed(2)} MB
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
    ));

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <section className="container p-4">
                <div {...getRootProps({className: 'dropzone flex justify-center border border-dashed border-2 border-gray-700 rounded-md p-16'})}>
                    <div>
                        <input {...getInputProps()} />
                        <Link level="h6" variant="soft" sx={{ textAlign: 'center' }}>
                            Drag an image, or click to upload.
                        </Link>
                        <Typography level="body3" textTransform={"uppercase"} sx={{ textAlign: 'center', margin: '0.5em' }}>Only PNG, JPG, or JPEG. Max: 5 MB</Typography>
                    </div>
                </div>
                <aside className="mt-4">
                    {acceptedFileItems.length > 0 && (
                        <div>
                            <Typography level="body3" textTransform={"uppercase"}>File</Typography>
                            <List sx={{ '--ListItemDecorator-size': '8px' }}>
                                <ListItem  sx={{ fontSize: 'sm' }}>
                                    <ListItemDecorator sx={{mr: '1em'}}>✅</ListItemDecorator>{acceptedFileItems}
                                </ListItem>
                            </List>
                        </div>
                    )}
                    {fileRejectionItems.length > 0 && (
                        <div>
                            <Typography color="danger" level="body3" textTransform={"uppercase"}>Error</Typography>
                            <List sx={{ '--ListItemDecorator-size': '8px' }}>
                                <ListItem color="danger" sx={{ fontSize: 'sm' }}>
                                    <ListItemDecorator sx={{mr: '1em'}}>❌</ListItemDecorator>{fileRejectionItems}
                                </ListItem>
                            </List>
                        </div>
                    )}
                </aside>
            </section>

            <CardActions>
                <Button variant="outlined" color="primary">Classify!</Button>
            </CardActions>
        </Card>
    );
}
