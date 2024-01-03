'use client'
/**
 * ImageUploader Component
 * Performs image classification on user uploaded images.
 */

import React from 'react'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import Link from '@mui/joy/Link'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Button from '@mui/joy/Button'
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone'

// Maximum file size in bytes
const maxFileSize = 5 * 1000 * 1000

/**
 * Validator function to check file size.
 *
 * @param {FileWithPath} file - File object to be validated.
 * @returns {Object|null} Object with error code and message if validation fails, null otherwise.
 */
function fileSizeValidator(file: FileWithPath) {
  if (file.size > maxFileSize) {
    return {
      code: 'file-too-large',
      message: `File is too large, max file size is ${
        maxFileSize / 1000 / 1000
      }MB`,
    }
  }
}

/**
 * ImageUploader Component
 *
 * @returns {JSX.Element} Rendered ImageUploader component.
 */
export default function ImageUploader() {
  const [buttonLoading, setButtonLoading] = React.useState(false)

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'text/html': ['.html', '.htm'],
    },
    maxFiles: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validator: fileSizeValidator as any, // Type error in react-dropzone version
  })

  // Generate list items for accepted files
  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path}, {(file.size / 1000).toFixed(2)} KB
    </li>
  ))

  // Generate list items for file rejections with error messages
  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: FileRejection) => (
      <li key={(file as FileWithPath).path}>
        {(file as FileWithPath).path}, ~{(file.size / 1000000).toFixed(2)} MB
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  )

  /**
   * Handle Click Event
   * Sends the uploaded image to Flask server for classification.
   */
  const handleClick = async () => {
    if (acceptedFiles.length > 0) {
      setButtonLoading(true)

      const formData = new FormData()
      formData.append('image', acceptedFiles[0])

      // TODO: Enforce HTTPS and mask API URL
      const res = await fetch('http://0.0.0.0:5000/classify', {
        body: formData,
        method: 'POST',
      })

      const data = await res.json()
      console.log(data)
      console.log('Image classification complete!')

      setButtonLoading(false)
    } else {
      console.log('No files selected.')
    }
  }

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <section className="container p-4">
        <div
          {...getRootProps({
            className:
              'dropzone flex justify-center border border-dashed border-2 border-gray-700 rounded-md p-16',
          })}
        >
          <div>
            <input {...getInputProps()} />

            {/* Conditional rendering based on drag active state */}
            {isDragActive ? (
              <Typography
                level="h6"
                variant="soft"
                sx={{ textAlign: 'center' }}
              >
                Drop it like it&apos;s hot!
              </Typography>
            ) : (
              <Link level="h6" variant="soft" sx={{ textAlign: 'center' }}>
                Drag an image, or click to upload.
              </Link>
            )}

            <Typography
              level="body3"
              textTransform={'uppercase'}
              sx={{ textAlign: 'center', margin: '0.5em' }}
            >
              Only PNG, JPG, or JPEG. Max: 5 MB
            </Typography>
          </div>
        </div>

        <aside className="mt-4">
          {/* Display accepted files if any */}
          {acceptedFileItems.length > 0 && (
            <div>
              <Typography level="body3" textTransform={'uppercase'}>
                File
              </Typography>

              <List sx={{ '--ListItemDecorator-size': '8px' }}>
                <ListItem sx={{ fontSize: 'sm' }}>
                  <ListItemDecorator sx={{ mr: '1em' }}>✅</ListItemDecorator>
                  {acceptedFileItems}
                </ListItem>
              </List>
            </div>
          )}

          {/* Display file rejections with errors if any */}
          {fileRejectionItems.length > 0 && (
            <div>
              <Typography
                color="danger"
                level="body3"
                textTransform={'uppercase'}
              >
                Error
              </Typography>

              <List sx={{ '--ListItemDecorator-size': '8px' }}>
                <ListItem color="danger" sx={{ fontSize: 'sm' }}>
                  <ListItemDecorator sx={{ mr: '1em' }}>❌</ListItemDecorator>
                  {fileRejectionItems}
                </ListItem>
              </List>
            </div>
          )}
        </aside>
      </section>

      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          disabled={acceptedFiles.length < 1}
          loading={buttonLoading}
          onClick={handleClick}
        >
          Classify!
        </Button>
      </CardActions>
    </Card>
  )
}
