// src/pages/auth/shopping-view/iyzico-return.jsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOrderById } from "@/store/shop/order-slice";

function IyzicoReturnPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const orderId = params.get("orderId");
  const paymentId = params.get("paymentId");

  // optional: read loading/error from your slice (update the key if needed)
  const { isLoading, error } = useSelector((s) => s.shoppingOrder || s.shopOrder || {});

  useEffect(() => {
    if (!orderId) {
      navigate("/shop/payment-failure");
      return;
    }
    dispatch(fetchOrderById(orderId))
      .unwrap() // gets the "order" object returned by the thunk
      .then((order) => {
        if (order?.paymentStatus === "paid") {
          sessionStorage.removeItem("currentOrderId");
          navigate(`/shop/payment-success?orderId=${orderId}&paymentId=${paymentId || ""}`);
        } else {
          navigate(`/shop/payment-failure?orderId=${orderId}`);
        }
      })
      .catch(() => {
        navigate("/shop/payment-failure");
      });
  }, [dispatch, navigate, orderId, paymentId]);

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>
          {isLoading ? "Processing payment... Please wait!" : error ? "Checking status..." : "Processing payment..."}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default IyzicoReturnPage;
