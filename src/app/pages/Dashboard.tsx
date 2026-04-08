
import { DarkMetricsCards } from '../components/DarkMetricsCards';
import { useOutletContext } from 'react-router';
import IntroDashboard from "./IntroDashboard";
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";
import Nuur from "../components/Nuur";


export default function Dashboard() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    const bgMain = isDark ? "bg-[#020202]" : "bg-[#fcfcfd]";
    const textMain = isDark ? "text-white" : "text-slate-900";
    const cardBg = isDark ? "bg-white/[0.02] border-white/5 shadow-2xl" : "bg-white/80 border-slate-200";
    return (
        <div className="space-y-8">
            {/*<Nuur/>*/}
            {/* 🚀 ҮНДСЭН КОНТЕНТ (CONTENT LAYER) */}
            <div className="relative z-10 mx-auto px-4 md:px-8 space-y-12  text-left">

                <IntroDashboard isDark={isDark}/>
                <DarkMetricsCards isDark={isDark}/>
                {/*<DarkHeroPanel isDark={isDark} />*/}
            </div>

        </div>
    );
}