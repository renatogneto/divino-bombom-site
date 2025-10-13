import brigadeiroImg from "@/assets/brigadeiro.jpg";
import carameloImg from "@/assets/caramelo.jpg";
import doceLeiteImg from "@/assets/doce-leite.jpg";

const products = [
  {
    name: "Brigadeiro",
    description: "Clássico irresistível com recheio cremoso de brigadeiro coberto com granulado crocante",
    image: brigadeiroImg,
  },
  {
    name: "Caramelo Salgado",
    description: "Equilíbrio perfeito entre doce e salgado, com caramelo artesanal e toque de flor de sal",
    image: carameloImg,
  },
  {
    name: "Doce de Leite",
    description: "Suavidade incomparável do doce de leite cremoso sobre base crocante de sequilho",
    image: doceLeiteImg,
  },
];

const Products = () => {
  return (
    <section id="produtos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Nossos Sabores
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada sabor é uma experiência única, criada com dedicação e ingredientes de qualidade
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div 
              key={product.name}
              className="group animate-scale-in bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-playfair text-2xl font-semibold mb-3 text-foreground">
                  {product.name}
                </h3>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
