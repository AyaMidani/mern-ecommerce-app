import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// tiny window-size hook (no extra deps)
function useWindowSize() {
  const get = () => ({ width: window.innerWidth, height: window.innerHeight });
  const [size, setSize] = useState(get());
  useEffect(() => {
    const onResize = () => setSize(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // run confetti for ~2.5s then stop
  const [pieces, setPieces] = useState(400);
  useEffect(() => {
    const t = setTimeout(() => setPieces(0), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
      <Confetti width={width} height={height} numberOfPieces={pieces} recycle={false} gravity={0.35} />
      <Card className="p-10 w-full max-w-md text-center shadow-2xl rounded-2xl">
        <CardHeader className="p-0">
          <CardTitle className="text-3xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-3 text-gray-600">
          Your order has been placed successfully. 🎉
        </CardContent>
        <Button className="mt-6 w-full transition hover:shadow-lg hover:scale-105"
                onClick={() => navigate("/shop/account")}>
          View Orders
        </Button>
      </Card>
    </div>
  );
}
