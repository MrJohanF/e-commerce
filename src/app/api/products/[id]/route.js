
const mockProducts = [
  {
    id: "1",
    name: "Smart Phone 13 Pro",
    description: "A high-end smartphone with an advanced camera system.",
    images: ["/images/product-detail-1.png", "/images/product-detail-2.png"],
    price: 999,
    rating: 4.5,
    reviewsCount: 128,
    specs: {
      Pantalla: "6.5” OLED",
      Procesador: "A15 Bionic",
      Batería: "3,500 mAh",
      Cámara: "12MP + 12MP Tele",
      Almacenamiento: "128 GB",
      RAM: "6 GB",
    },
  },
  {
    id: "2",
    name: "Ultra Book X1",
    description: "A powerful ultrabook designed for professionals on the go.",
    images: ["/images/laptop-1.png"],
    price: 1299,
    rating: 4.0,
    reviewsCount: 54,
    specs: {
      Pantalla: "14” Retina",
      Procesador: "Intel i7",
      RAM: "16 GB",
      Almacenamiento: "512 GB SSD",
      Gráficos: "Intel Iris Xe",
      Peso: "1.2 kg",
    },
  },
];

/**
 * Route handler for GET /api/products/[id]
 */
export async function GET(request, { params }) {
  const { id } = params;

  // Simulate fetching from DB or external API
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
