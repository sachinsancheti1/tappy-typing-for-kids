/*
 * find-unused-packages.js
 * Usage:
 *   # List unused dependencies
 *   node find-unused-packages.js
 *
 *   # Remove unused dependencies from package.json
 *   node find-unused-packages.js --delete
 *
 * Scans your project for dependencies listed in package.json that are never imported.
 * Optionally deletes them from package.json when --delete flag is provided.
 */

const fs = require("fs")
const path = require("path")
const glob = require("glob")
const readline = require("readline")

const pkgPath = path.join(process.cwd(), "package.json")
if (!fs.existsSync(pkgPath)) {
  console.error("⚠️  package.json not found in current directory")
  process.exit(1)
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
const dependencies = Object.keys(pkg.dependencies || {})
if (dependencies.length === 0) {
  console.log("No dependencies found in package.json")
  process.exit(0)
}

// Gather all source files
const files = glob.sync("**/*.{js,jsx,ts,tsx}", {
  ignore: ["node_modules/**", ".next/**"],
})

// Check usage of each dependency
const unused = []
dependencies.forEach((dep) => {
  const importPattern = new RegExp(
    `(?:require$$['\"]${dep}['\"]$$)|(?:from ['\"]${dep}['\"])`,
    "g"
  )
  let used = false
  for (const file of files) {
    const content = fs.readFileSync(path.join(process.cwd(), file), "utf8")
    if (importPattern.test(content)) {
      used = true
      break
    }
  }
  if (!used) unused.push(dep)
})

if (unused.length === 0) {
  console.log("✅ No unused dependencies found.")
  process.exit(0)
}

console.log("🚨 Unused dependencies found:")
unused.forEach((dep) => console.log(` - ${dep}`))

if (process.argv.includes("--delete")) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question("Delete these from package.json? (y/N) ", (answer) => {
    rl.close()
    if (answer.toLowerCase() === "y") {
      unused.forEach((dep) => delete pkg.dependencies[dep])
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")
      console.log("✅ Removed unused dependencies from package.json.")
    } else {
      console.log("Aborted. No changes made.")
    }
  })
} else {
  console.log("\nRun with --delete to remove them from package.json:")
  console.log("  node find-unused-packages.js --delete")
}
