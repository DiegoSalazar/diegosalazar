import pug from 'pug';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

const srcDir: string = 'src';
const distDir: string = 'dist';
const assetsDir: string = 'assets';

const cvPath: string = path.join(srcDir, 'data', 'cv.json');
const pugPath: string = path.join(srcDir, 'index.pug');
const cssPath: string = path.join(srcDir, 'input.css');

const distHtmlPath: string = path.join(distDir, 'index.html');
const distCssPath: string = path.join(distDir, 'styles.css');
const distAssetsPath: string = path.join(distDir, assetsDir);
const srcAssetsPath: string = path.join(srcDir, assetsDir);

async function build(): Promise<void> {
  try {
    console.log('Starting build...');

    // Ensure dist directory exists and is clean
    await fs.emptyDir(distDir);
    console.log('Cleaned dist directory.');

    // Compile Tailwind CSS
    console.log('Compiling Tailwind CSS...');
    execSync(`npx tailwindcss -i ${cssPath} -o ${distCssPath} --minify`);
    console.log('CSS compiled successfully.');

    // Read JSON data
    console.log('Reading content from cv.json...');
    const cvData: any = await fs.readJson(cvPath);
    console.log('Content loaded.');

    // Compile Pug to HTML
    console.log('Compiling Pug template...');
    const compiledFunction = pug.compileFile(pugPath, { pretty: false });
    const html: string = compiledFunction({ cv: cvData });
    await fs.writeFile(distHtmlPath, html);
    console.log('HTML generated successfully.');

    // Copy assets
    if (fs.existsSync(srcAssetsPath)) {
      console.log('Copying assets...');
      await fs.copy(srcAssetsPath, distAssetsPath);
      console.log('Assets copied.');
    }

    console.log('✅ Build successful! Your site is ready in the /dist folder.');

  } catch (error) {
    console.error('Build failed:');
    console.error(error);
    process.exit(1);
  }
}

build();
