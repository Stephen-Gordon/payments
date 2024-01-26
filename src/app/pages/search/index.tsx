// React
import { useState, useEffect } from 'react';

// Next
import Link from 'next/link';

export default function Page() {


    const [payee, setPayee] = useState('');

    useEffect(() => {
        // Add your logic here to listen to the input value
        console.log('Input value:', payee);
    }, [payee]);

    return (
			<div>
				<h1>Search Page</h1>
				<input
					className="bg-slate-600 text-white focus:none rounded-md px-4 py-2"
					value={payee}
					onChange={(e) => setPayee(e.target.value)}
				/>
				<Link
                    href={{ 
                        pathname: "/send",
                        query: { payee: payee },
                     }}
                >
					<button>Go</button>
				</Link>
			</div>
		);
}
   