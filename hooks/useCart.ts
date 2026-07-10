import { useMemo, useState } from "react";

export default function useCart() {

  const [cart, setCart] = useState<any[]>([]);

  const addItem = (product: any) => {

    const exist = cart.find((x) => x.id === product.id);

    if (exist) {

      setCart(
        cart.map((x) =>
          x.id === product.id
            ? { ...x, qty: x.qty + 1 }
            : x
        )
      );

      return;
    }

    setCart([
      ...cart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
      },
    ]);
  };

  const increase = (id: number) => {

    setCart(
      cart.map((x) =>
        x.id === id
          ? { ...x, qty: x.qty + 1 }
          : x
      )
    );

  };

  const decrease = (id: number) => {

    setCart(
      cart
        .map((x) =>
          x.id === id
            ? { ...x, qty: x.qty - 1 }
            : x
        )
        .filter((x) => x.qty > 0)
    );

  };

  const clear = () => setCart([]);

  const total = useMemo(() => {

    return cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

  }, [cart]);

  return {

    cart,

    total,

    addItem,

    increase,

    decrease,

    clear,

  };

}