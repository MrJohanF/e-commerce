// app/productos/[id]/page.js (Server Component)
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProductClient from "./productclient"; // the child client component

async function getProductData(id) {
  const res = await fetch(`/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Fetch data on the server
  const product = await getProductData(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="max-w-lg w-full mx-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-center mb-4">
              Lo sentimos, no pudimos encontrar el producto que estás buscando.
            </p>
            <Link
              href="/productos"
              className="flex items-center justify-center text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Productos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      {/* Pass product into a client component */}
      <ProductClient product={product} />
      <Footer />
    </div>
  );
}
