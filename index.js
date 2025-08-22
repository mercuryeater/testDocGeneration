const express = require("express");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const ejs = require("ejs"); // <--- 1. Requerimos EJS
const fs = require("fs");
const path = require("path");
const {
  context,
  ejsContext,
  digitalRecordData,
} = require("./mockData/mockData.js");

const app = express();

// Serve static files
app.use(express.static("public"));

// Function to compile and render the template
function renderTemplate(templatePath, context) {
  return new Promise((resolve, reject) => {
    fs.readFile(templatePath, "utf8", (err, templateSource) => {
      if (err) {
        reject(err);
        return;
      }
      const template = Handlebars.compile(templateSource);
      const html = template(context);
      resolve(html);
    });
  });
}

// Route to render the HTML
app.get("/", async (req, res) => {
  try {
    const templatePath = path.join(__dirname, "views", "template.handlebars");
    const html = await renderTemplate(templatePath, context);
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

// 3. Creamos la nueva ruta /template que renderiza el archivo .ejs
app.get("/template", async (req, res) => {
  try {
    const templatePath = path.join(__dirname, "views", "payment_template.ejs");

    // EJS tiene un método renderFile que es muy conveniente.
    // Le pasamos la ruta, el objeto de datos, y un callback.
    ejs.renderFile(templatePath, ejsContext, (err, html) => {
      if (err) {
        console.error("Error rendering EJS template:", err);
        return res.status(500).send("An error occurred with EJS template");
      }
      res.send(html);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

// Nueva ruta para el digital record
app.get("/digital-record", async (req, res) => {
  try {
    const templatePath = path.join(
      __dirname,
      "views",
      "template_digital_record.ejs"
    );

    // Renderizar el template EJS con los datos mockeados
    ejs.renderFile(templatePath, digitalRecordData, (err, html) => {
      if (err) {
        console.error("Error rendering Digital Record template:", err);
        return res
          .status(500)
          .send("An error occurred with Digital Record template");
      }
      res.send(html);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

// Ruta de debug para verificar que las fuentes se cargan
app.get("/font-test", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body { 
          font-family: 'Poppins', sans-serif; 
          padding: 20px;
        }
        .arial { font-family: Arial, sans-serif; }
        .poppins { font-family: 'Poppins', sans-serif; }
        .test { 
          margin: 20px 0;
          padding: 10px;
          border: 1px solid #ccc;
        }
      </style>
    </head>
    <body>
      <h1>Test de Fuentes</h1>
      <div class="test arial">
        <strong>Arial:</strong> Este texto está en Arial
      </div>
      <div class="test poppins">
        <strong>Poppins:</strong> Este texto debería estar en Poppins
      </div>
      <div class="test" style="font-weight: 300;">
        <strong>Poppins Light (300):</strong> Texto ligero
      </div>
      <div class="test" style="font-weight: 500;">
        <strong>Poppins Medium (500):</strong> Texto medio
      </div>
      <div class="test" style="font-weight: 700;">
        <strong>Poppins Bold (700):</strong> Texto en negrita
      </div>
    </body>
    </html>
  `);
});

// Route to generate PDF
app.get("/generate-pdf", async (req, res) => {
  try {
    const templatePath = path.join(__dirname, "views", "template.handlebars");
    const html = await renderTemplate(templatePath, context);

    const browser = await puppeteer.launch({
      headless: true, // Asegúrate de que esté en modo headless
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      path: "output.pdf", // Guarda el archivo en disco
      format: "Letter",
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate: `
      <div style="font-size: 10px; display: flex; justify-content: space-between; width: 100%; padding: 0 20px; color: #333;">
  <span style="flex: 1; text-align: left;">
    Página <span class="pageNumber"></span> de <span class="totalPages"></span>
  </span>
  <span style="flex: 1; text-align: right;">
  <svg
          width="110"
          height="20"
          viewBox="0 0 110 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_10836_106968"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="110"
            height="20"
          >
            <rect width="110" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_10836_106968)">
            <path
              d="M18.3659 3.81874L8.8399 16.5877C8.52992 17.0032 8.82646 17.5944 9.34487 17.5944H19.5316C23.1502 17.5944 26.0836 14.661 26.0836 11.0424V6.38041C26.0836 2.2579 20.831 0.514444 18.3659 3.81874Z"
              fill="#141414"
            />
            <path
              d="M20.3235 7.44475L15.8473 13.4448C15.7233 13.611 15.8419 13.8475 16.0493 13.8475H20.124C21.5714 13.8475 22.7448 12.6742 22.7448 11.2267V8.2484C22.7448 6.95507 21.0969 6.40811 20.3235 7.44475Z"
              fill="url(#paint0_linear_10836_106968)"
            />
            <path
              d="M6.1542 3.88321L1.10352 10.6897C-1.01494 13.5446 1.02291 17.5944 4.57797 17.5944C5.66351 17.5944 6.68691 17.088 7.34542 16.225L13.8785 7.66325V6.43605C13.8785 2.30796 8.61413 0.56811 6.1542 3.88321Z"
              fill="url(#paint1_linear_10836_106968)"
            />
            <path
              d="M107.525 6.94755V12.4789C107.525 12.8537 107.611 13.1257 107.782 13.295C107.965 13.4522 108.27 13.5308 108.697 13.5308H109.978V15.2537H108.331C107.391 15.2537 106.671 15.036 106.171 14.6008C105.67 14.1655 105.42 13.4582 105.42 12.4789V6.94755H104.23V5.26094H105.42V2.77637H107.525V5.26094H109.978V6.94755H107.525Z"
              fill="#141414"
            />
            <path
              d="M99.7865 6.7127C100.092 6.2049 100.494 5.81197 100.995 5.53389C101.507 5.24372 102.111 5.09863 102.807 5.09863V7.23863H102.276C101.458 7.23863 100.836 7.44417 100.409 7.85524C99.9939 8.26632 99.7865 8.97965 99.7865 9.99524V15.2546H97.6997V5.26185H99.7865V6.7127Z"
              fill="#141414"
            />
            <path
              d="M91.3168 15.4178C90.3649 15.4178 89.5046 15.2062 88.7358 14.783C87.967 14.3478 87.3629 13.7433 86.9236 12.9695C86.4843 12.1836 86.2646 11.2768 86.2646 10.2491C86.2646 9.23355 86.4904 8.33281 86.9419 7.54694C87.3934 6.76106 88.0097 6.15654 88.7907 5.73338C89.5717 5.31021 90.4442 5.09863 91.4083 5.09863C92.3724 5.09863 93.2449 5.31021 94.0259 5.73338C94.8069 6.15654 95.4232 6.76106 95.8747 7.54694C96.3262 8.33281 96.552 9.23355 96.552 10.2491C96.552 11.2647 96.3201 12.1655 95.8564 12.9513C95.3927 13.7372 94.7581 14.3478 93.9527 14.783C93.1595 15.2062 92.2808 15.4178 91.3168 15.4178ZM91.3168 13.6224C91.8537 13.6224 92.3541 13.4954 92.8178 13.2415C93.2937 12.9876 93.6781 12.6068 93.971 12.099C94.2639 11.5912 94.4103 10.9746 94.4103 10.2491C94.4103 9.52372 94.27 8.91315 93.9893 8.41745C93.7086 7.90965 93.3364 7.5288 92.8727 7.2749C92.409 7.02101 91.9086 6.89406 91.3717 6.89406C90.8348 6.89406 90.3344 7.02101 89.8707 7.2749C89.4192 7.5288 89.0592 7.90965 88.7907 8.41745C88.5222 8.91315 88.388 9.52372 88.388 10.2491C88.388 11.3252 88.6626 12.1594 89.2117 12.7519C89.7731 13.3322 90.4748 13.6224 91.3168 13.6224Z"
              fill="#141414"
            />
            <path
              d="M77.5384 6.73084C77.8923 6.2714 78.3743 5.88451 78.9845 5.57016C79.5947 5.25581 80.2841 5.09863 81.0529 5.09863C81.9316 5.09863 82.7309 5.31626 83.4509 5.75151C84.1831 6.17468 84.7566 6.77315 85.1715 7.54694C85.5864 8.32072 85.7939 9.20937 85.7939 10.2129C85.7939 11.2164 85.5864 12.1171 85.1715 12.9151C84.7566 13.7009 84.1831 14.3176 83.4509 14.7649C82.7309 15.2002 81.9316 15.4178 81.0529 15.4178C80.2841 15.4178 79.6008 15.2667 79.0028 14.9644C78.4048 14.65 77.9167 14.2632 77.5384 13.8037V20.0061H75.4517V5.26185H77.5384V6.73084ZM83.6705 10.2129C83.6705 9.52372 83.5241 8.93129 83.2312 8.43558C82.9505 7.92779 82.5722 7.54694 82.0963 7.29304C81.6326 7.02705 81.1323 6.89406 80.5953 6.89406C80.0706 6.89406 79.5702 7.02705 79.0943 7.29304C78.6306 7.55903 78.2523 7.94592 77.9594 8.45372C77.6787 8.96151 77.5384 9.55999 77.5384 10.2491C77.5384 10.9383 77.6787 11.5428 77.9594 12.0627C78.2523 12.5705 78.6306 12.9574 79.0943 13.2234C79.5702 13.4894 80.0706 13.6224 80.5953 13.6224C81.1323 13.6224 81.6326 13.4894 82.0963 13.2234C82.5722 12.9453 82.9505 12.5463 83.2312 12.0264C83.5241 11.5065 83.6705 10.902 83.6705 10.2129Z"
              fill="#141414"
            />
            <path
              d="M69.6954 5.09741C70.4642 5.09741 71.1476 5.26063 71.7455 5.58707C72.3557 5.91351 72.8316 6.39713 73.1733 7.03792C73.5272 7.67871 73.7041 8.4525 73.7041 9.35928V15.2533H71.6357V9.66758C71.6357 8.77289 71.4099 8.08979 70.9584 7.61826C70.5069 7.13464 69.8906 6.89284 69.1096 6.89284C68.3286 6.89284 67.7063 7.13464 67.2425 7.61826C66.791 8.08979 66.5653 8.77289 66.5653 9.66758V15.2533H64.4785V1.83301H66.5653V6.42131C66.9192 5.99815 67.3646 5.67171 67.9015 5.44199C68.4507 5.21227 69.0486 5.09741 69.6954 5.09741Z"
              fill="#141414"
            />
            <path
              d="M59.277 15.4178C58.4838 15.4178 57.7699 15.2787 57.1353 15.0007C56.513 14.7105 56.0187 14.3236 55.6526 13.84C55.2866 13.3443 55.0913 12.7942 55.0669 12.1897H57.2269C57.2635 12.6128 57.4648 12.9695 57.8309 13.2597C58.2092 13.5377 58.679 13.6768 59.2404 13.6768C59.8261 13.6768 60.2777 13.568 60.5949 13.3503C60.9244 13.1206 61.0892 12.8304 61.0892 12.4798C61.0892 12.105 60.9061 11.8269 60.54 11.6456C60.1861 11.4642 59.6187 11.2647 58.8377 11.0471C58.0811 10.8416 57.4648 10.6421 56.9889 10.4486C56.513 10.2552 56.0981 9.95897 55.7442 9.55999C55.4025 9.16101 55.2316 8.63507 55.2316 7.98219C55.2316 7.45021 55.3903 6.9666 55.7076 6.53134C56.0248 6.084 56.4764 5.73338 57.0621 5.47948C57.6601 5.22558 58.3435 5.09863 59.1123 5.09863C60.2594 5.09863 61.1807 5.3888 61.8763 5.96914C62.5841 6.53739 62.9624 7.31722 63.0112 8.30863H60.9244C60.8878 7.86129 60.7048 7.50462 60.3753 7.23863C60.0458 6.97264 59.6004 6.83965 59.039 6.83965C58.4899 6.83965 58.0689 6.94242 57.776 7.14795C57.4831 7.35349 57.3367 7.62553 57.3367 7.96406C57.3367 8.23005 57.4343 8.45372 57.6296 8.63507C57.8248 8.81643 58.0628 8.96151 58.3435 9.07033C58.6241 9.16705 59.039 9.294 59.5882 9.45118C60.3204 9.64462 60.9183 9.84411 61.3821 10.0497C61.858 10.2431 62.2668 10.5333 62.6085 10.9202C62.9502 11.3071 63.1271 11.8209 63.1393 12.4617C63.1393 13.0299 62.9807 13.5377 62.6634 13.9851C62.3461 14.4324 61.8946 14.783 61.3088 15.0369C60.7353 15.2908 60.058 15.4178 59.277 15.4178Z"
              fill="#141414"
            />
            <path
              d="M43.4302 10.2129C43.4302 9.20937 43.6376 8.32072 44.0525 7.54694C44.4797 6.77315 45.0532 6.17468 45.7732 5.75151C46.5054 5.31626 47.3108 5.09863 48.1894 5.09863C48.9826 5.09863 49.6721 5.25581 50.2579 5.57016C50.8558 5.87242 51.3318 6.25327 51.6857 6.7127V5.26185H53.7907V15.2546H51.6857V13.7674C51.3318 14.239 50.8497 14.6319 50.2396 14.9463C49.6294 15.2606 48.9338 15.4178 48.1528 15.4178C47.2864 15.4178 46.4932 15.2002 45.7732 14.7649C45.0532 14.3176 44.4797 13.701 44.0525 12.9151C43.6376 12.1171 43.4302 11.2164 43.4302 10.2129ZM51.6857 10.2491C51.6857 9.55999 51.5392 8.96152 51.2463 8.45372C50.9657 7.94592 50.5935 7.55903 50.1297 7.29304C49.666 7.02705 49.1657 6.89406 48.6287 6.89406C48.0918 6.89406 47.5915 7.02705 47.1277 7.29304C46.664 7.54694 46.2857 7.92779 45.9929 8.43558C45.7122 8.93129 45.5718 9.52372 45.5718 10.2129C45.5718 10.902 45.7122 11.5065 45.9929 12.0264C46.2857 12.5463 46.664 12.9453 47.1277 13.2234C47.6037 13.4894 48.104 13.6224 48.6287 13.6224C49.1657 13.6224 49.666 13.4894 50.1297 13.2234C50.5935 12.9574 50.9657 12.5705 51.2463 12.0627C51.5392 11.5428 51.6857 10.9383 51.6857 10.2491Z"
              fill="#141414"
            />
            <path
              d="M30.1875 8.92544C30.1875 7.69222 30.4743 6.58595 31.0478 5.60663C31.6336 4.62731 32.4207 3.86561 33.4091 3.32154C34.4098 2.76538 35.502 2.4873 36.6857 2.4873C38.0403 2.4873 39.2423 2.81979 40.2918 3.48476C41.3534 4.13764 42.1222 5.0686 42.5982 6.27764H40.0904C39.7609 5.61267 39.3033 5.11697 38.7175 4.79053C38.1318 4.46408 37.4545 4.30086 36.6857 4.30086C35.8437 4.30086 35.0932 4.48827 34.4342 4.86307C33.7752 5.23787 33.2566 5.77589 32.8783 6.47714C32.5122 7.17838 32.3292 7.99448 32.3292 8.92544C32.3292 9.8564 32.5122 10.6725 32.8783 11.3737C33.2566 12.075 33.7752 12.6191 34.4342 13.006C35.0932 13.3808 35.8437 13.5682 36.6857 13.5682C37.4545 13.5682 38.1318 13.4049 38.7175 13.0785C39.3033 12.7521 39.7609 12.2563 40.0904 11.5914H42.5982C42.1222 12.8004 41.3534 13.7314 40.2918 14.3843C39.2423 15.0371 38.0403 15.3636 36.6857 15.3636C35.4898 15.3636 34.3976 15.0915 33.4091 14.5475C32.4207 13.9913 31.6336 13.2236 31.0478 12.2443C30.4743 11.2649 30.1875 10.1587 30.1875 8.92544Z"
              fill="#141414"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_10836_106968"
              x1="22.289"
              y1="7.94498"
              x2="10.154"
              y2="20.2075"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#CBE71E" />
              <stop offset="1" stop-color="#718111" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_10836_106968"
              x1="12.7451"
              y1="2.83804"
              x2="-17.5937"
              y2="33.3317"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#CBE71E" />
              <stop offset="1" stop-color="#718111" />
            </linearGradient>
          </defs>
        </svg>
  </span>
</div>`,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated.pdf"'
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    res.end(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("PDF generation failed");
  }
});

app.get("/generate-pdf-ejs", async (req, res) => {
  try {
    const templatePath = path.join(__dirname, "views", "payment_template.ejs");
    const html = await ejs.renderFile(templatePath, ejsContext);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    const pdfBuffer = await page.pdf({
      width: "216mm",
      height: `${bodyHeight}px`,
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated.pdf"'
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    res.end(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("PDF generation failed");
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
