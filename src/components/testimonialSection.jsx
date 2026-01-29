import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alice Admin",
    role: "Organic Farmer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    review:
      "HarvestHub helped me reach more customers easily. Clean UI and fast experience.",
    rating: 5,
  },
  {
    id: 2,
    name: "Bob User",
    role: "Restaurant Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "Fresh products and super smooth checkout. Highly recommend!",
    rating: 4,
  },
  {
    id: 3,
    name: "Charlie Moderator",
    role: "Quality Inspector",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review: "Moderation tools are excellent. Everything feels well managed.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sophia Green",
    role: "Home Chef",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review: "I trust HarvestHub for quality ingredients. Love the experience!",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Real experiences from our trusted community
          </p>
        </div>

        {/* SCROLLABLE TESTIMONIALS */}
        <ScrollArea className="w-full">
          <div className="flex gap-4 sm:gap-6 pb-4">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="
                  min-w-[85%] 
                  sm:min-w-[300px] 
                  md:min-w-[360px]
                "
              >
                <Card className="h-full rounded-2xl shadow-sm hover:shadow-lg transition">
                  <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                    {/* STARS */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-emerald-500 fill-emerald-500"
                        />
                      ))}
                    </div>

                    {/* REVIEW */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      “{t.review}”
                    </p>

                    {/* USER */}
                    <div className="flex items-center gap-3 mt-auto">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={t.image} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {t.name}
                        </p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Show scrollbar only on desktop */}
          <div className="hidden md:block">
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
