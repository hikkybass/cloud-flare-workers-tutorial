import { unstable_dev } from 'wrangler';
import { expect, describe, beforeAll, afterAll, it } from 'vitest';
import type { UnstableDevWorker } from 'wrangler';

describe('Worker', () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		// テスト対象のscriptを指定する。
		worker = await unstable_dev('src/index.ts', {
			// Wrangler の unstable_ prefixed API の使用に関する警告を無効にすることができます。
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it('should return Hello World', async () => {
		const resp = await worker.fetch();
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello Worldですよ!"`);
	});
});
