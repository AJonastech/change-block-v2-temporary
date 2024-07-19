"use client";
import useIsMounted from "@/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";
import React, { LegacyRef, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const getWeekDates = (startDate: string, weeks: number): string[] => {
  const dates = [];
  const start = new Date(startDate);

  for (let i = 0; i < weeks; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i * 7);
    dates.push(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  }

  return dates;
};

interface Activity {
  name: string;
  week: number;
  description: string;
  duration: number;
}

interface Stage {
  name: string;
  activities: Activity[];
}

interface EMPAReportProjectTimelineProps {
  stages: Stage[];
  weeks: number;
  startDate: string;
}

const EMPAReportProjectTimeline: React.FC<EMPAReportProjectTimelineProps> = ({
  stages,
  weeks,
  startDate,
}) => {
  const isMounted = useIsMounted();
  const [activities, setActivities] = useState(stages);

  const weekDates = getWeekDates(startDate, weeks);

  const moveActivity = (draggedActivity: Activity, targetWeek: number) => {
    setActivities((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        activities: stage.activities.map((activity) =>
          activity.name === draggedActivity.name
            ? { ...activity, week: targetWeek }
            : activity
        ),
      }))
    );
  };

  const resizeActivity = (activityName: string, newDuration: number) => {
    setActivities((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        activities: stage.activities.map((activity) =>
          activity.name === activityName
            ? { ...activity, duration: newDuration }
            : activity
        ),
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-lg flex flex-col gap-6 !max-w-full w-full ">
        <Skeleton isLoaded={isMounted} className="rounded-lg max-w-[70%]">
          <h4 className="heading-h4 font-generalSans font-semibold leading-[40.3px] text-grey-700 capitalize w-fit !my-0">
            Approach - Project timeline and governance
          </h4>
        </Skeleton>

        <div className="relative text-dark-200 w-[calc(100%-5px)] mx-auto">
          <div className="relative z-30 bg-secondary-100 p-4  rounded-lg">
            <Skeleton isLoaded={isMounted} className="rounded-lg">
              <p className="!my-0 font-satoshi text-lg text-grey-300">
                We propose completing this engagement within a 17 week
                timeframe, with regular progress updates and checkpoints. The
                iterative approach to rapid design and prototyping will both
                inform and test the target state, implementation strategy and
                business case. Prototyping and validation work completed at the
                end of Stage 1 will help shape and fast track the vendor
                selection process in Stages 2 and 3.
              </p>
            </Skeleton>
          </div>
          <div className="absolute z-10 h-full w-[10rem] bg-grey-700 rounded-xl -translate-x-[5px] left-0 top-0"></div>
        </div>

        <div className="overflow-x-auto !max-w-full pb-[2rem] not-prose mx-auto">
          <Skeleton
            isLoaded={isMounted}
            className="rounded-lg flex w-full mx-auto overflow-x-auto"
          >
            <table className="max-w-full w-full mx-auto border-collapse border-2  border-black">
              <thead className="border-2 border-black">
                <tr className="border-2 border-black">
                  <th className=" p-4 w-[3rem] text-primary bg-primary">
                    stages
                  </th>
                  <th className="border-x border-gray-200 p-4 bg-primary text-white">
                    Key Activities
                  </th>
                  {weekDates.map((date, index) => (
                    <th
                      key={index}
                      className="border-x border-gray-200 p-4 px-2 text-sm bg-primary text-white w-[90px] min-w-[90px] max-w-[90px] "
                    >
                      Week {index + 1}
                      <br />
                      <span className="text-gray-200 font-light"> {date}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((stage, stageIndex) => (
                  <React.Fragment key={stageIndex}>
                    <tr className="border-2 border-black p-4 text-center ">
                      <td
                        className="border-2 border-black  mx-auto"
                        rowSpan={stage.activities.length + 1}
                      >
                        <div
                          style={{ writingMode: "vertical-rl" }}
                          className="font-semibold rotate-180 pr-6  mx-auto text-center my-auto w-fit text-lg text-dark-200"
                        >
                          {stage.name}
                        </div>
                      </td>
                    </tr>
                    {stage.activities.map((activity, activityIndex) => (
                      <tr key={activityIndex} className="">
                        <td className="border border-gray-200 p-4 bg-white">
                          {activity.name}
                        </td>
                        {Array.from({ length: weeks }).map((_, weekIndex) => (
                          <WeekCell
                            weeks={weeks}
                            key={weekIndex}
                            weekIndex={weekIndex}
                            activity={activity}
                            moveActivity={moveActivity}
                            resizeActivity={resizeActivity}
                          />
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
              <thead className="border-2 border-black ">
                <tr className="border-2 border-black ">
                  <th className="border-2 border-black  border-r-0 p-4 text-white bg-primary"></th>
                  <th className="border-2 border-black border-x-1 border-x-gray-200  p-4 bg-primary text-white">
                    Status Meeting
                  </th>
                  {weekDates.map((date, index) => (
                    <th
                      key={index}
                      className="border-2 border-black border-x-1 border-x-gray-200  p-4 bg-primary text-white w-[90px] min-w-[90px] max-w-[90px] "
                    ></th>
                  ))}
                </tr>
              </thead>
            </table>
          </Skeleton>
        </div>
      </div>
    </DndProvider>
  );
};

interface WeekCellProps {
  weekIndex: number;
  weeks: number;
  activity: Activity;
  moveActivity: (activity: Activity, targetWeek: number) => void;
  resizeActivity: (activityName: string, newDuration: number) => void;
}

import { useRef } from "react";

import "react-resizable/css/styles.css";

interface WeekCellProps {
  weekIndex: number;
  weeks: number;
  activity: Activity;
  moveActivity: (activity: Activity, targetWeek: number) => void;
  resizeActivity: (activityName: string, newDuration: number) => void;
}

const WeekCell: React.FC<WeekCellProps> = ({
  weekIndex,
  activity,
  moveActivity,
  resizeActivity,
  weeks,
}) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "activity",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => {
      if (activity.duration > weeks - weekIndex) {
        return;
      } else {
        return moveActivity(activity, weekIndex + 1);
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "activity",
    item: { activity },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (previewRef.current) {
      preview(previewRef.current);
    }
  }, [preview]);

  const handleResize = (event: React.SyntheticEvent, { size }: any) => {
    const newDuration = Math.ceil(size.width / 100); // Adjust according to your width scale
    resizeActivity(activity.name, newDuration);
  };

  return (
    <td
      ref={drop as unknown as LegacyRef<HTMLTableCellElement>}
      className={`relative hover:border-primary p-2 min-h-full w-[90px] min-w-[90px] max-w-[90px] overflow-visible ${
        activity.duration <= weeks - weekIndex && isOver
          ? "bg-secondary/50 border-dashed border-black"
          : "border bg-secondary border-gray-200" // Styling for drop target
      } ${
        activity.duration > weeks - weekIndex && isOver
          ? "bg-red-500/30 border border-dashded border-red-400"
          : "border bg-secondary border-gray-200" // Original styling for active week
      }`}
    >
      {activity.week === weekIndex + 1 && (
        <ResizableBox
          width={activity.duration * 90} // Adjust according to your width scale
          height={60} // Fixed height
          axis="x"
          handle={
            <div className="bg-[#f3fae9] border rounded-xl  cursor-grab w-[49px] z-10 h-[50px] rotate-45 right-0 translate-x-[25px] top-[5px] absolute "></div>
          }
          minConstraints={[90, 60]}
          maxConstraints={[(weeks - activity.week + 1) * 80 * 0.9, 60]} // Adjust according to your width scale
          onResizeStop={handleResize}
          className="sticky top-0 left-[2px] py-  max-h-full bg-[#f3fae9] rounded-l-xl"
          //  style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <div
            ref={(el) => {
              drag(el);
              if (previewRef.current) {
                preview(previewRef.current);
              }
            }}
            style={{ opacity: 1 }} // Ensure the preview element has full opacity
            className="h-full rounded-l-xl transition-all relative   duration-400 min-w-[80px] bg-[#f3fae9] z-50 select-none flex p-3 cursor-move justify-center no-scrollbar text-[13px] items-start overflow-auto"
          >
            <div
              // ref={previewRef}
              style={{ opacity: 1 }} // Ensure the preview element has full opacity
            >
              <span className="z-40 w-full text-green-900 bg-[#f3fae9]">
                {activity.description}
              </span>
            </div>
            
          </div>
        </ResizableBox>
      )}
    </td>
  );
};

export default EMPAReportProjectTimeline;
