import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView(){
    const [openDetailsDialog,setOpenDetailsDialog]= useState(false)
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
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
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                    <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                                    <AdminOrderDetailsView />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
 
export default AdminOrdersView;