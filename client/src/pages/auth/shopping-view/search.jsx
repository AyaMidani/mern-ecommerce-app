import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getSearchResults, resetSeacrhResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { fetchProductDetails } from "@/store/shop/products-slice";

function SearchProducts(){
    const [keyword,setKeyword]= useState('')
    const [searchParams,setsearchParams] = useSearchParams();
    const dispatch= useDispatch();
    const {searchResults} = useSelector(state => state.shopSearch)
    const {cartItems}= useSelector((state)=>state.shopCart);
    const {toast}=useToast();
    const { user } = useSelector((state)=>state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const {productDetails} = useSelector((state)=>state.shopProducts);


    function handleAddToCart(getCurrentProductId,getTotalStock){
            let getCartItems = cartItems.items || [];
            if(getCartItems.length){
                const indexOfCurrentItem = getCartItems.findIndex(item =>item.productId === getCurrentProductId)
                if(indexOfCurrentItem > -1){
                    const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                    if(getQuantity + 1 > getTotalStock){
                        toast({
                            title: `Only ${getQuantity} quantity can be added for this item`,
                            variant : 'destructive'
                        })
                    return 
                    }
                }
            }
            dispatch(addToCart({userId: user?.id,productId:getCurrentProductId,quantity:1}))
            .then((data) =>{
                if(data?.payload?.success){
                    dispatch(fetchCartItems({userId: user?.id}));
                    toast({
                        title: 'Product is added to cart'
                    })
                }
            })
        }

    useEffect(()=>{
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 2){
            setTimeout(()=>{
                setsearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            },1000)
        }
        else{
            setsearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSeacrhResults())
        }
    },[keyword])

    useEffect(()=>{
        if(productDetails !==null) setOpenDetailsDialog(true)
        },[productDetails])

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))
}    
    return <div className="container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
                <Input value={keyword} name="keyword" onChange={(event)=> setKeyword(event.target.value)} className="py-6" placeholder="Search Products."></Input>
            </div>
        </div>
        {
            !searchResults.length ? <h1 className="text-5xl font-extrabold">No result found</h1>: null
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
                searchResults.map(item => <ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={item} />)
            }
        </div>
        <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
}

export default SearchProducts;