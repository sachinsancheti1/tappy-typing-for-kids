/*
 * find-unused-components.js
 * Usage:
 *   # List unused components
 *   node find-unused-components.js
 *
 *   # Delete unused components (requires confirmation flag)
 *   node find-unused-components.js --delete
 *
 * Scans your Next.js project for React components in the `components/` directory
 * that are never imported or used elsewhere, and optionally deletes them.
 */

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Directory containing your React components
const COMPONENTS_DIR = path.join(process.cwd(), 'components');

// All JS/TS files in the project (excluding node_modules and .next)
const allFiles = glob.sync('**/*.{js,jsx,ts,tsx}', {
  ignore: ['node_modules/**', '.next/**'],
});

// All component files inside the components directory
const componentFiles = glob.sync('**/*.{js,jsx,ts,tsx}', {
  cwd: COMPONENTS_DIR,
  ignore: ['**/*.d.ts'],
});

const usages = {};

// Identify unused components
componentFiles.forEach((relPath) => {
  const componentName = path.basename(relPath, path.extname(relPath));
  usages[relPath] = 0;

  allFiles.forEach((filePath) => {
    const content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');

    // 1) Import from components directory
    const importPattern = new RegExp(
      `from ['"][^'"]*components/${componentName}(?:\\.[jt]sx?)?['"]`,
      'g'
    );

    // 2) JSX usage <ComponentName ...>
    const jsxPattern = new RegExp(`<${componentName}[\\s>/]`, 'g');

    if (importPattern.test(content) || jsxPattern.test(content)) {
      usages[relPath]++;
    }
  });
});

const unused = Object.entries(usages)
  .filter(([_, count]) => count === 0)
  .map(([relPath]) => path.join('components', relPath));

if (unused.length === 0) {
  console.log('✅ No unused components found under components/');
  process.exit(0);
}

console.log('🚨 Unused components (safe to delete):');
unused.forEach((file) => console.log(` - ${file}`));

// If --delete flag provided, prompt before deleting
if (process.argv.includes('--delete')) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Are you sure you want to delete all unused components? (y/N) ', (ans) => {
    rl.close();
    if (ans.toLowerCase() === 'y') {
      unused.forEach((file) => {
        try {
          fs.unlinkSync(path.join(process.cwd(), file));
          console.log(`Deleted: ${file}`);
        } catch (err) {
          console.error(`Failed to delete ${file}:`, err.message);
        }
      });
      console.log('✅ Unused components deleted.');
    } else {
      console.log('Deletion aborted. No files were removed.');
    }
  });
} else {
  console.log('\nTo delete these files, rerun with the --delete flag:');
  console.log('  node find-unused-components.js --delete');
}
