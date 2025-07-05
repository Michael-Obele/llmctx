<script lang="ts">
	import { presets, transformAndSortPresets } from '$lib/presets'
	import PresetListItem from '$lib/components/PresetListItem.svelte'
	import { SITE_URL } from '$lib/constants'
	import toast from 'svelte-french-toast'

	const allPresetsFormatted = transformAndSortPresets(presets)

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Copied to clipboard!')
		} catch {
			toast.error('Failed to copy to clipboard')
		}
	}

	const instructions = [
		{
			title: 'Cursor',
			description: `Cursor supports adding context via URL using the <a href="https://docs.cursor.com/context/@-symbols/@-link#paste-links">Paste Links</a> feature.`,
			command: `@${SITE_URL}/shadcn-svelte`
		},
		{
			title: 'Zed',
			description:
				'You can use this project directly in Zed using a <a href="https://zed.dev/docs/assistant/commands">/fetch command</a>.',
			command: `/fetch ${SITE_URL}/shadcn-svelte`
		},
		{
			title: 'cURL',
			description: `Let's be real—if you clicked this, you probably already know how to use cURL. But if you don't, here's a quick example:`,
			command: `curl ${SITE_URL}/shadcn-svelte -o context.txt`
		}
	]
</script>

<main>
	<header class="hero">
		<div class="hero-content">
			<div class="logo">shadcn-svelte-llm</div>
			<h1>Shadcn-Svelte documentation for AI assistants</h1>
			<p class="hero-description">
				Connect your AI coding assistant directly to up-to-date Shadcn-Svelte documentation via this <strong
					>Model Context Protocol (MCP) server</strong
				>, or download the preset documentation in llms.txt format and add the docs to your context.
			</p>
			<p class="hero-note">
				Documentation is automatically fetched from the <a
					target="_blank"
					href="https://github.com/huntabyte/shadcn-svelte">official documentation</a
				> source on GitHub and updated hourly.
			</p>
		</div>
	</header>

	<section class="usage-section">
		<div class="section-header">
			<h2>Direct URL Access</h2>
			<p class="section-description">
				Access the documentation preset directly via URL for manual download or integration.
			</p>
		</div>

		<div class="usage-grid">
			<div class="usage-card">
				<h3>Shadcn-Svelte Preset</h3>
				<div class="code-block">
					<code>{SITE_URL}/</code><code class="highlight">shadcn-svelte</code>
				</div>
				<a href="/shadcn-svelte" class="example-link">View example →</a>
			</div>
		</div>
	</section>

	<section class="presets-section">
		<div class="section-header">
			<h2>Available Presets</h2>
			<p class="section-description">The available preset for Shadcn-Svelte.</p>
		</div>
		<div class="preset-list">
			{#each allPresetsFormatted as preset}
				<PresetListItem {...preset} />
			{/each}
		</div>
	</section>

	<section class="integration-section">
		<div class="section-header">
			<h2>AI Assistant Integration</h2>
			<p class="section-description">
				Multiple ways to use these presets with your favorite AI coding assistants
			</p>
		</div>

		<div class="integration-grid">
			{#each instructions as { title, description, command }}
				<div class="integration-card">
					<h3>{title}</h3>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p>{@html description}</p>
					<div class="code-block">
						<code>{command}</code>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<footer class="site-footer">
		<p>
			Maintained by <a href="https://khromov.se" target="_blank">Stanislav Khromov</a> • Adapted for
			Shadcn-Svelte
		</p>
	</footer>
</main>

<style>
	:global(html) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
		background: #fbfbfd;
		min-height: 100vh;
	}

	/* Hero Section */
	.hero {
		text-align: center;
		padding: 60px 0 40px 0;
		background: linear-gradient(135deg, #ff3e00 0%, #ff6b35 100%);
		color: white;
		margin: 0 0 30px 0;
		border-radius: 0 0 20px 20px;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.logo {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		opacity: 0.9;
		margin-bottom: 16px;
	}

	.hero h1 {
		font-size: clamp(32px, 5vw, 48px);
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 24px 0;
		letter-spacing: -0.02em;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.5;
		margin: 0 0 20px 0;
		opacity: 0.95;
		font-weight: 400;
	}

	.hero-note {
		font-size: 16px;
		opacity: 0.8;
		margin: 0;
		font-weight: 400;
	}

	.hero-note a {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: underline;
		text-decoration-color: rgba(255, 255, 255, 0.5);
		transition: text-decoration-color 0.2s ease;
	}

	.hero-note a:hover {
		text-decoration-color: rgba(255, 255, 255, 1);
	}

	/* MCP Section */
	.mcp-section {
		background: white;
		border-radius: 16px;
		padding: 32px;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.08),
			0 4px 16px rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.06);
		margin-bottom: 40px;
		position: relative;
		overflow: hidden;
	}

	.mcp-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #ff3e00 0%, #ff6b35 100%);
	}

	.mcp-badge-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 8px;
	}

	.recommended-badge {
		background: linear-gradient(135deg, #4ade80, #22c55e);
		color: white;
		font-size: 12px;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: 8px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
	}

	.client-selector {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 12px;
		margin-bottom: 24px;
	}

	.client-button {
		background: #f5f5f7;
		border: 2px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 16px 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		text-align: center;
	}

	.client-button:hover {
		background: #eef7ff;
		border-color: #007aff;
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 122, 255, 0.15);
	}

	.client-button.active {
		background: #007aff;
		border-color: #007aff;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
	}

	.client-icon {
		font-size: 24px;
		line-height: 1;
	}

	.client-name {
		font-weight: 600;
		font-size: 14px;
	}

	.client-instructions {
		background: #f8fafc;
		border-radius: 12px;
		padding: 24px;
		border: 1px solid rgba(0, 0, 0, 0.06);
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.instruction-header {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin-bottom: 20px;
	}

	.client-icon-large {
		font-size: 32px;
		line-height: 1;
	}

	.instruction-header h3 {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 4px 0;
		color: #1d1d1f;
	}

	.instruction-header p {
		margin: 0;
		color: #6e6e73;
		font-size: 14px;
	}

	.desktop-instructions {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.steps-block {
		background: white;
		border-radius: 8px;
		padding: 16px;
		border: 1px solid rgba(0, 0, 0, 0.08);
	}

	.steps-block strong {
		font-size: 14px;
		color: #1d1d1f;
		margin-bottom: 8px;
		display: block;
	}

	.setup-steps {
		margin: 0;
		padding-left: 20px;
		color: #6e6e73;
	}

	.setup-steps li {
		margin: 8px 0;
		line-height: 1.4;
	}

	.others-endpoints {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.endpoint-item {
		background: white;
		border-radius: 8px;
		padding: 16px;
		border: 1px solid rgba(0, 0, 0, 0.08);
	}

	.endpoint-header {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin-bottom: 8px;
	}

	.endpoint-header strong {
		font-size: 14px;
		color: #1d1d1f;
		min-width: 120px;
		flex-shrink: 0;
	}

	.endpoint-description {
		font-size: 13px;
		color: #6e6e73;
	}

	.code-block,
	.config-block,
	.url-block {
		background: #1e1e1e;
		border-radius: 8px;
		padding: 16px;
		font-family:
			'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
		font-size: 13px;
		position: relative;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.code-block code,
	.config-block code {
		color: #e5e7eb;
		display: block;
		word-break: break-all;
	}

	.config-block pre {
		margin: 0;
		white-space: pre-wrap;
	}

	.url-block {
		background: #f5f5f7;
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.url-block strong {
		color: #1d1d1f;
		font-size: 14px;
	}

	.url-block code {
		color: #007aff;
		font-size: 13px;
		word-break: break-all;
		flex: 1;
		min-width: 200px;
	}

	.copy-btn {
		position: absolute;
		top: 12px;
		right: 12px;
		background: #374151;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 8px 12px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.url-block .copy-btn {
		position: static;
		background: #f5f5f7;
		color: #1d1d1f;
		border: 1px solid rgba(0, 0, 0, 0.08);
		white-space: nowrap;
	}

	.copy-btn:hover {
		background: #007aff;
		color: white;
		transform: translateY(-1px);
	}

	/* Usage Section */
	.usage-section {
		margin-bottom: 40px;
	}

	.usage-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 16px;
	}

	.usage-card {
		background: white;
		border-radius: 12px;
		padding: 24px;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.04),
			0 2px 8px rgba(0, 0, 0, 0.06);
		border: 1px solid rgba(0, 0, 0, 0.06);
		transition: all 0.3s ease;
	}

	.usage-card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.08),
			0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.usage-card h3 {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: #1d1d1f;
	}

	.usage-card .code-block {
		background: #f5f5f7;
		border: 1px solid rgba(0, 0, 0, 0.08);
		margin: 12px 0;
		position: static;
		padding: 12px;
		font-family:
			'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
		font-size: 13px;
		border-radius: 8px;
	}

	.usage-card .code-block code {
		color: #1d1d1f;
		display: inline;
		word-break: break-all;
	}

	.usage-card .code-block .highlight {
		color: #007aff;
		font-weight: 600;
	}

	.example-link {
		color: #007aff;
		text-decoration: none;
		font-weight: 500;
		font-size: 14px;
		display: inline-flex;
		align-items: center;
		transition: color 0.2s ease;
	}

	.example-link:hover {
		color: #0056b3;
	}

	/* Presets Section */
	.presets-section {
		margin-bottom: 25px;
	}

	.section-header {
		margin-bottom: 16px;
		padding-top: 12px;
	}

	.section-header h2 {
		font-size: 24px;
		font-weight: 700;
		margin: 0 0 8px 0;
		color: #1d1d1f;
		letter-spacing: -0.01em;
		position: relative;
		padding-bottom: 6px;
	}

	.section-header h2::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 60px;
		height: 3px;
		background: linear-gradient(90deg, #ff3e00 0%, #ff6b35 100%);
		border-radius: 2px;
	}

	.section-description {
		font-size: 16px;
		color: #6e6e73;
		margin: 0;
		line-height: 1.5;
		max-width: 600px;
	}

	.preset-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.preset-item {
		background: white;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.06);
		transition: all 0.2s ease;
	}

	.preset-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	.preset-item a {
		color: #007aff;
		text-decoration: none;
		font-weight: 500;
	}

	.preset-item a:hover {
		color: #0056b3;
		text-decoration: none;
	}

	.integration-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 16px;
	}

	.integration-card {
		background: white;
		border-radius: 12px;
		padding: 24px;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.04),
			0 2px 8px rgba(0, 0, 0, 0.06);
		border: 1px solid rgba(0, 0, 0, 0.06);
		transition: all 0.3s ease;
	}

	.integration-card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.08),
			0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.integration-card h3 {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 10px 0;
		color: #1d1d1f;
	}

	.integration-card p {
		font-size: 16px;
		color: #6e6e73;
		margin: 0 0 16px 0;
		line-height: 1.5;
	}

	.integration-card .code-block {
		background: #f5f5f7;
		color: #1d1d1f;
		border: 1px solid rgba(0, 0, 0, 0.08);
		position: static;
		padding: 12px;
		font-family:
			'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
		font-size: 13px;
		border-radius: 8px;
	}

	.integration-card .code-block code {
		color: #1d1d1f;
		display: block;
		word-break: break-all;
	}

	/* Footer */
	.site-footer {
		text-align: center;
		padding: 40px 0 60px 0;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		margin-top: 60px;
	}

	.site-footer p {
		font-size: 14px;
		color: #6e6e73;
		margin: 0;
	}

	.site-footer a {
		color: #007aff;
		text-decoration: none;
	}

	.site-footer a:hover {
		color: #0056b3;
		text-decoration: underline;
	}

	/* Remove rounded corners on smaller screens */
	@media (max-width: 768px) {
		.hero {
			border-radius: 0;
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		main {
			padding: 0 16px;
		}

		.hero {
			margin: 0 -16px 40px -16px;
			padding: 60px 0 40px 0;
		}

		.hero-content {
			padding: 0 16px;
		}

		.hero h1 {
			font-size: 28px;
		}

		.hero-description {
			font-size: 18px;
		}

		.mcp-section {
			padding: 24px;
		}

		.mcp-badge-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}

		.client-selector {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		}

		.client-instructions .code-block,
		.client-instructions .config-block {
			padding-bottom: 10px;
		}

		.client-instructions .copy-btn {
			position: static;
			margin-top: 12px;
			width: 100%;
			justify-content: center;
		}

		.usage-grid,
		.integration-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.usage-card,
		.integration-card {
			padding: 24px;
		}

		.section-header h2 {
			font-size: 24px;
		}

		.section-description {
			font-size: 16px;
		}

		.url-block {
			flex-direction: column;
			align-items: flex-start;
		}

		.url-block code {
			min-width: unset;
			width: 100%;
		}

		.endpoint-header {
			gap: 4px;
		}

		.desktop-instructions {
			gap: 12px;
		}

		.setup-steps {
			padding-left: 16px;
		}
	}
</style>
