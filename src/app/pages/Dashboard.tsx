
import { useOutletContext } from 'react-router';
import Nuur from "../components/Nuur";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div className="relative z-10 mx-auto px-4 md:px-8 space-y-12  text-left">
                <Nuur/>
            </div>
        </div>
    );
}