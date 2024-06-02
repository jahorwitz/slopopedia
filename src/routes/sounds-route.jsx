import { useQuery } from "@apollo/client";
import { Header, Loading, SoundCardList } from "../components";
import { GET_SOUNDS } from "../graphql/get-sounds";

export function SoundsRoute() {
  const { data, loading } = useQuery(GET_SOUNDS);

  if (loading) {
    return (
      <div className="mx-auto py-10">
        <Loading />
      </div>
    );
  }

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
        <h1 className="flex w-full mb-28 gap-12 text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center sm:pt-[20px] md:pt-[15px]">
          CHOOSE YOUR SOUND!
        </h1>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5">
          <SoundCardList sounds={data?.sounds} />
        </div>
      </div>
    </>
  );
}
