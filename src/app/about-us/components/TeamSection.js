import Link from "next/link";
import { FiUser, FiMail, FiUsers, FiCreditCard } from "react-icons/fi";

const DevCard = ({ title, subtitle, Icon, href }) => (
  <Link href={href} className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white block">
    {/* Card content remains same */}
  </Link>
);

export default function TeamSection() {
  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <DevCard title="Account" subtitle="Manage profile" href="/profile" Icon={FiUser} />
        <DevCard title="Email" subtitle="Manage email" href="/contact" Icon={FiMail} />
        <DevCard title="Team" subtitle="Manage team" href="/team" Icon={FiUsers} />
        <DevCard title="Billing" subtitle="Manage cards" href="/billing" Icon={FiCreditCard} />
      </div>
    </div>
  );
}