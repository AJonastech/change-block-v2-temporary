import EMPAReportHome from "@/components/EMPAReportHome";
import EMPAReportSegment from "@/components/EMPAReportSegment";

const page = ({
  params,
  searchParams,
}: {
  params: { segment: string };
  searchParams: { data: string; section: string };
}) => {
  const currentSegment = params?.segment;

  return (
    <div className=" w-full h-full  bg-white  rounded-2xl overflow-y-auto  no-scrollbar scroll-smooth outline-none">
      {currentSegment === "home" ? (
        <EMPAReportHome />
      ) : (
        <EMPAReportSegment
          section={searchParams.section}
        />
      )}
    </div>
  );
};

export default page;
