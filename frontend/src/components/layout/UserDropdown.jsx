import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar } from "../ui/avatar";
import Profile from "../Profile";
import Setting from "../Setting";
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
export default function UserDropdown({ user }) {

  const [openProfile, setOpenProfile] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleProfile = () => {
    setOpenProfile(prev => !prev);
  };

  const handleSettings = () => {
    setOpenSettings(prev => !prev);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-start gap-2 rounded-2xl px-3 py-2.5 hover:bg-muted transition cursor-pointer text-left focus:outline-none">
            <Avatar className="h-9 w-9 bg-primary text-primary-foreground font-semibold text-sm flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight truncate">
                {user?.name || user?.username || "User"}
              </p>
              <p className="text-xs text-muted-foreground leading-tight truncate">
                {user?.email}
              </p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openProfile && <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />}
      {openSettings && <Setting openSettings={openSettings} setOpenSettings={setOpenSettings} />}

    </>
  );
}
