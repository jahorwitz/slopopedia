import { useForm } from "react-hook-form";
import { Header } from "../components";
import Checkbox from "../components/form/advanced-form-inputs/checkbox";
import Dropdown from "../components/form/advanced-form-inputs/dropdown";
import Slider from "../components/form/advanced-form-inputs/slider";
import TextInput from "../components/form/advanced-form-inputs/textInput";

const keywords = [
  { label: "Foo", value: "foo" },
  { label: "Bar", value: "bar" },
];
const decades = [
  { label: "1980s", value: "1980s" },
  { label: "1990s", value: "1990s" },
  { label: "2000s", value: "2000s" },
];
const sortingOptions = [
  { label: "Title", value: "title" },
  { label: "Popularity", value: "popularity" },
  { label: "Recently Added", value: "recentlyAdded" },
];
export function SearchRoute() {
  const { register, control, watch } = useForm();
  return (
    <>
      <Header />
      <main className="">
        <form>
          <div className="flex justify-between gap-4 mt-12 w-4/5 mx-auto">
            <div className="w-1/3 flex flex-col gap-1">
              <span className="font-bold text-xl">Keywords</span>
              <Dropdown
                options={keywords}
                control={control}
                name="keywords"
                isMulti
              />
            </div>
            <div className="w-1/3 flex flex-col gap-4">
              <span className="font-bold text-xl">
                Title/Description Search
              </span>
              <TextInput {...register("titleDescription")} />
            </div>
            <div className="w-1/3 flex flex-col gap-4">
              <span className="font-bold text-xl">Decades</span>
              <Dropdown
                options={decades}
                control={control}
                name="decades"
                isMulti
              />
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-12 w-4/5 mx-auto items-center">
            <div className="w-1/4 flex flex-col gap-2">
              <span className="font-bold text-lg pb-5">
                Rotten Tomatoes Score
              </span>
              <Slider
                label="Min"
                min="0"
                max="100"
                watch={watch("rtMin")}
                {...register("rtMin")}
              />
              <Slider
                label="Max"
                min="0"
                max="100"
                watch={watch("rtMax")}
                {...register("rtMax")}
              />
            </div>
            <div className="flex gap-3 w-1/4 items-center">
              <Checkbox {...register("inclNoRt")} />
              <label htmlFor="inclNoRt" className="text-xl">
                Include movies with no Rotten Tomatoes Score
              </label>
            </div>
            <div className="w-1/4"></div>
            <div className="flex flex-col w-1/4 gap-3">
              <div className="flex justify-between items-center ">
                <label htmlFor="sortingCriteria" className="font-bold">
                  Sort By
                </label>
                <div className="flex items-center gap-2">
                  <Checkbox {...register("sortDescending")} />
                  <label htmlFor="sortDescending">Descending</label>
                </div>
              </div>
              <Dropdown
                control={control}
                defaultValue="title"
                options={sortingOptions}
                name="sortingCriteria"
              />
            </div>
          </div>
        </form>
      </main>
      {/*<Footer />*/}
    </>
  );
}
