/* In this file, we’ll learn how to pass onClick events into an anonymous function,
 * which will allow us to pass multiple arguments. We'll pass events to moveToCart(),
 * which will enable us to pass products from the list to the cart when they are
 * clicked.
 *
 * Ex 3 - write out all items with their stock number.
 * provide a button and use onClick={moveToCart} to move 1 item into the Shopping
 * Cart
 * use React.useState to keep track of items in the Cart.
 * use React.useState to keep track of Stock items
 * list out the Cart items in another column
*/
function NavBar({ stockitems }) {
  const [stock, setStock] = React.useState(stockitems);
  const [cart,  setCart]  = React.useState([]);   // first use of useState()
  const { Button }        = ReactBootstrap;

  // Note: event can get only 1 argument. But say we want item name:id?
  // IDEA: Concat the 2+ values into 1 string separated by a separator like ":"
  // E.g. event apple:2
  const moveToCart = (e) => {
    let [name, num] = e.target.innerHTML.split(":");
    if (num <= 0)   return      // zero items in stock

    // get item with name from stock and update stock
    let item = stock.filter((item) => item.name == name);

    let newStock = stock.map(item => {
      if (item.name == name) item.instock--;
      return item;
    });

    setStock(newStock);
    setCart([...cart, ...item])
    console.log(`Cart: ${JSON.stringify(cart)}`);
};

  const updatedList = stockitems.map((item, index) => {
    // We want to send 2+ parameters to moveToCard(), but onClick will
    // only allow one argument to be passed.  IDEA: Use anonymous function
    // to concat the 2 values into 1 string. E.g. event apple:2
    return (
      <Button key={index} onClick={moveToCart} >{item.name}:{item.instock}</Button>
    );
  });

  // note that React needs to have a single Parent
  return (<>
      <ul key="stock" style={{ listStyleType: "none" }}>{updatedList}</ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}>Cart Items</Cart>
  </>);
}

function Cart({ cartitems }) {
    const { Card, Button } = ReactBootstrap;
    console.log("rendering Cart");

    const updatedList = cartitems.map((item, index) => {
      return <Button key={index}>{item.name}</Button>;
    });
    return (
      <ul style={{ listStyleType: "none" }} key="cart">{updatedList}</ul>
    );
}

const menuItems = [
  { name: "apple",     instock: 2 },
  { name: "pineapple", instock: 3 },
  { name: "pear",      instock: 0 },
  { name: "peach",     instock: 3 },
  { name: "orange",    instock: 1 }
];

ReactDOM.render(
  <NavBar stockitems={menuItems} />,
  document.getElementById("root")
);
