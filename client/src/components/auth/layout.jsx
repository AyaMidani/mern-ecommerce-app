import { Outlet } from "react-router-dom";
import { ShoppingBag, Sparkles, Truck, ShieldCheck } from "lucide-react";

const highlights = [
  { icon: Sparkles, text: "Curated collections updated weekly" },
  { icon: Truck, text: "Fast, reliable delivery to your door" },
  { icon: ShieldCheck, text: "Secure checkout, every time" },
];

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden lg:flex w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800 px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_60%)]" />
        <div className="relative max-w-md space-y-8 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold tracking-tight">ECommerce</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-base text-zinc-300">
            Discover unbeatable deals on the latest trends, all in one place.
          </p>
          <div className="space-y-4 pt-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-zinc-200">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-4 w-4" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
