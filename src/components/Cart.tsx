import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={actions.closeCart}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-heading font-bold text-foreground">Your Cart</h2>
          </div>
          <button
            onClick={actions.closeCart}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-paragraph text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                      width={80}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-paragraph font-semibold text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-primary font-semibold mt-1">
                      {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-background rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <span className="text-sm font-paragraph font-semibold text-foreground w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                        className="p-1 hover:bg-background rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                      <button
                        onClick={() => actions.removeFromCart(item)}
                        className="ml-auto text-sm text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-paragraph font-semibold text-foreground">Total:</span>
              <span className="text-2xl font-heading font-bold text-primary">
                {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
              </span>
            </div>
            <Button
              onClick={actions.checkout}
              disabled={isCheckingOut}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
            <button
              onClick={actions.closeCart}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
