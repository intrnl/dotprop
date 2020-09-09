import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';


/** @type {import('rollup').RollupOptions} */
let config = {
	input: pkg.source,
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'esm' },
	],
	plugins: [
		resolve({ browser: true }),
		commonjs({ include: 'node_modules/**' }),
		esbuild({
			watch: !!process.env.ROLLUP_WATCH,
			target: 'es2020',
			include: '**/*.{js,jsx,ts,tsx}',
		}),
	],
};

export default config;
