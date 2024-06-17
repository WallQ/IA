import { type Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Homepage',
};

export default async function Landing() {
	return (
		<main>
			<h1>Homepage</h1>
		</main>
	);
}
