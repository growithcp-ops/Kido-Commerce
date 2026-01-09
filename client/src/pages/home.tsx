import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PromoBanner } from '@/components/home/PromoBanner';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanner />
      <TestimonialsSection />
    </Layout>
  );
}
