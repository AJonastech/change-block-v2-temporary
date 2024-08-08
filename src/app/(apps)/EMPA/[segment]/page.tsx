import EmpaHttpWrapper from "@/components/EMPAHttpWrapper";
import EmpaWebsocketWrapper from "@/components/EmpaWebsocketWrapper";

const page = async ({
  params,
  searchParams,
}: {
  params: { segment: string };
  searchParams: { data: string; id: string; section: string; status: string };
}) => {
  const currentSegment = params?.segment;
  const id = searchParams?.id;
  const section = searchParams?.section;
  const generationStatus = searchParams?.status;
  return (
    <div className=" w-full h-full  bg-white  rounded-2xl overflow-y-auto  no-scrollbar scroll-smooth outline-none">
      {generationStatus !== "GENERATED" && (
        <EmpaWebsocketWrapper
          generatedId={id}
          currentSegment={currentSegment}
          section={section}
        />
      )}
      {generationStatus === "GENERATED" && (
        <EmpaHttpWrapper
          generatedId={id}
          currentSegment={currentSegment}
          section={section}
        />
      )}
    </div>
  );
};

export default page;
