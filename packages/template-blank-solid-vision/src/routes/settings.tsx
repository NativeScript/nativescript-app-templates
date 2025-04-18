import { useRouter } from "../router";

export const Settings = () => {
  const router = useRouter();
  return (
    <>
      <actionbar title="Settings" />
      <flexboxlayout
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <image src="~/assets/solid.png" width="100" height="100" className="mb-8" />
        <button
          text="Go to Home"
          on:tap={() => {
            router.goBack();
          }}
          className="rounded-full bg-blue-500 text-white w-300 p-3 text-2xl font-bold h-60 text-center capitalize"
        />
      </flexboxlayout>
    </>
  );
};
