import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <OrderForm />
      <Footer />
    </main>
  );
};

export default Index;
