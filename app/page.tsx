import { CssVarsProvider } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import ImageUploader from './ImageUploader';
import ResultsLoader from './ResultsLoader';

export default function Home() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">

        <div className="fixed flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        </div>

        <Grid container spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
          <Grid xs={12} md={8} sx={{ minWidth: '100%'}}>
            <h1>xs=8</h1>
          </Grid>

          <Grid xs={6} md={6} sx={{ height: '100%', minWidth: {md: 'auto', sm: '100%', xs: '100%'}}}>
            <ImageUploader />
          </Grid>

          <Grid xs={6} md={6} sx={{ height: '100%', minWidth: {md: 'auto', sm: '100%', xs: '100%'}}}>
            <ResultsLoader />
          </Grid>
        </Grid>

      </main>
    </CssVarsProvider>
  )
}
