/**
 * Main entry point for {{PROJECT_NAME}}
 */

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

function main() {
  console.log(greet('KitiumAI'));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
