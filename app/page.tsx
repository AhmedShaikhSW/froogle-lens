import { CssVarsProvider } from '@mui/joy/styles'
import Grid from '@mui/joy/Grid'
import Typography from '@mui/joy/Typography'
import ImageUploader from './ImageUploader'
import ResultsLoader from './ResultsLoader'

export default function Home() {
  return (
    <CssVarsProvider defaultMode="dark">
      <main className="relative flex flex-col items-center justify-between p-4 md:p-24">
        <div
          className="fixed before:absolute before:h-[600px] before:w-[800px] before:-translate-x-1/2 before:-translate-y-1/4 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[360px] after:w-[480px] after:translate-x-1/3 after:translate-y-1/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[720px] z-[-1]"
          style={{
            background: '#402b63',
            opacity: '0.5',
            left: '-20%',
            bottom: '50%',
          }}
        ></div>

        <div
          className="fixed flex place-items-center rotate-90 before:absolute before:h-[600px] before:w-[800px] before:-translate-x-1/2 before:-translate-y-1/4 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[360px] after:w-[480px] after:translate-x-1/3 after:translate-y-1/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[720px] z-[-1]"
          style={{
            background: '#402b63',
            opacity: '0.5',
            right: '5%',
            top: '-15%',
          }}
        ></div>

        <Grid container spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
          <Grid xs={12} sx={{ minWidth: '100%', paddingY: '4em' }}>
            <Typography level="h1" fontFamily={'inherit'} fontWeight={'bold'}>
              A frugal version of Google Lens.
            </Typography>
            <Typography level="h1" fontFamily="inherit" fontWeight="bold">
              <Typography
                sx={{
                  background: 'linear-gradient(to bottom, #6196E8, #2D6BEC)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Classify
              </Typography>{' '}
              your images with ease.
            </Typography>
          </Grid>

          <Grid
            xs={6}
            sx={{
              height: '100%',
              minWidth: { md: 'auto', sm: '100%', xs: '100%' },
            }}
          >
            <ImageUploader />
          </Grid>

          <Grid
            xs={6}
            sx={{
              height: '100%',
              minWidth: { md: 'auto', sm: '100%', xs: '100%' },
            }}
          >
            <ResultsLoader />
          </Grid>
        </Grid>
      </main>
    </CssVarsProvider>
  )
}
