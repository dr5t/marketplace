import ProductDetailClient from "@/components/product/ProductDetailClient";

export async function generateStaticParams() {
  return [{ id: '1' }]; 
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="relative min-h-screen no-neofolia page-product-detail">
      <ProductDetailClient id={params.id} />
    </div>
  );
}
