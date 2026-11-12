import { useCallback, useState } from "preact/hooks";
import plugin from "../../plugin.json";

type AppProps = {
	baseUrl: string;
};

export function App({ baseUrl }: AppProps) {
	const [clicks, setClicks] = useState(0);

	const showToast = useCallback(() => {
		const next = clicks + 1;
		setClicks(next);

		const toast = acode.require("toast");
		if (typeof toast === "function") {
			toast(`Preact is mounted. Clicks: ${next}`, 2000);
		}
	}, [clicks]);

	const showNotification = useCallback(() => {
		acode.pushNotification(plugin.name, "Called from a Preact event handler.", {
			type: "info",
		});
	}, []);

	return (
		<div class="acode-plugin-app">
			<header>
				<h1>{plugin.name}</h1>
				<p>
					Example Acode plugin that renders its page with Preact. Clone
					this repo when you want a custom UI on <code>$page</code>.
				</p>
			</header>

			<section>
				<h2>Acode APIs</h2>
				<div class="row">
					<span class="count">
						{clicks} toast{clicks === 1 ? "" : "s"}
					</span>
					<div class="actions">
						<button type="button" onClick={showToast}>
							Show toast
						</button>
						<button type="button" onClick={showNotification}>
							Notify
						</button>
					</div>
				</div>
			</section>

			<section>
				<h2>How this is wired</h2>
				<p class="hint">
					<code>src/main.ts</code> mounts <code>src/ui/App.tsx</code> onto
					the plugin page. Styles live in <code>src/ui/styles.css</code>{" "}
					and follow Acode theme variables. Plugin files resolve from{" "}
					<code>{baseUrl}</code>.
				</p>
			</section>
		</div>
	);
}
