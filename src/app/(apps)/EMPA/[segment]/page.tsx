import EMPAReportHome from "@/components/EMPAReportHome";
import EMPAReportSegment from "@/components/EMPAReportSegment";

const page = async ({
  params,
  searchParams,
}: {
  params: { segment: string };
  searchParams: { data: string; id: string; section: string };
}) => {
  const currentSegment = params?.segment;
  const id = searchParams?.id;

  return (
    <div className=" w-full h-full  bg-white  rounded-2xl overflow-y-auto  no-scrollbar scroll-smooth outline-none">
      {currentSegment === "home" ? (
        <EMPAReportHome id={id} />
      ) : (
        <EMPAReportSegment section={searchParams.section} id={id}/>
      )}
    </div>
  );
};

export default page;
