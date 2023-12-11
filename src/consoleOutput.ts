// @ts-expect-error
const consoleOutput: HTMLElement = document.getElementById("console");

export function LOG(strings: TemplateStringsArray, ...args: any) {
  const serialised = strings
    .map((chunk, i) => {
      return `${chunk}${
        args.length > i ? JSON.stringify(args[i], null, 2) : ""
      }`;
    })
    .join("");

  const logline = document.createElement("p");

  logline.innerText = serialised;

  consoleOutput.append(logline);
  console.log(serialised);

  setTimeout(() => {
    consoleOutput.removeChild(logline);
  }, 8000);
}
