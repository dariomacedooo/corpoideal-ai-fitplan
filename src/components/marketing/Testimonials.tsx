
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
    <section id="testimonials" className="py-16 sm:py-20 bg-background border-t border-b border-white/10">
       <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-center mb-8 sm:mb-12 px-4">
          <span className="bg-gradient-to-r from-white via-neon-lime to-white bg-clip-text text-transparent drop-shadow-lg">
            O que nossos usuários dizem
          </span>
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="rounded-xl bg-gray-900/50 border border-white/10 p-6 sm:p-8 flex flex-col text-center shadow-lg hover:border-neon-lime/50 transition-colors duration-300">
              <img src={t.image} alt={t.name} className="h-16 w-16 sm:h-20 sm:w-20 rounded-full mb-3 sm:mb-4 mx-auto border-2 border-neon-lime" />
              <p className="text-sm sm:text-md text-muted-foreground mb-3 sm:mb-4 leading-relaxed flex-grow px-2">"{t.text}"</p>
              <span className="font-semibold text-white text-sm sm:text-base">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
