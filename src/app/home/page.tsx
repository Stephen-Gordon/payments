import Link from "next/link";
//import { Account, Connect } from "../../components";
import Balance from "../components/Balance/Balance";
import Send from "../components/Send/Send";
export default function Page() {
	return (
		<div>
			<div className="text-5xl text-center items-center mt-60">
				<Balance />
			</div>

			<Link
				href={{
					pathname: "/send",
					query: { address: "12345" },
				}}
			>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Go to send Usdc
				</button>
			</Link>
			<Link
				href={{
					pathname: "/search",
				}}
			>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Search Address
				</button>
			</Link>
			{/* <Send /> */}
			{/* 		<Account />
			<Connect /> */}
		</div>
	);
}