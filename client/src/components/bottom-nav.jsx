import { Bell, CreditCard } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import { Link } from "react-router";

export default function BottomNav() {
  const { sessionId } = useParams();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#de2a25] text-white">
      <div className="flex items-center justify-around py-4">
        <Link
          to={`/session/${sessionId}`}
          className={`flex flex-col items-center gap-1 
          }`}
        >
          <div>
            <img src={menu} alt="" className="size-10" />
          </div>
          <span className="text-sm font-medium">Menu</span>
        </Link>

        <div className="w-px h-8 bg-red-400"></div>

        <Link
          to={`/session/${sessionId}/orders`}
          className={`flex flex-col items-center gap-1
          }`}
        >
          <Bell className="size-8" />
          <span className="text-sm font-medium">Orders</span>
        </Link>

        <div className="w-px h-8 bg-red-400"></div>

        <Link
          to={`/session/${sessionId}/payment`}
          className={`flex flex-col items-center gap-1 
          }`}
        >
          <CreditCard className="size-8" />
          <span className="text-sm font-medium">Pay</span>
        </Link>
      </div>
    </div>
  );
}
