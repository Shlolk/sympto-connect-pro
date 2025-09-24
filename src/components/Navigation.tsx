import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SymptoMap</h1>
              <p className="text-xs text-muted-foreground">Pro</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#symptoms" className="text-foreground hover:text-primary smooth-transition font-medium">
              Find Doctors
            </a>
            <a href="#appointments" className="text-foreground hover:text-primary smooth-transition font-medium">
              Appointments
            </a>
            <a href="#health-tips" className="text-foreground hover:text-primary smooth-transition font-medium">
              Health Tips
            </a>
            <a href="#about" className="text-foreground hover:text-primary smooth-transition font-medium">
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Welcome, {user.user_metadata?.display_name || user.email}
                </span>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button variant="medical" onClick={() => navigate("/auth")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;