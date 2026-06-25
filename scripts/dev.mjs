import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import process from "node:process";

const phpCandidates = [
  process.env.PHP_PATH,
  "C:/xampp/php/php.exe",
  "C:/laragon/bin/php/php.exe",
  "C:/wamp64/bin/php/php8.2.0/php.exe",
  "C:/wamp64/bin/php/php8.1.0/php.exe",
].filter(Boolean);

const resolvedPhp = phpCandidates.find((candidate) => existsSync(candidate));

function startProcess(command, args, name) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("error", (error) => {
    console.error(`[${name}] ${error.message}`);
  });

  return child;
}

function killChild(child) {
  if (child && !child.killed) {
    child.kill();
  }
}

let phpProcess = null;
let viteProcess = null;

if (!resolvedPhp) {
  console.error("Unable to start PHP. Set PHP_PATH or install PHP.");
  process.exit(1);
}

phpProcess = startProcess(resolvedPhp, ["-S", "127.0.0.1:8000", "-t", "."], "php");
phpProcess.once("spawn", () => {
  console.log(`[php] Running on http://127.0.0.1:8000`);
});

viteProcess = startProcess("npm.cmd", ["run", "dev:vite"], "vite");

const shutdown = () => {
  killChild(viteProcess);
  killChild(phpProcess);
};

process.on("SIGINT", () => {
  shutdown();
  process.exit(0);
});

process.on("SIGTERM", () => {
  shutdown();
  process.exit(0);
});

viteProcess.on("exit", (code) => {
  killChild(phpProcess);
  process.exit(code ?? 0);
});

phpProcess.on("exit", (code) => {
  if (code && code !== 0) {
    killChild(viteProcess);
    process.exit(code);
  }
});
