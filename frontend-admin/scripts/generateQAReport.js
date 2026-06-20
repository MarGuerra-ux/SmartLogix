import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const coveragePath = path.join(
    __dirname,
    "..",
    "coverage",
    "coverage-summary.json"
);

const reportPath = path.join(
    __dirname,
    "..",
    "coverage",
    "test-results.json"
);

const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "qaReportTemplate.html"
);

const outputDirectory = path.join(
    __dirname,
    "..",
    "reports"
);

if (!fs.existsSync(outputDirectory)) {

    fs.mkdirSync(outputDirectory);

}

const coverage = JSON.parse(

    fs.readFileSync(

        coveragePath,

        "utf8"

    )

);

const testResults = JSON.parse(

    fs.readFileSync(

        reportPath,

        "utf8"

    )

);

const now = new Date();

const currentDate =

    now.toLocaleDateString(

        "es-CL"

    );

const currentTime =

    now.toLocaleTimeString(

        "es-CL"

    );

const totalCoverage = coverage.total;

const statements =

    totalCoverage.statements.pct;

const branches =

    totalCoverage.branches.pct;

const functions =

    totalCoverage.functions.pct;

const lines =

    totalCoverage.lines.pct;

const totalSuites =

    testResults.numTotalTestSuites;

const passedSuites =

    testResults.numPassedTestSuites;

const totalTests =

    testResults.numTotalTests;

const passedTests =

    testResults.numPassedTests;

const failedTests =

    testResults.numFailedTests;

const services = [

    "OperationsCenterService",

    "OrderValidationService",

    "CarrierDecisionService",

    "CarrierService",

    "CarrierAnalyticsService",

    "TrackingService",

    "TrackingAnalyticsService",

    "ShippingService",

    "NotificationService",

    "OrderService",

    "RefundService",

    "AuditLogService"

];

const serviceRows =

    services.map(

        service =>

            `
            <tr>

                <td>${service}</td>

                <td>PASS</td>

            </tr>

            `

    )

    .join("");

let html = fs.readFileSync(

    templatePath,

    "utf8"

);
const css = fs.readFileSync(

    path.join(

        __dirname,

        "..",

        "templates",

        "qaReport.css"

    ),

    "utf8"

);

html = html.replaceAll(

    "{{STYLE_BLOCK}}",

    `<style>${css}</style>`

);

html = html

.replaceAll(

    "{{PROJECT}}",

    "SmartLogix"

)

.replaceAll(

    "{{VERSION}}",

    "1.0"

)

.replaceAll(

    "{{DATE}}",

    currentDate

)

.replaceAll(

    "{{TIME}}",

    currentTime

)

.replaceAll(

    "{{QA1}}",

    "Marco Guerra"

)

.replaceAll(

    "{{QA2}}",

    "Matías Vergara"

)

.replaceAll(

    "{{BRANCH1}}",

    "qa-marco"

)

.replaceAll(

    "{{BRANCH2}}",

    "qa-MatiasVergara"

)

.replaceAll(

    "{{TOTAL_SUITES}}",

    totalSuites

)

.replaceAll(

    "{{PASSED_SUITES}}",

    passedSuites

)

.replaceAll(

    "{{TOTAL_TESTS}}",

    totalTests

)

.replaceAll(

    "{{PASSED_TESTS}}",

    passedTests

)

.replaceAll(

    "{{FAILED_TESTS}}",

    failedTests

)

.replaceAll(

    "{{STATEMENTS}}",

    statements.toFixed(2)

)

.replaceAll(

    "{{BRANCHES}}",

    branches.toFixed(2)

)

.replaceAll(

    "{{FUNCTIONS}}",

    functions.toFixed(2)

)

.replaceAll(

    "{{LINES}}",

    lines.toFixed(2)

)

.replaceAll(

    "{{STATUS}}",

    failedTests === 0

        ? "🟢 APROBADO"

        : "🔴 FALLÓ"

)

.replaceAll(

    "{{SERVICE_ROWS}}",

    serviceRows

);

const browser = await puppeteer.launch({

    headless: "new"

});

const page = await browser.newPage();

await page.setContent(

    html,

    {

        waitUntil: "networkidle0"

    }

);

await page.pdf({

    path: path.join(

        outputDirectory,

        `SmartLogix_QA_Report_${

            currentDate.replace(/\//g,"-")

        }_${

            currentTime

                .replace(/:/g,"-")

                .replace(/\s/g,"")

        }.pdf`

    ),

    format: "A4",

    printBackground: true,

    margin: {

        top: "20px",

        right: "20px",

        bottom: "20px",

        left: "20px"

    },

    displayHeaderFooter: true,

    headerTemplate: `

        <div style="

            width:100%;

            font-size:10px;

            color:#666;

            padding:0 30px;

            text-align:right;

            font-family:Arial;

        ">

            SmartLogix QA Engine

        </div>

    `,

    footerTemplate: `

        <div style="

            width:100%;

            font-size:9px;

            color:#777;

            padding:0 30px;

            display:flex;

            justify-content:space-between;

            font-family:Arial;

        ">

            <span>

                Documento generado automáticamente

            </span>

            <span>

                Página

                <span class="pageNumber"></span>

                /

                <span class="totalPages"></span>

            </span>

        </div>

    `

});

await browser.close();

console.log("");

console.log("======================================");

console.log(" SMARTLOGIX QA ENGINE");

console.log("======================================");

console.log("");

console.log(" Proyecto........ SmartLogix");

console.log(" Fecha........... ", currentDate);

console.log(" Hora............ ", currentTime);

console.log("");

console.log(" Suites.......... ", totalSuites);

console.log(" Tests........... ", totalTests);

console.log(" Passed.......... ", passedTests);

console.log(" Failed.......... ", failedTests);

console.log("");

console.log(" Statements...... ", statements + "%");

console.log(" Branches........ ", branches + "%");

console.log(" Functions....... ", functions + "%");

console.log(" Lines........... ", lines + "%");

console.log("");

console.log(

    failedTests === 0

        ? " RESULTADO....... APROBADO"

        : " RESULTADO....... FALLIDO"

);

console.log("");

console.log(" PDF generado en:");

console.log("");

console.log(outputDirectory);

console.log("");

console.log("======================================");

console.log("");

