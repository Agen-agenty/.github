import { render } from "preact";
import { App } from "./App";

export function mountApp(container: HTMLElement, baseUrl: string): void {
	render(<App baseUrl={baseUrl} />, container);
}

export function unmountApp(container: HTMLElement): void {
	render(null, container);
}
