import plugin from "../plugin.json";
import { mountApp, unmountApp } from "./ui/mount";
import styles from "./ui/styles.css";

const OPEN_COMMAND = `${plugin.id}:open`;
const STYLE_ID = `${plugin.id}-styles`;

class AcodePlugin {
	baseUrl = "";
	#page: Acode.WCPage | null = null;
	#root: HTMLElement | null = null;

	async init($page: Acode.WCPage): Promise<void> {
		this.#page = $page;
		$page.settitle(plugin.name);
		$page.initializeIfNotAlreadyInitialized();

		this.#injectStyles();

		const root = document.createElement("div");
		root.className = "acode-plugin-root";
		this.#root = root;
		$page.appendBody(root);
		mountApp(root, this.baseUrl);

		this.#registerOpenCommand();
	}

	destroy(): void {
		if (this.#root) {
			unmountApp(this.#root);
			this.#root.remove();
			this.#root = null;
		}

		document.getElementById(STYLE_ID)?.remove();
		this.#unregisterOpenCommand();
		this.#page = null;
	}

	#injectStyles(): void {
		if (document.getElementById(STYLE_ID)) return;

		const style = document.createElement("style");
		style.id = STYLE_ID;
		style.textContent = styles;
		document.head.appendChild(style);
	}

	#registerOpenCommand(): void {
		const command = {
			name: OPEN_COMMAND,
			description: `Open ${plugin.name}`,
			exec: () => {
				this.#page?.show();
				return true;
			},
		};

		if (typeof acode.addCommand === "function") {
			acode.addCommand(command);
			return;
		}

		editorManager.editor?.commands.addCommand(command);
	}

	#unregisterOpenCommand(): void {
		if (typeof acode.removeCommand === "function") {
			acode.removeCommand(OPEN_COMMAND);
			return;
		}

		editorManager.editor?.commands.removeCommand(OPEN_COMMAND);
	}
}

if (window.acode) {
	const acodePlugin = new AcodePlugin();

	acode.setPluginInit(plugin.id, async (baseUrl, $page) => {
		acodePlugin.baseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
		await acodePlugin.init($page);
	});

	acode.setPluginUnmount(plugin.id, () => {
		acodePlugin.destroy();
	});
}
