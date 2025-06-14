
export function Testimonials() {
  const testimonials = [
    {
      name: "Amanda, 28 anos",
      text: "Em 3 meses perdi 8kg e ganhei autoestima! Nunca imaginei que seria tão motivador.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Felipe, 35 anos",
      text: "Treinar com esse app mudou minha rotina! Os treinos são desafiadores e os resultados, visíveis.",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      name: "Carol, 22 anos",
      text: "Consigo manter minha alimentação mesmo com pouco dinheiro. As receitas são ótimas e fáceis!",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background border-t border-b border-white/10">
       <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-12">
          O que nossos usuários dizem
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="rounded-xl bg-gray-900/50 border border-white/10 p-8 flex flex-col text-center shadow-lg hover:border-neon-lime/50 transition-colors duration-300">
              <img src={t.image} alt={t.name} className="h-20 w-20 rounded-full mb-4 mx-auto border-2 border-neon-lime" />
              <p className="text-md text-muted-foreground mb-4 leading-relaxed flex-grow">“{t.text}”</p>
              <span className="font-semibold text-white">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
