import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch (e) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Server did not start');
}

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  // Ensure output directory exists
  const outputDir = join(__dirname, 'output');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Start dev server in background
  console.log('📦 Starting Vite dev server...');
  const serverProcess = spawn('npm', ['run', 'dev', '--', '--port', '5173'], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`[Vite] ${data}`);
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.log(`[Vite] ${data}`);
  });

  try {
    // Wait for server to start
    console.log('⏳ Waiting for server...');
    await waitForServer('http://localhost:5173');
    console.log('✅ Server is ready');
    
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
    const outputPath = join(outputDir, 'report.pdf');
    writeFileSync(outputPath, pdf);
    
    console.log(`✅ PDF saved to: ${outputPath}`);
    console.log(`📐 PDF size: ${(pdf.length / 1024 / 1024).toFixed(2)} MB`);
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    serverProcess.kill();
    process.exit(0);
  }
}

generatePDF();
