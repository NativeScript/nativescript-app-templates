import { useRouter } from "../router";

export const Home = () => {
  const router = useRouter();

  return (
    <>
      <actionbar title="Home"/>
      {/* @ts-ignore */}
      <gridlayout rows="*,auto,*">
        <button
          row="1"
          className="rounded-full bg-blue-500 text-white w-300 p-3 text-2xl font-bold h-60 text-center capitalize" iosOverflowSafeArea="false" 
          text="View Settings"
          on:tap={() => {
            router.navigate("Settings");
          }}
        />
        <image rowSpan="3" src="~/assets/solid.png" width="100" height="100" className="align-bottom mb-8" />
      </gridlayout>
    </>
  );
};
