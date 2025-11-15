import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

export default async function Home() {
  const RecommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const PopularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <main>
      <Header />
      <div className="mb-3 space-y-4 px-5">
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          serviceName="Corte de Cabelo"
          barbershopName="Barbearia do Luiz"
          barbershopImageUrl="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png"
          date={new Date()}
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {RecommendedBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Mais Polulares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {PopularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </main>
  );
}
