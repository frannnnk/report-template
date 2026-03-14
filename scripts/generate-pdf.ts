import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  // Start dev server
  console.log('📦 Starting Vite dev server...');
  const serverProcess = Bun.spawn(['npm', 'run', 'dev', '--', '--port', '5173'], {
    cwd: __dirname,
    stdout: 'pipe',
    stderr: 'pipe',
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for A4
  await page.setViewport({
    width: 1200,
    height: 1600,
    deviceScaleFactor: 2,
  });
  
  console.log('🌐 Loading page...');
  await page.goto('http://localhost:5173', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('📄 Generating PDF...');
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
  });
  
  // Save PDF
  const outputPath = join(__dirname, 'output.pdf');
  writeFileSync(outputPath, pdf);
  
  console.log(`✅ PDF saved to: ${outputPath}`);
  console.log(`📐 PDF size: ${(pdf.length / 1024 / 1024).toFixed(2)} MB`);
  
  await browser.close();
  serverProcess.kill();
  
  process.exit(0);
}

generatePDF().catch(console.error);
