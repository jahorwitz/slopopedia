import { useQuery } from "@apollo/client";
import { Header, SoundCardList } from "../components";
import { GET_SOUNDS } from "../graphql/get-sounds";

export function SoundsRoute() {
  const { data, loading, error } = useQuery(GET_SOUNDS);

  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <div className="w-full p-[120px] xs:p-[20px] sm:p-[40px] md:p-[60px]">
        <h1 className="flex w-full mb-8 gap-12 text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center sm:pt-[20px] md:pt-[15px]">
          CHOOSE YOUR SOUND!
        </h1>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5">
          {!loading && <SoundCardList sounds={data?.sounds} />}
        </div>
      </div>
    </>
  );
}
