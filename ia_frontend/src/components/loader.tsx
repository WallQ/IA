import { Loader2 } from 'lucide-react';

const Loader: React.FunctionComponent = (): React.ReactNode => {
	return <Loader2 className='size-12 animate-spin text-primary' />;
};

export default Loader;
