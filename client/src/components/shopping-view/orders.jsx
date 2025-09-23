import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";



function ShoppingOrders(){
    const [openDetailDialog,setopenDetailDialog]= useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.auth);
    const { orderList } = useSelector((state)=>state.shopOrder);

    useEffect(()=>{
        dispatch(getAllOrdersByUserId(user?.id))
    },[dispatch])
    console.log(orderList)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                            orderList.map((orderItem) =>(
                            <TableRow>
                            <TableCell>{orderItem?._id}</TableCell>
                            <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                            <TableCell>
                                <Badge className={`py-1 px-3 ${orderItem?.orderStatus ==='paid' ? 'bg-green-500':'bg-black'}`}>{orderItem?.orderStatus}</Badge>
                            </TableCell>
                            <TableCell>${orderItem?.totalAmount}</TableCell>
                            <TableCell>
                                <Dialog open={openDetailDialog} setopenDetailDialog={setopenDetailDialog}>
                                    <Button onClick={()=>setopenDetailDialog(true)}>View Details</Button>
                                    <ShoppingOrderDetailsView/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
    )): null
                        }
            
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
 
export default ShoppingOrders;