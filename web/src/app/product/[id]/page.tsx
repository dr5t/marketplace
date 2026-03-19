import ProductDetailClient from "@/components/product/ProductDetailClient";

export async function generateStaticParams() {
  return [{ id: '1' }]; 
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}
