import { Bell, Banknote, User, Menu } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import { Link } from "react-router";

export default function BottomNav() {
  const { sessionId } = useParams();
  return (
    <div className="fixed bottom-2 left-5 right-5 bg-black text-white rounded-3xl shadow-2xl">
      <div className="flex items-center justify-evenly p-4 px-5">
        <Link
          to={`/session/${sessionId}`}
          className={`flex flex-col items-center gap-1 
          }`}
        >
          <div>
            <Menu className="size-6" />
          </div>
          <span className="text-sm font-medium">Menu</span>
        </Link>

     

        <Link
          to={`/session/${sessionId}/orders`}
          className={`flex flex-col items-center gap-1
          }`}
        >
          <Bell className="size-6" />
          <span className="text-sm font-medium">Orders</span>
        </Link>

       

        <Link
          to={`/session/${sessionId}/payment`}
          className={`flex flex-col items-center gap-1 
          }`}
        >
          <Banknote className="size-6" />
          <span className="text-sm font-medium">Pay</span>
        </Link>
     
        <Link
          to={`/session/${sessionId}/profile`}
          className={`flex flex-col items-center gap-1 
          }`}
        >
          <User className="size-6" />
          <span className="text-sm font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
