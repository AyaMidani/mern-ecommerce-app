import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useState } from "react";



function ShoppingOrders(){

    const [openDetailDialog,setopenDetailDialog]= useState(false)
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
                        <TableRow>
                            <TableCell>123456</TableCell>
                            <TableCell>06/11/2024</TableCell>
                            <TableCell>In Proccess</TableCell>
                            <TableCell>$2000</TableCell>
                            <TableCell>
                                <Dialog open={openDetailDialog} setopenDetailDialog={setopenDetailDialog}>
                                    <Button onClick={()=>setopenDetailDialog(true)}>View Details</Button>
                                    <ShoppingOrderDetailsView/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
 
export default ShoppingOrders;