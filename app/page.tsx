import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageScroller,
  PageSection,
  PageSectionTitle,
} from "./_components/ui/page";

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
      <PageContainer>
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <PageSection>
          <h2 className="text-foreground text-xs font-semibold uppercase">
            Agendamentos
          </h2>
          <BookingItem
            serviceName="Corte de Cabelo"
            barbershopName="Barbearia do Luiz"
            barbershopImageUrl="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png"
            date={new Date()}
          />
        </PageSection>
        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageScroller>
            {RecommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageScroller>
        </PageSection>
        <PageSection>
          <PageSectionTitle>Mais Polulares</PageSectionTitle>
          <PageScroller>
            {PopularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
}
